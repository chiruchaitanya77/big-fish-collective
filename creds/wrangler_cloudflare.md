chiru@chirus-MacBook-Pro big-fish-collective % pnpm exec wrangler login
pnpm exec wrangler d1 create big-fish-collective-enquiries

 ⛅️ wrangler 4.92.0 (update available 4.149.0)
──────────────────────────────────────────────
Attempting to login via OAuth...
Opening a link in your default browser: https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=54d11594-84e4-41aa-b438-e81b8fa78ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8976%2Foauth%2Fcallback&scope=account%3Aread%20user%3Aread%20workers%3Awrite%20workers_kv%3Awrite%20workers_routes%3Awrite%20workers_scripts%3Awrite%20workers_tail%3Aread%20d1%3Awrite%20pages%3Awrite%20zone%3Aread%20ssl_certs%3Awrite%20ai%3Awrite%20ai-search%3Awrite%20ai-search%3Arun%20queues%3Awrite%20pipelines%3Awrite%20secrets_store%3Awrite%20artifacts%3Awrite%20flagship%3Awrite%20containers%3Awrite%20cloudchamber%3Awrite%20connectivity%3Aadmin%20email_routing%3Awrite%20email_sending%3Awrite%20browser%3Awrite%20offline_access&state=KLUeSgKGaLLgTMEXbiF7_7VeANMMgGCO&code_challenge=SO452pA0kk-17IBasvu4vWBRKvrgabFX-Xq4_wnKQkM&code_challenge_method=S256
Successfully logged in.

 ⛅️ wrangler 4.92.0 (update available 4.149.0)
──────────────────────────────────────────────
✅ Successfully created DB 'big-fish-collective-enquiries' in region APAC
Created your new D1 database.

To access your new D1 Database in your Worker, add the following snippet to your configuration file:
{
  "d1_databases": [
    {
      "binding": "big_fish_collective_enquiries",
      "database_name": "big-fish-collective-enquiries",
      "database_id": "ca1e1593-a14d-4e8b-8d8b-954096d958d4"
    }
  ]
}
chiru@chirus-MacBook-Pro big-fish-collective % 