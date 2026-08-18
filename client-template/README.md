# Swenson Digital — Client Site Template

A generic, reusable starter for client websites. No build step, no
frameworks, no dependencies — plain HTML/CSS/JS you can open straight in a
browser. Goal: fork this, fill in one file, and have a finished site in
under an hour.

## What's in here

```
client-template/
  index.html      Home
  services.html   Services / Menu (relabel via config.js for the client's business type)
  about.html      About (+ optional photo gallery)
  contact.html    Contact + location (map) + hours
  reviews.html    Reviews / testimonials + "leave us a review" links
  config.js       ALL swappable content lives here — start here
  main.js         Reads config.js and fills in every page. Don't usually need to touch this.
  style.css       Layout + the CSS variables config.js overrides for per-client color themes
  images/         Drop client photos in here
  favicon.svg     Placeholder browser-tab icon — swap per client
  robots.txt      Edit the domain, otherwise done
  sitemap.xml     Edit the domain, otherwise done
```

## Forking this for a new client (the fast path)

0. **Send the client `CLIENT-QUESTIONNAIRE.md`** (or the polished version
   published at the link inside it) before you start — their answers map
   straight onto `config.js`, so this is what makes step 2 fast instead of
   a scavenger hunt through their Facebook page.
1. **Copy this whole folder** to a new project (e.g. `cp -r client-template acme-diner`).
2. **Open `config.js`** and fill in every `[bracketed placeholder]`:
   - `business.name`, `tagline`, `description`
   - `labels.servicesNav` / `servicesHeading` — rename "Services" to "Menu",
     "Services We Offer", etc. if that fits the business better
   - `theme` — pick 2-3 colors that suit this specific business. Don't reuse
     the last client's palette; that's the whole point of the CSS variables.
   - `contact`, `hours`, `social`, `reviewLinks` (leave blank until you have
     the client's Google/Facebook review links, then it just works)
   - `hero`, `about`, `services` (add/remove array entries freely), `testimonials`
   - `gallery` — optional; leave as the default 4 placeholders, add more,
     or set to `[]` to hide the gallery section on about.html entirely
   - `seo.siteUrl` — the real domain once you know it
3. **Add real photos** to `/images` and point `hero.photo` / `about.photo` /
   `gallery[].src` at them (e.g. `images/hero.jpg`). Keep the alt text fields
   filled in with a real description — that's what screen readers and Google
   Images use.
4. **Update the `<title>`, meta tags, canonical link, and JSON-LD block** in
   the `<head>` of all 5 HTML files to match what you put in `config.js` (see
   "What CONFIG can't do" below for why this is a manual step).
5. **Replace `favicon.svg`** with the client's real logo mark, or at least a
   simple initial in their brand color, so the browser tab doesn't look
   unfinished.
6. **Update `robots.txt` and `sitemap.xml`** with the real domain.
7. **Preview locally**: just open `index.html` in a browser, or run a quick
   local server (`python3 -m http.server`) so the Google Maps iframe and
   relative paths behave exactly like production.
8. **Deploy**: drag the folder onto Netlify or Vercel (both have a
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
- **The `LocalBusiness` JSON-LD block** in each page's `<head>` — same
  reasoning as the meta tags. It duplicates `business.name`, `contact`, and
  `address` from `config.js`; keep the two in sync by hand.
- **The canonical `<link>` tag** on each page — needs the real domain.
- **`favicon.svg`** — an actual file, not a config value; swap it per client.
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

## Photo gallery (about.html)

`CONFIG.gallery` is an array of `{ src, alt }` objects rendered as a grid on
the About page. It's worth the extra few minutes for restaurants, contractors,
auto shops, and salons — "show me the work/food" often sells harder than
paragraphs of copy. For businesses where it doesn't add much (most
professional services, churches), set `gallery: []` and the section hides
itself automatically — no HTML to touch.

## "Leave us a review" (reviews.html)

`CONFIG.reviewLinks.google` / `.facebook` take direct links to leave a
review. Get the Google one from the client's Google Business Profile ("Ask
for reviews" gives a shareable link). Both buttons stay hidden until you
fill these in, so it's safe to leave blank on an early build and add later
once the client's GBP is set up.

## Special case: churches

The generic "Services" concept doesn't map cleanly onto a church. A few
things to do differently when forking for one:

- Set `labels.servicesNav` / `servicesHeading` to something like "Service
  Times" or "Worship & Ministries" — not "Services," which reads as a price
  list once rendered through the `service-item` card layout.
- Leave every `services[].price` field as `""`. The card component only
  shows a price line when one is present, so this keeps donation-based /
  no-price entries from looking broken.
- Consider repurposing the `services` array for ministries or programs
  (e.g. "Youth Group," "Sunday School," "Food Pantry") rather than a
  price list — the name/description shape still fits.
- `gallery: []` is usually the right call unless there's a specific event
  or building you want to show off.

## Headline swipe file

Starting from a blank `[Hero headline]` bracket is the slowest part of a
fast build. A few starting points per trade — write the real one from
there, don't ship these verbatim:

- **Restaurant**: "Real [cuisine], made fresh, five minutes from downtown
  [Town]." / "The plate lunch [Town] has been asking for since 19XX."
- **Contractor**: "[Trade] work done right, the first time." / "Licensed,
  local, and not going anywhere after the job's done."
- **Salon**: "Look good. Feel good. Right here in [Town]." / "Your new
  favorite chair is closer than you think."
- **Auto shop**: "Honest work on your car, from people who live here too."
  / "We fix it right so you're not back next month."
- **Farm supply**: "Everything the farm needs, in one stop in [Town]." /
  "Feed, fencing, and folks who know what you're actually asking for."
- **Church**: "A church home in [Town] — come as you are." / "Faith,
  family, and a place to belong in [Town]."
