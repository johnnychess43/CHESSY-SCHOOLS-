# CHESSY SCHOOLS

A modern Next.js starter for a learning platform covering technology, business, finance, mathematics, AI/data science, and cybersecurity.

## Included in this starter
- Responsive premium landing page
- Course category cards and topic directory
- WhatsApp customer-support links
- Scholarship discovery section (informational; not a live scholarship database)
- AI guide call-to-action placeholder (no AI API connected yet)
- Certificate journey messaging (no certificate issuance backend connected yet)
- Payment integration intentionally not simulated

## Requirements
- Node.js 20+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Deploy with Vercel
1. Open Vercel and choose **Add New → Project**.
2. Import this GitHub repository.
3. Confirm that Vercel detects Next.js, then deploy.
4. Add environment variables only when the corresponding secure backend integrations are implemented. Never commit API keys or payment secrets.

## Important production requirements
- **Payments:** Use a supported hosted checkout provider and server-side payment verification/webhooks. Do not collect or store raw card details. Show the final amount (KES 100), merchant identity, refund terms and payment provider clearly before confirmation. Mobile money, cards, PayPal, Google Pay and bank methods depend on provider, country, and merchant eligibility. No payment is active in this starter.
- **AI guide:** Add a server-side API route with a provider key stored in hosting environment variables, rate limiting, and safe handling of user data. No live AI is connected yet.
- **Certificates:** Issue only after verified course completion. Add unique certificate IDs and a public verification page; accurately describe whether certificates are platform-issued or externally accredited. Do not imply accreditation without approval from a recognized authority.
- **Scholarships:** Build a verified directory with official source links, deadlines, eligibility, region and last-checked date. Do not invent opportunities or guarantee awards.
- **Security:** Add authentication, authorization, input validation, rate limits, logging, privacy notice, terms, retention/deletion process, backups and accessibility checks before collecting learner data.
- **Forex:** Present educational content and risk warnings, not personalized investment advice or promises of profit.


### Defensive security baseline added
- Global HTTP headers in `next.config.mjs`: Content Security Policy, HSTS, frame protection, MIME-sniffing protection, referrer policy, DNS prefetch control and a restrictive Permissions Policy.
- The current app is a mostly static landing page and does not yet expose login, payment, AI or database API endpoints; endpoint-specific throttling and cryptographic controls must be added with those backend features.
- The Content Security Policy is a starting baseline and must be tested against the deployed site and any future integrations. If external services are added, allow only the exact required origins instead of broadly opening policies.
- Never put secrets in browser code or public `NEXT_PUBLIC_*` variables. Keep server secrets in Vercel Environment Variables and rotate any secret that may have been exposed.
- **Vercel firewall/WAF:** configure deployment protection and available Firewall rules in the Vercel project dashboard. Start with managed/bot protection if available, rate-limit sensitive routes when they exist (authentication, password reset, AI, and payment callbacks), and review logs before blocking broad traffic. Hosting-level firewall rules cannot be created from this repository alone.
- **Cryptography:** HTTPS protects traffic in transit; it does not encrypt arbitrary application data by itself. When accounts are implemented, use a maintained password-hashing algorithm such as Argon2id or scrypt, cryptographically secure random one-time tokens, short expiries, single-use validation and HMAC/hash storage where appropriate. Use a trusted payment provider and verify webhook signatures server-side. Do not invent custom cryptography.
- No website can be guaranteed impossible to hack. These measures reduce common risks and must be combined with dependency updates, testing, monitoring, least privilege and recovery procedures.

## Support contact
WhatsApp link points to the number supplied by the site owner: `+254140415653`.

## Student accounts and saved learning progress

The app now includes an email/password account screen at `/account`, a student dashboard, and lesson-progress sync code. Progress is saved locally for visitors and can sync to a signed-in student's account after the Supabase project is configured.

### Configure Supabase

1. Use a Supabase project dedicated to CHESSY SCHOOLS. Do not reuse another app's database.
2. In that project's SQL Editor, run the SQL in `supabase/schema.sql`. The table has Row Level Security policies so authenticated students can only read or change their own progress.
3. Copy `.env.example` to `.env.local` for local development and fill in the project's URL and **publishable** key. Never use a secret or service-role key in a `NEXT_PUBLIC_` variable.
4. In Vercel, open the CHESSY SCHOOLS project → Settings → Environment Variables and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   Apply them to Production (and Preview if needed), then redeploy.
5. In Supabase Authentication settings, confirm the site URL is `https://chessy-schools.vercel.app` and add that URL to the allowed redirect URLs. Enable email/password sign-up and configure email confirmation to suit your rollout.
6. Test sign-up, confirm the email if required, sign in, complete a quiz, refresh the page, and verify that the lesson appears in the dashboard. Also verify that a second user cannot read the first user's rows.

**Configuration status:** Code and SQL are committed, but account creation and cross-device progress are not live until the dedicated Supabase project is configured and the Vercel environment variables are set. Keep the database schema separate from the Biashara Smart AI project.
