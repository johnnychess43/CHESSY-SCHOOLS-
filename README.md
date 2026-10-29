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

## Support contact
WhatsApp link points to the number supplied by the site owner: `+254140415653`.
