# VisWest Industrial Services — Website V3

Pre-launch GitHub Pages website for VisWest Industrial Services.

## V3 changes
- Larger VisWest branding
- Revised hero wording and stronger client call-to-action
- Mobile layout improvements
- Workforce interest form
- Client skilled-trades request form
- Privacy/consent wording
- Pre-launch safe mode: forms validate locally but **do not transmit or store data**
- Optimised WebP hero image for faster loading
- `config.js` makes future form activation simple

## Publish to the existing GitHub Pages site
Upload/replace these files in the root of `Roy2180/viswest-industrial`:

- `index.html`
- `styles.css`
- `script.js`
- `config.js`
- `viswest-hero.webp`
- `.nojekyll`
- `README.md`

Commit to `main`. GitHub Pages will redeploy automatically.

## Important: form mode
The website is intentionally set to pre-launch demo mode in `config.js`:

```js
window.VISWEST_CONFIG = {
  demoMode: true,
  workforceEndpoint: "",
  clientEndpoint: ""
};
```

No form data leaves the browser in this mode.

When VisWest is registered, has a business email/privacy notice, and you choose a secure form service, paste the relevant endpoints into `config.js` and change `demoMode` to `false`.

## Legal status
The website clearly states that VisWest Industrial Services is in development and is not yet represented as an operating labour-hire or contracting business.
