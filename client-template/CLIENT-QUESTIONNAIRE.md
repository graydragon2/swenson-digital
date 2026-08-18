# New Client Questionnaire

Send this to a prospective client (email, text, or read it to them on the
free 15-minute call) before starting a build. Their answers map straight
onto `config.js` — see the note after each section.

A polished, sendable version of this same questionnaire is published at:
https://claude.ai/code/artifact/ae237255-cdd8-4083-bef7-6b7a376ac34d

Tell them upfront: skip anything they're not sure about, phone photos are
fine, unpolished writing is fine — you'll clean it up before it goes live.

## 1. The basics
- Business name (exact spelling/capitalization)
- One-line tagline
- Two-sentence description of the business
- What do they call what they sell? (Services, Menu, Packages, Products...)

→ `business.name`, `business.tagline`, `business.description`, `labels.servicesNav` / `labels.servicesHeading`

## 2. Contact & location
- Best phone number (call, text, or both?)
- Business email
- Street address (skip if no public storefront — see the Cookie & Crumb
  build for how to handle a no-storefront business)
- Preferred contact method (call, text, Messenger, contact form?)

→ `contact.phoneDisplay`, `contact.phoneHref`, `contact.email`, `contact.address`

## 3. Hours & availability
- Regular hours, or "by appointment," "order-based," pop-up dates, etc. —
  doesn't need to fit a Monday–Friday grid

→ `hours[]`

## 4. Look & feel
- Logo file, if they have one (any size/format — clean it up yourself)
- Brand colors, if any (hex codes or "the green on our sign")
- Three words for the vibe (playful/handmade vs. sharp/minimal, etc.)
- Any sites they like the look of (optional)

→ `theme.*`, and the logo becomes the new `favicon.svg`

## 5. Online presence
- Facebook page URL
- Instagram handle
- Google Business Profile (ask them to search their business name on
  Google Maps if they're not sure they have one)
- Existing website, if any (may have content/photos worth keeping)

→ `social.facebook`, `social.instagram`, `reviewLinks.google`, `reviewLinks.facebook`

## 6. What they offer
- Full list of services/products with a line or two on each (group similar
  items together if the list is long — see Cookie & Crumb's menu grouping)
- Do they want prices shown, or "contact for pricing"?

→ `services[]`

## 7. Their story
- Who's behind the business and how it started — get it in their own
  words, then tighten it up rather than rewriting their voice out of it
- What makes them different from the other options nearby

→ `about.body`

## 8. Photos
- One hero photo (best single shot of the product/space/work)
- A photo of the owner/team (for the About page)
- 4–6 more for a gallery (optional) — Facebook/Instagram photos are fine,
  ask for the originals if possible

→ `hero.photo`, `about.photo`, `gallery[]`

## 9. Reviews
- Real customer quotes only, ever — screenshot or paste text + name.
  No reviews yet is fine; launch without that section and add later.

→ `testimonials[]`

## 10. Domain & email
- Do they already own a domain? Where's it registered?
- If not, what would they want it to be?
- Do they want a matching business email (e.g. hello@theirbusiness.com)?

→ `seo.siteUrl`, plus the manual `<head>` tags (see README "What CONFIG can't do")

## 11. Anything else
- Questions customers always ask (FAQ material)
- Anything they specifically don't want on the site
- Anything else worth knowing
