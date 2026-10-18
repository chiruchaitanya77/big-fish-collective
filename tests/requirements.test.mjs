import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

mkdirSync(resolve(".sites-runtime"), {recursive: true});
const temp = mkdtempSync(resolve('.sites-runtime/requirements-test-'));
const files = ['lib/enquiry-schema.ts','lib/request-security.ts','lib/enquiry-email.ts','lib/analytics.ts','app/api/enquiries/route.ts','app/api/analytics/route.ts'];
const output = new Map(files.map((f,i) => [f,join(temp,`${i}.mjs`)]));
for (const file of files) {
  let source = readFileSync(file,'utf8');
  source = source.replace('import { env } from "cloudflare:workers";', 'const env = globalThis.testEnv;')
    .replace('import { getRawDb } from "@/db";', 'const getRawDb = () => globalThis.testDb;');
  for (const target of files) source = source.replaceAll(`"@/${target.replace(/\.ts$/, '')}"`,JSON.stringify(pathToFileURL(output.get(target)).href));
  writeFileSync(output.get(file),ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);
}
const sqlite = new DatabaseSync(':memory:');
for (const file of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort()) sqlite.exec(readFileSync(join('drizzle',file),'utf8'));
const db = {prepare(sql) { let args=[]; return {bind(...v){args=v;return this;}, async first(){return sqlite.prepare(sql).get(...args)||null;},async run(){return sqlite.prepare(sql).run(...args);}};}};
globalThis.testDb=db;
globalThis.testEnv={};
const load = file => import(pathToFileURL(output.get(file)).href);
const {enquirySchema} = await load(files[0]);
const {readJson,rateLimit,validateRequest} = await load(files[1]);
const {sendEnquiryEmail, sendEnquiryStatusEmail, buildStatusEmail} = await load(files[2]);
const {POST} = await load(files[4]);
const {POST:track} = await load(files[5]);
const originalFetch=globalThis.fetch;
const valid = () => ({kind:'talent',name:'Test Person',email:'test@example.com',location:'Hyderabad',category:'Actor or performer',message:'Testing this application with a sufficiently long message.',consent:true,website:'',submissionId:crypto.randomUUID()});
const req = (body,extra={}) => new Request('https://example.com/api/enquiries',{method:'POST',headers:{'content-type':'application/json',origin:'https://example.com','cf-connecting-ip':'192.0.2.1',...extra},body:JSON.stringify(body)});
let passed=0;
async function test(name,run){await run();passed++;console.log(`PASS ${name}`);}
try {
await test('valid enquiry and category matching',()=>{assert(enquirySchema.safeParse(valid()).success);assert(!enquirySchema.safeParse({...valid(),category:'Advertising'}).success);});
await test('reject unsafe links, bad phone, absent consent and header line breaks',()=>{for(const change of [{links:'javascript:alert(1)'},{phone:'not a phone'},{consent:false},{email:'test@example.com\nBcc:x@y.com'}])assert(!enquirySchema.safeParse({...valid(),...change}).success);});
await test('reject cross-origin and non-JSON requests',()=>{assert.throws(()=>validateRequest(req({}, {origin:'https://other.com'})),e=>e.status===403);assert.throws(()=>validateRequest(req({}, {'content-type':'text/plain'})),e=>e.status===415);});
await test('actual byte limit without Content-Length',async()=>{await assert.rejects(()=>readJson(req({large:'x'.repeat(21000)})),e=>e.status===413);});
await test('malformed JSON returns 400',async()=>{const r=await POST(new Request('https://example.com/api/enquiries',{method:'POST',headers:{'content-type':'application/json'},body:'{'}));assert.equal(r.status,400);});
await test('atomic shared rate limit allows exactly five',async()=>{const outcomes=await Promise.allSettled(Array.from({length:12},()=>rateLimit(db,'test','a',5,60)));assert.equal(outcomes.filter(o=>o.status==='fulfilled').length,5);});
await test('honeypot does not store an enquiry',async()=>{const r=await POST(req({...valid(),website:'spam.example'}));assert.equal(r.status,201);assert.equal(sqlite.prepare('SELECT count(*) AS n FROM enquiries').get().n,0);});
await test('unconfigured email retains lead and succeeds',async()=>{const v=valid();assert.equal((await POST(req(v))).status,201);assert.equal(sqlite.prepare('SELECT notification_status FROM enquiries WHERE submission_id=?').get(v.submissionId).notification_status,'not_configured');});
await test('retry does not duplicate stored enquiry',async()=>{const v=valid();await POST(req(v));assert.equal((await POST(req(v))).status,200);assert.equal(sqlite.prepare('SELECT count(*) AS n FROM enquiries WHERE submission_id=?').get(v.submissionId).n,1);assert.equal((await POST(req({...v,message:'Changed content sufficiently long for this test.'}))).status,409);});
await test('email retries use one idempotency key and plain text',async()=>{let calls=[];const result=await sendEnquiryEmail(valid(),{RESEND_API_KEY:'test-key',ENQUIRY_FROM_EMAIL:'from@example.com',ENQUIRY_TO_EMAIL:'to@example.com'},async(url,options)=>{calls.push(options);return new Response('',{status:calls.length===1?503:200});});assert.equal(result,'sent');assert.equal(calls.length,2);assert.equal(calls[0].headers['Idempotency-Key'],calls[1].headers['Idempotency-Key']);assert(JSON.parse(calls[0].body).text);assert(!JSON.parse(calls[0].body).html);});
await test('status email preview uses clear context, branded HTML, and sends to the enquiry user',async()=>{const value={kind:'partner',name:'Asha',email:'asha@example.com',submissionId:'status-test'};const preview=buildStatusEmail(value,'in_review');assert.match(preview.subject,/project brief/);assert.match(preview.html,/Big Fish Collective/);assert.match(preview.html,/youtube_xjr04t\.svg/);assert.match(preview.html,/background:#000000/);let request;const result=await sendEnquiryStatusEmail(value,'in_review',{RESEND_API_KEY:'test-key',ENQUIRY_FROM_EMAIL:'from@example.com',ENQUIRY_TO_EMAIL:'team@example.com'},async(url,options)=>{request=options;return new Response('{}',{status:200});});assert.equal(result,'sent');const body=JSON.parse(request.body);assert.deepEqual(body.to,['asha@example.com']);assert.match(body.text,/reviewing/);assert.match(body.html,/big-fish-collective-logo_uq3snb\.png/);});
await test('concurrent same submission sends one notification',async()=>{sqlite.exec('DELETE FROM request_limits');Object.assign(globalThis.testEnv,{RESEND_API_KEY:'test',ENQUIRY_FROM_EMAIL:'from@example.com',ENQUIRY_TO_EMAIL:'to@example.com'});let sends=0;globalThis.fetch=async()=>{sends++;return new Response('{}',{status:200});};const v=valid();const outcomes=await Promise.all([POST(req(v)),POST(req(v))]);assert(outcomes.every(r=>r.ok));assert.equal(sends,1);});
await test('email outage preserves lead and submission success',async()=>{globalThis.fetch=async()=>new Response('',{status:503});const v=valid();assert.equal((await POST(req(v))).status,201);assert.equal(sqlite.prepare('SELECT notification_status FROM enquiries WHERE submission_id=?').get(v.submissionId).notification_status,'failed');});
await test('email rate limit blocks sixth distinct submission',async()=>{sqlite.exec('DELETE FROM request_limits');globalThis.fetch=async()=>new Response('{}',{status:200});for(let i=0;i<5;i++)assert.equal((await POST(req(valid()))).status,201);const r=await POST(req(valid()));assert.equal(r.status,429);assert(r.headers.get('retry-after'));});
await test('analytics aggregates allowlisted events and rejects personal URLs or forged successes',async()=>{assert.equal((await track(req({event:'page_view',path:'/about'}))).status,204);assert.equal((await track(req({event:'page_view',path:'/about'}))).status,204);assert.equal(sqlite.prepare("SELECT count FROM analytics_daily WHERE event='page_view' AND path='/about'").get().count,2);assert.equal((await track(req({event:'page_view',path:'/about?email=private'}))).status,400);assert.equal((await track(req({event:'talent_form_success',path:'/contact'}))).status,400);});
console.log(`${passed} tests passed. No production requests or emails sent.`);
} finally {globalThis.fetch=originalFetch;sqlite.close();rmSync(temp,{recursive:true,force:true});}
