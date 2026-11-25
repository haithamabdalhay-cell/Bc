# Haitham Abdalhay — Digital Business Card

A premium, mobile-first digital business card. Plain HTML, CSS and a little JavaScript: no build step, no dependencies, no paid services. Ready for free GitHub Pages hosting.

**Live address (after deploying):** https://haithamabdalhay-cell.github.io/Atl/

## What it does

- Call, WhatsApp and email in one tap
- **Save contact** downloads a `.vcf` file (name, title, company, phone, email, social links and photo)
- LinkedIn, Instagram and Facebook links
- **Share**: the phone's native share sheet where supported, otherwise the link is copied
- QR code of the card for printing or showing on screen
- SEO tags, Open Graph / Twitter preview image, structured data (Person)

## Deploy to GitHub Pages

### Option A — upload in the browser (easiest)

1. Unzip the project on your computer.
2. Open your repository: `github.com/haithamabdalhay-cell/Atl`.
3. **Add file → Upload files**, then drag in everything inside the unzipped folder (`index.html`, the `assets` folder, `haitham-abdalhay.vcf` and the rest). The hidden items `.nojekyll` and `.github` are optional for this option.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
6. Wait one or two minutes, then open https://haithamabdalhay-cell.github.io/Atl/

### Option B — GitHub Actions

Upload everything including the `.github` folder, then in **Settings → Pages** set **Source: GitHub Actions**. Every push to `main` redeploys the site automatically. Use Option A or B, not both.

### Option C — command line

```bash
cd atl-card
git init -b main
git add .
git commit -m "Digital business card"
git remote add origin https://github.com/haithamabdalhay-cell/Atl.git
git push -u origin main --force
```

Then enable Pages as in step 5 above. (`--force` replaces what is currently in the repository, so only use it if that is what you want.)

The old `Hlg.png` in the repository root is no longer used by the site. You can delete it.

## Change things

| What | Where |
|---|---|
| Phone, email, WhatsApp, social links | `index.html` (contact rows, social tiles, and the JSON-LD block in `<head>`) |
| Introduction line | `index.html`, the `.intro` paragraph |
| Saved contact details | `haitham-abdalhay.vcf`: edit any line in a text editor, leave the long `PHOTO` line alone |
| Portrait | `assets/img/portrait-720.webp` and `portrait-1100.webp` (transparent cut-out, same proportions), plus `og-image.jpg` for the link preview |
| Colors and spacing | the `:root` variables at the top of `assets/css/styles.css` |

### If the address changes

If you use a different repository name or a custom domain, replace `haithamabdalhay-cell.github.io/Atl` in `index.html`, `404.html`, `robots.txt`, `sitemap.xml` and `haitham-abdalhay.vcf`, and replace `assets/qr/card-qr.svg` with a new QR code for the new address (any free QR generator that exports SVG works). For a custom domain, also add a file named `CNAME` containing just the domain.

### Link previews

WhatsApp, Facebook and LinkedIn cache link previews. If you change the preview image or title and the old one still shows, refresh it with the Facebook Sharing Debugger or LinkedIn Post Inspector.

## Project structure

```
index.html              the page (icons are inlined)
404.html                not-found page
haitham-abdalhay.vcf    contact file for "Save contact"
site.webmanifest        home-screen icon and colors
robots.txt, sitemap.xml search engine files
.nojekyll               tells GitHub Pages to serve files as they are
.github/workflows/      optional Pages deployment workflow
assets/
  css/styles.css        design tokens and layout (mobile-first)
  js/app.js             share, copy link, feedback messages
  fonts/                Geist and Geist Mono (subset, self-hosted)
  img/                  portrait, preview image, favicon, app icons
  qr/card-qr.svg        QR code of the card address
```

## Notes

- All paths are relative, so the site works at `username.github.io/repo/` and on a custom domain.
- Fonts: Geist and Geist Mono (SIL Open Font License). Brand icons: Simple Icons (CC0).
- Contact details are in plain HTML so everything works without JavaScript. The trade-off is that spam bots can read them, which is normal for a public business card.
- Motion is disabled automatically for visitors who ask their device for reduced motion.
