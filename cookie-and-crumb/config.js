/* ============================================================================
   CONFIG — Cookie & Crumb (Screven, GA)
   ----------------------------------------------------------------------------
   Built from their Facebook page (facebook.com/share/1LYZFVP9ma/) as a test
   fork of the Live Oak Digital client template. Real business info below;
   product photos are still placeholders — see the note on `gallery` below.
   ============================================================================ */

const CONFIG = {

  // ---- Basic business info -------------------------------------------------
  business: {
    name: "Cookie & Crumb",
    tagline: "We make all your sweet dreams come true!",
    description: "A woman-owned, made-from-scratch cottage bakery in Screven, GA — gourmet cookies, sourdough, scones, and more, baked in small batches.",
  },

  // ---- Labels ---------------------------------------------------------------
  labels: {
    servicesNav: "Menu",
    servicesHeading: "Our Menu",
  },

  // ---- Theme colors -----------------------------------------------------
  // Pulled from their actual Facebook branding (deep purple + near-black,
  // with a warm gold accent) instead of reusing another client's palette.
  theme: {
    primary: "#6a3093",
    primaryDark: "#3c1a56",
    accent: "#e8a33d",
    bg: "#ffffff",
    surface: "#f7f2fa",
    text: "#241b2e",
    textLight: "#5e5268",
    border: "#e5dcee",
  },

  // ---- Contact -----------------------------------------------------------
  contact: {
    phoneDisplay: "(912) 294-5498",
    phoneHref: "+19122945498",
    email: "cookieandcrumb2@gmail.com",
    // This is where their mobile cart ("The Crumb Cruiser") sets up, not a
    // storefront — see the note in about.html / contact.html copy.
    address: {
      street: "115 W. J.L. Tyre St.",
      city: "Screven",
      state: "GA",
      zip: "31560",
    },
  },

  // ---- Hours ---------------------------------------------------------------
  // Cottage bakery, no fixed storefront hours — everything is by order, with
  // occasional pop-up cart dates announced on Facebook. Repurposing the
  // day/hours rows to fit that instead of a Mon-Fri schedule that doesn't apply.
  hours: [
    { day: "Ordering", hours: "Anytime — call, text, or message on Facebook" },
    { day: "Pickup / Delivery", hours: "Arranged when you order" },
    { day: "The Crumb Cruiser (pop-up cart)", hours: "Dates posted on Facebook" },
  ],

  // ---- Social links -----------------------------------------------------
  social: {
    facebook: "https://www.facebook.com/share/1LYZFVP9ma/",
    instagram: "",
  },

  // ---- Review links -------------------------------------------------------
  // TODO: swap for a direct link to their Facebook reviews tab once you have
  // the canonical page URL (the share link above works but isn't ideal for this).
  reviewLinks: {
    google: "",
    facebook: "",
  },

  // ---- Hero (Home page) -----------------------------------------------------
  hero: {
    heading: "We Make All Your Sweet Dreams Come True",
    subheading: "Gourmet, made-from-scratch cookies, sourdough, scones, and more — baked in small batches in Screven, GA.",
    photo: "images/real/strawberry-cookie.jpg",
    photoAlt: "A Cookie & Crumb strawberry cookie drizzled with cream cheese icing",
  },

  // ---- Menu ---------------------------------------------------------------
  // Their real Facebook menu graphic lists 60+ individual flavors — too many
  // for individual cards, so these are grouped by category with a few
  // standout flavors named in the description. No prices were listed
  // anywhere on their page (order-based pricing), so price is left blank.
  services: [
    {
      name: "Sourdough Loaves",
      description: "15+ scratch-made flavors — Classic Artisan, Jalapeño Cheddar, Cranberry Pecan, and more. Full, half, or mini.",
      price: "",
    },
    {
      name: "Cookies & Cookie Sandwiches",
      description: "30+ flavors, from classic Chocolate Chip to Oatmeal Cream Pies, Cookie Monster, and Key Lime Sandwich.",
      price: "",
    },
    {
      name: "Scones",
      description: "10 flavors, including Peach Cobbler, Bacon Cheddar Chive, and White Chocolate Cranberry.",
      price: "",
    },
    {
      name: "Brownies, Dot Cakes & More",
      description: "Brown butter brownies, viral dot cakes, and glazed lemon blueberry loaves.",
      price: "",
    },
    {
      name: "Monthly Subscription Box",
      description: "A themed surprise box of baked goods delivered every month.",
      price: "",
    },
    {
      name: "The Crumb Cruiser",
      description: "Our mobile treat cart pops up around Screven — follow Facebook for dates and locations.",
      price: "",
    },
  ],

  // ---- About page ------------------------------------------------------
  about: {
    heading: "Meet Rachel",
    // Paraphrased from her real "who I am" Facebook post (Nov 9) — not
    // invented, but paraphrased rather than quoted verbatim, so still worth
    // having her confirm the exact wording before this goes live.
    body: "Hi, I'm Rachel — the one-woman baker behind Cookie & Crumb. Between being a wife, mom, teacher, and grad school student, plus a full-time travel ball, softball, and gymnastics mom, free time is hard to come by — but the little I had, I started spending on baking. That turned into this. Everything is still made from scratch, in small batches, by me. Follow along, and don't hesitate to reach out if you want to order or just have a question.",
    photo: "images/real/rachel-headshot.jpg",
    photoAlt: "Rachel, the baker behind Cookie & Crumb",
  },

  // ---- Photo gallery (optional) ------------------------------------------
  gallery: [
    { src: "images/real/oatmeal-cream-pies.jpg", alt: "A batch of Cookie & Crumb's oatmeal cream pie cookie sandwiches" },
    { src: "images/real/wc-cake-pops.jpg", alt: "Cookie & Crumb chocolate letter cake pops, decorated with gold detail" },
    { src: "images/real/sourdough-boule.jpg", alt: "A freshly baked sourdough boule from Cookie & Crumb" },
    { src: "images/real/crumb-cruiser-cart.jpg", alt: "The Crumb Cruiser mobile treat cart, open for business" },
  ],

  // ---- Testimonials / Reviews ---------------------------------------------
  // Their one real Facebook review, used as-is. Add more here as they come in.
  testimonials: [
    {
      quote: "We tried a variety of cookies. The oatmeal cream pies were my favorite. The Oreo cookies were a hit with the littles.",
      author: "Dawn Stone",
      source: "Facebook Review",
    },
  ],

  // ---- SEO -----------------------------------------------------------------
  seo: {
    siteUrl: "https://www.example.com",
  },

  // ---- Live Oak Digital credit ---------------------------------------------
  builtBy: {
    label: "Website by Live Oak Digital",
    url: "https://www.liveoakdigital.co",
  },
};
