RESEND_API_KEY=re_dhyyKaQA_9j6MJzFATMi2EH8qjQWQ7FnS

import { Resend } from 'resend';

const resend = new Resend('re_dhyyKaQA_9j6MJzFATMi2EH8qjQWQ7FnS');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'chiruchaitanya77@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});