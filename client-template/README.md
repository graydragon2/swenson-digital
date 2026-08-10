# Live Oak Digital — Client Site Template

A generic, reusable starter for client websites. No build step, no
frameworks, no dependencies — plain HTML/CSS/JS you can open straight in a
browser. Goal: fork this, fill in one file, and have a finished site in
under an hour.

## What's in here

```
client-template/
  index.html      Home
  services.html   Services / Menu (relabel via config.js for the client's business type)
  about.html      About
  contact.html    Contact + location (map) + hours
  reviews.html    Reviews / testimonials
  config.js       ALL swappable content lives here — start here
  main.js         Reads config.js and fills in every page. Don't usually need to touch this.
  style.css       Layout + the CSS variables config.js overrides for per-client color themes
  images/         Drop client photos in here
  robots.txt      Edit the domain, otherwise done
  sitemap.xml     Edit the domain, otherwise done
```

## Forking this for a new client (the fast path)

1. **Copy this whole folder** to a new project (e.g. `cp -r client-template acme-diner`).
2. **Open `config.js`** and fill in every `[bracketed placeholder]`:
   - `business.name`, `tagline`, `description`
   - `labels.servicesNav` / `servicesHeading` — rename "Services" to "Menu",
     "Services We Offer", etc. if that fits the business better
   - `theme` — pick 2-3 colors that suit this specific business. Don't reuse
     the last client's palette; that's the whole point of the CSS variables.
   - `contact`, `hours`, `social`
   - `hero`, `about`, `services` (add/remove array entries freely), `testimonials`
   - `seo.siteUrl` — the real domain once you know it
3. **Add real photos** to `/images` and point `hero.photo` / `about.photo` at
   them (e.g. `images/hero.jpg`). Keep the alt text fields (`hero.photoAlt`,
   `about.photoAlt`) filled in with a real description — that's what screen
   readers and Google Images use.
4. **Update the `<title>` and meta tags** in the `<head>` of all 5 HTML
   files to match what you put in `config.js` (see "What CONFIG can't do"
   below for why this is a manual step).
5. **Update `robots.txt` and `sitemap.xml`** with the real domain.
6. **Preview locally**: just open `index.html` in a browser, or run a quick
   local server (`python3 -m http.server`) so the Google Maps iframe and
   relative paths behave exactly like production.
7. **Deploy**: drag the folder onto Netlify or Vercel (both have a
   drag-and-drop "Deploy" zone for static sites), or connect the repo for
   git-based deploys. No build command needed — it's already static.

Filling in `config.js` correctly is genuinely most of the work. Layout,
responsiveness, and SEO scaffolding are already done.

## What CONFIG can't do

`config.js` drives almost everything, but a few things are still edited by
hand, once per site:

- **`<title>` and meta description / Open Graph tags** in each page's
  `<head>`. Search engines and link-preview bots (Facebook, iMessage,
  Slack...) frequently read these without executing JavaScript, so anything
  JS-injected is a gamble for SEO and social sharing. Keep them in sync with
  `config.js` by hand — there's a comment at the top of every page's `<head>`
  as a reminder.
- **`robots.txt` / `sitemap.xml`** — plain files search engines fetch
  directly; they can't run `config.js`.
- **The photo files themselves** — `config.js` only holds the *paths* to
  photos; you still have to put the actual image files in `/images`.

## Adding or removing a page

There's no templating engine, so the header/nav and footer are repeated in
each HTML file. If you add a 6th page, copy the header/footer block from an
existing page and add a nav link to it in **all** pages (search for
`primary-nav` and `Quick Links`). If you remove a page, do the reverse.

## Fonts

The template ships with a system font stack (`--font-heading` /
`--font-body` in `style.css`) — zero extra network requests, fast on any
connection, and honestly plenty legible. If a client wants more visual
personality, add a Google Fonts `<link>` to each page's `<head>` and update
those two CSS variables. Don't add a web font by default; it's an
unnecessary dependency for most small-business sites.

## Accessibility notes already baked in

- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- Skip-to-content link
- Visible focus states on form fields
- `alt` text is required content in `config.js` for every photo — don't ship
  a client site with the placeholder alt text still in place
- Color contrast in the default theme meets WCAG AA; if you pick new
  `theme` colors, spot-check contrast (e.g. with browser devtools) before
  shipping, especially `text` on `bg`/`surface` and white text on `primary`

## The Google Map

`contact.html` has an empty `<iframe data-map>`. `main.js` builds its `src`
automatically from `CONFIG.contact.address` using Google's no-API-key embed
format (`google.com/maps?q=...&output=embed`). You don't need a Google Maps
API key for this. If a client wants a fancier embed (custom pin, street
view), swap in a real Google Maps Embed API iframe and remove the
`data-map` attribute so `main.js` leaves it alone.

## Contact form

`contact.html`'s form posts to Formspree (a free, no-backend form
service) with a placeholder form ID. Create a free Formspree form for the
client and swap in the real `action` URL. Any similar service (Netlify
Forms, Basin, etc.) works the same way — just change the `action` attribute.
