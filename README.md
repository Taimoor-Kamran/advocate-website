# Advocate Website

A static law-firm website — plain HTML, CSS and vanilla JavaScript. No frameworks, no build step.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, practice highlights, latest news |
| `about.html` | About the firm, experience stats, mission |
| `practice-areas.html` | All practice areas with "ALL PRACTICES" filter, industries, regions |
| `news.html` | News & client alerts (charcoal cards) |
| `contact.html` | Contact form (front-end only), details, map |
| `style.css` | All styling — colors are CSS variables at the top |
| `script.js` | Menu, search toggle, filter, animations, form validation |

## Editing content

- Every editable spot is marked with an `<!-- EDIT: ... -->` comment.
- **Firm name, phone, email, address** appear in the header, slide-in menu and footer of *all five* pages — search-and-replace across files (e.g. replace `+92 336 3062108` and `billionsworks@gmail.com` everywhere).
- **Colors/fonts:** change the CSS variables at the top of `style.css` (`--color-primary`, `--color-accent`, etc.).
- **Practice areas:** in `practice-areas.html`, each item is an `<a class="practice-item">` with a `data-category` matching a filter key in the dropdown.
- **News:** duplicate a `.news-card` block in `news.html` (newest first) and mirror the top three on `index.html`.
- **Google Map:** in `contact.html`, replace the iframe `src` — Google Maps → your office → Share → *Embed a map* → copy the `src` value.

## Open locally

Just double-click `index.html`, or from a terminal:

```bash
cd advocate-website
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

### Netlify (easiest — free)
1. Go to https://app.netlify.com/drop
2. Drag the whole `advocate-website` folder onto the page.
3. Done — you get a live URL immediately. Rename the site in *Site settings → Change site name*.

Bonus: to make the contact form actually deliver emails on Netlify, add `netlify` to the form tag (`<form id="contactForm" netlify>`), remove the `e.preventDefault()` handling in `script.js` section 5, and Netlify will collect submissions under *Forms*.

### GitHub Pages (free)
1. Create a repository on https://github.com/new (e.g. `advocate-website`).
2. From inside the folder:
   ```bash
   git init
   git add .
   git commit -m "Law firm website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/advocate-website.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/advocate-website/`.

### Custom domain
Both Netlify and GitHub Pages let you attach a custom domain (e.g. `billionsworksinternational.com`) for free — add the domain in their settings and point your DNS at them.

## Receiving contact-form emails (optional)

The form is front-end only. To get real submissions without a backend:
- **Formspree** (https://formspree.io): set `<form action="https://formspree.io/f/YOUR-ID" method="POST">` and delete section 5 of `script.js`.
- **Netlify Forms**: see the Netlify note above.
