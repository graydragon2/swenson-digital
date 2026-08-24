/* ============================================================================
   CONFIG — Cookie & Crumb (Screven, GA)
   ----------------------------------------------------------------------------
   Built from their Facebook page (facebook.com/share/1LYZFVP9ma/) as a test
   fork of the Swenson Digital client template. Real business info below.

   2026-08 redesign note: full visual rebuild — new editorial palette,
   Playfair Display/Work Sans typography, asymmetric "signature" product
   layout, custom-order flow, masonry gallery. All content below is still
   real (nothing invented) — see the `signature` and `customOrders` blocks
   for what's new and what still needs Rachel's input.
   ============================================================================ */

const CONFIG = {

  // ---- Basic business info -------------------------------------------------
  business: {
    name: "Cookie & Crumb",
    tagline: "Small-batch cookies, baked by hand in Screven, GA.",
    description: "A woman-owned, made-from-scratch cottage bakery in Screven, GA — gourmet cookies, sourdough, scones, and more, baked in small batches.",
  },

  // ---- Labels ---------------------------------------------------------------
  labels: {
    servicesNav: "Menu",
    servicesHeading: "The Full Menu",
  },

  // ---- Theme colors -----------------------------------------------------
  // Editorial boutique-bakery palette: warm ivory + deep espresso ink, a
  // muted caramel for decorative accents, one restrained terracotta used
  // only for calls to action. Replaces the earlier purple/gold theme,
  // which read more "craft template" than boutique — deliberate as part
  // of the full redesign, not a tweak.
  theme: {
    primary: "#3a2a1f",
    primaryDark: "#241810",
    accent: "#a8462d",
    bg: "#fbf6ee",
    surface: "#f2e6d3",
    text: "#2e2119",
    textLight: "#6b5a48",
    border: "#e6d7bd",
    caramel: "#c08a4e",
    cream: "#fffdf8",
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
    // New as of 8/11/2026 — a real retail stockist with walk-in hours.
    // Weekly drops, so stock varies; kept the "follow Facebook" framing
    // rather than promising specific items are always in stock.
    { day: "Weekend Sweets LLC (Jesup)", hours: "Tue–Thu 11am–5pm, Fri 11am–6pm, Sat 11am–2pm — weekly drops, follow Facebook for what's in stock" },
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
    eyebrow: "Screven, Georgia",
    heading: "Small batches. Big cravings.",
    subheading: "Gourmet cookies, sourdough, and scones — made from scratch, by hand, in a home kitchen a few miles from wherever you are.",
    photo: "images/real/strawberry-cookie.jpg",
    photoAlt: "A Cookie & Crumb strawberry cookie drizzled with cream cheese icing",
  },

  // ---- Signature products (Home page) --------------------------------------
  // A curated few, not the whole menu — see `services` below for everything.
  // Each entry mirrors a real item from `services`; image assignments use
  // the real product photos already on file (nothing stocked/stock-photo).
  signature: [
    {
      name: "Sourdough Loaves",
      description: "Fifteen-plus scratch-made flavors, naturally leavened and baked to order — Classic Artisan, Jalapeño Cheddar, Cranberry Pecan, and more. Full, half, or mini.",
      image: "images/real/sourdough-boule.jpg",
      imageAlt: "A freshly baked sourdough boule from Cookie & Crumb, deeply scored and golden",
    },
    {
      name: "Cookie Sandwiches",
      description: "Soft-baked and stacked — Oatmeal Cream Pies among the most requested, filled thick and finished by hand.",
      image: "images/real/oatmeal-cream-pies.jpg",
      imageAlt: "A batch of Cookie & Crumb oatmeal cream pie cookie sandwiches, generously filled",
    },
    {
      name: "Dot Cakes & More",
      description: "Brown butter brownies, glazed lemon blueberry loaves, and the viral dot cakes — a small, changing lineup beyond the cookie case.",
      image: "images/real/wc-cake-pops.jpg",
      imageAlt: "Cookie & Crumb chocolate letter cake pops, hand-decorated with gold detail",
    },
  ],

  // ---- Custom orders (Home page + Contact page) ----------------------------
  // NOTE: only confirmed facts below — Rachel takes custom requests through
  // Facebook Messenger, and no set occasion list has been confirmed (no
  // wedding/event package, specific decorated-cookie pricing, etc. verified
  // yet). Expand this once she's given real specifics — do not add occasion
  // types or packages without her confirming them first.
  customOrders: {
    heading: "Something specific in mind?",
    body: "Cookie & Crumb takes custom requests — send a message with what you're picturing (flavors, quantity, timing) and Rachel will let you know what's possible.",
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
      icon: "🍞",
    },
    {
      name: "Cookies & Cookie Sandwiches",
      description: "30+ flavors, from classic Chocolate Chip to Oatmeal Cream Pies, Cookie Monster, and Key Lime Sandwich.",
      price: "",
      icon: "🍪",
    },
    {
      name: "Scones",
      description: "10 flavors, including Peach Cobbler, Bacon Cheddar Chive, and White Chocolate Cranberry.",
      price: "",
      icon: "🥐",
    },
    {
      name: "Brownies, Dot Cakes & More",
      description: "Brown butter brownies, viral dot cakes, and glazed lemon blueberry loaves.",
      price: "",
      icon: "🧁",
    },
    {
      name: "Monthly Subscription Box",
      description: "A themed surprise box of baked goods delivered every month.",
      price: "",
      icon: "📦",
    },
  ],
  // Note: "The Crumb Cruiser" (the mobile pop-up cart) was pulled out of this
  // list on purpose — it's a place to buy, not a product like the rest of
  // these. Its info already lives in the Hours table below (and on the
  // Contact page), so it doesn't need its own menu card.

  // ---- About page ------------------------------------------------------
  about: {
    heading: "Meet Rachel",
    // Paraphrased from her real "who I am" Facebook post (Nov 9) — not
    // invented, but paraphrased rather than quoted verbatim, so still worth
    // having her confirm the exact wording before this goes live.
    body: "Hi, I'm Rachel — the one-woman baker behind Cookie & Crumb. Between being a wife, mom, teacher, and grad school student, plus a full-time travel ball, softball, and gymnastics mom, free time is hard to come by — but the little I had, I started spending on baking. That turned into this. Everything is still made from scratch, in small batches, by me. Follow along, and don't hesitate to reach out if you want to order or just have a question.",
    pullQuote: "Everything is still made from scratch, in small batches, by me.",
    photo: "images/real/rachel-headshot.jpg",
    photoAlt: "Rachel, the baker behind Cookie & Crumb",
  },

  // ---- Photo gallery (optional) ------------------------------------------
  gallery: [
    { src: "images/real/oatmeal-cream-pies.jpg", alt: "A batch of Cookie & Crumb's oatmeal cream pie cookie sandwiches" },
    { src: "images/real/wc-cake-pops.jpg", alt: "Cookie & Crumb chocolate letter cake pops, decorated with gold detail" },
    { src: "images/real/sourdough-boule.jpg", alt: "A freshly baked sourdough boule from Cookie & Crumb" },
    { src: "images/real/crumb-cruiser-cart.jpg", alt: "The Crumb Cruiser mobile treat cart, open for business" },
    { src: "images/real/packaged-cookies-trio.jpg", alt: "Individually wrapped Cookie & Crumb cookies with cottage food labels — Browned Butter Chocolate Chip, Brookie, and Double Chocolate Fudge" },
    { src: "images/real/strawberry-cookie.jpg", alt: "A Cookie & Crumb strawberry cookie drizzled with cream cheese icing" },
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

  // ---- Swenson Digital credit ---------------------------------------------
  builtBy: {
    label: "Website by Swenson Digital",
    url: "https://www.swensondigital.co",
  },
};
