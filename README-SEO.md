# Big Fish Collective SEO package

## Files included
- `app/layout.tsx`: global metadata, Open Graph/Twitter metadata, canonical base URL, Organization JSON-LD, Google Analytics (`G-20W2WXT25M`).
- `app/page.tsx`: homepage-specific metadata.
- `public/robots.txt`
- `public/sitemap.xml`
- `public/.well-known/security.txt`
- `public/og-image.png`

## Before deploying
1. If you have a custom domain, replace `https://big-fish-collective.bigfishcollective.workers.dev` in `app/layout.tsx`, `public/robots.txt`, `public/sitemap.xml`, and `public/.well-known/security.txt` with the final canonical domain.
2. Replace `REPLACE-WITH-A-MONITORED-SECURITY-EMAIL` in `public/.well-known/security.txt` with an email address that someone monitors for vulnerability reports.
3. Check `components/site-analytics.tsx`: if it already loads Google Analytics / `gtag.js` with ID `G-20W2WXT25M`, remove one implementation to avoid duplicate page-view events. The layout now loads GA4.
4. Review the sitemap route list against the actual pages and remove any page that should not be public/indexed.

## Deploy
Copy the included files into the matching paths in your repository, then run:
```bash
pnpm run build
pnpm run hosting:check
pnpm run hosting:deploy
```

## Verify
After deployment, visit:
- `/robots.txt`
- `/sitemap.xml`
- `/.well-known/security.txt`
- `/og-image.png`

Use Google Search Console to submit the sitemap. Test the deployed URL with Google's Rich Results Test and the Facebook Sharing Debugger where appropriate. WhatsApp may cache old previews, so after fixing metadata/image it may take time to refresh. The `og:image` URL must be publicly accessible over HTTPS.
