/* ============================================================================
   CONFIG — edit this file to turn this template into a specific client's site.
   ----------------------------------------------------------------------------
   This is the ONE file you should need to touch for 90% of a new build.
   Every page (index.html, services.html, about.html, contact.html,
   reviews.html) reads from this same object via main.js.

   A few things are NOT driven from here, and you'll edit them by hand once
   per site (see README.md "What CONFIG can't do" for why):
     - The <title> and meta description/Open Graph tags in each page's <head>
     - sitemap.xml and robots.txt (need the real domain)
     - The photo FILES themselves — you still have to drop real images into
       /images and point the paths below at them
   ============================================================================ */

const CONFIG = {

  // ---- Basic business info -------------------------------------------------
  business: {
    name: "[Business Name]",
    tagline: "[Short tagline — one sentence, what they do and why it matters]",
    // 1-2 sentence description, used in the About page intro and as a fallback
    // for meta descriptions you write by hand in each page's <head>.
    description: "[One or two sentences describing the business — used as the About intro.]",
  },

  // ---- Labels ---------------------------------------------------------------
  // Lets you relabel the "Services" concept per business type without
  // touching any HTML. Examples: restaurant -> "Menu", contractor ->
  // "Services We Offer", salon -> "Services & Pricing".
  labels: {
    servicesNav: "Services",
    servicesHeading: "Our Services",
  },

  // ---- Theme colors -----------------------------------------------------
  // These become CSS variables (--primary, --primary-dark, etc.) applied to
  // the whole site at load time — see main.js applyTheme(). Change these per
  // client so every site doesn't look like a clone of the last one. Check
  // contrast against --bg / --surface when you pick new colors.
  theme: {
    primary: "#2c5f6f",
    primaryDark: "#1e434f",
    accent: "#e08e45",
    bg: "#ffffff",
    surface: "#f5f6f4",
    text: "#1f2422",
    textLight: "#5b6663",
    border: "#e0e2dc",
  },

  // ---- Contact -----------------------------------------------------------
  contact: {
    phoneDisplay: "(XXX) XXX-XXXX",
    phoneHref: "+1XXXXXXXXXX", // used in tel: links — digits only, with country code
    email: "owner@example.com",
    address: {
      street: "123 Main Street",
      city: "Jesup",
      state: "GA",
      zip: "31546",
    },
  },

  // ---- Hours ---------------------------------------------------------------
  // Rendered as a simple list on the Contact page (and footer). Use "Closed"
  // for days off, or delete rows that don't apply.
  hours: [
    { day: "Monday", hours: "9:00 AM – 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
    { day: "Friday", hours: "9:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
  ],

  // ---- Social links -----------------------------------------------------
  // Leave a value as "" (empty string) to hide that icon/link entirely.
  social: {
    facebook: "",
    instagram: "",
  },

  // ---- Hero (Home page) -----------------------------------------------------
  hero: {
    heading: "[Hero headline — what the business does, in plain language]",
    subheading: "[One supporting sentence — who it's for, or what makes it different]",
    photo: "images/placeholder-wide.svg",
    photoAlt: "[Placeholder — replace with a real photo: storefront, food, the shop, the crew at work]",
  },

  // ---- Services / Menu items --------------------------------------------
  // Generic on purpose. "price" is optional — omit it (or leave "") for
  // services that are quote-based.
  services: [
    {
      name: "[Service or item name]",
      description: "[One or two sentences describing it]",
      price: "$XX",
    },
    {
      name: "[Service or item name]",
      description: "[One or two sentences describing it]",
      price: "$XX",
    },
    {
      name: "[Service or item name]",
      description: "[One or two sentences describing it]",
      price: "",
    },
  ],

  // ---- About page ------------------------------------------------------
  about: {
    heading: "Our Story",
    body: "[A few sentences about the business — how it started, who runs it, what makes it different. Written in the owner's voice, not corporate-speak.]",
    photo: "images/placeholder-wide.svg",
    photoAlt: "[Placeholder — replace with a photo of the owner or team]",
  },

  // ---- Testimonials / Reviews ---------------------------------------------
  // First 2 show as a preview on the Home page; all of them show on
  // reviews.html. Add or remove entries freely.
  testimonials: [
    {
      quote: "[Placeholder — replace with a real customer quote]",
      author: "[Customer name]",
      source: "Google Review",
    },
    {
      quote: "[Placeholder — replace with a real customer quote]",
      author: "[Customer name]",
      source: "Facebook Review",
    },
    {
      quote: "[Placeholder — replace with a real customer quote]",
      author: "[Customer name]",
      source: "Google Review",
    },
  ],

  // ---- SEO -----------------------------------------------------------------
  // siteUrl is used to build the Google Maps embed link's fallback and is
  // referenced in README instructions for sitemap.xml/robots.txt — those two
  // files are plain static files search engines read directly, so they can't
  // pull from this object and must be edited by hand to match.
  seo: {
    siteUrl: "https://www.example.com",
  },

  // ---- Live Oak Digital credit ---------------------------------------------
  // Small footer credit line linking back to your own site. Set to "" to
  // remove it for a client who'd rather not have it.
  builtBy: {
    label: "Website by Live Oak Digital",
    url: "https://www.liveoakdigital.co",
  },
};
