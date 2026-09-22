/**
 * PROJECT DATA MODEL
 * ---------------------------------------------------------
 * This file is the single source of truth for every project on the site.
 * The UI (app.js) never hard-codes a project — it reads this array.
 *
 * TO ADD A NEW PROJECT: copy an object below, change the fields, save.
 * It will automatically appear in /work, in category filters, in search,
 * and — if featured + published — on the homepage. If status is
 * "in-progress" or "coming-soon" it will also appear in "Currently Shipping".
 *
 * When you're ready to move this to a real backend (Supabase/Sanity/etc.),
 * this array maps directly onto a `projects` table — see README.md.
 */

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "digital-presence", label: "Digital Presence" },
  { id: "digital-systems", label: "Digital Systems" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "growth", label: "Growth" },
  { id: "creative", label: "Creative" },
  { id: "ai-automation", label: "AI / Automation" },
];

const PROJECTS = [
  {
    id: "ice-hub-360",
    slug: "ice-hub-360",
    title: "Ice Hub 360",
    client: "Ice Hub Elite",
    year: "2026",
    category: "digital-systems",
    categories: ["digital-systems", "websites"],
    industry: "Restaurant & Food Service",
    status: "live",
    featured: true,
    published: true,
    sortOrder: 1,
    thumbnail: null,
    shortDescription: "A connected restaurant management system combining a smart customer menu with sales, kitchen and owner interfaces.",
    description: "Ice Hub Elite needed more than a website, it needed a working system to run the business day to day. Ice Hub 360 connects four interfaces around one restaurant: how customers order, how staff take payment, how the kitchen sees incoming orders, and how the owner sees the business.",
    business: "Ice Hub Elite is a restaurant and dessert business serving fresh meals, ice cream and milkshakes. Like most food businesses, its day-to-day operations were split across disconnected tools and manual processes.",
    challenge: "A restaurant doesn't run on a menu alone. Customers needed a simple way to browse and order. Staff at the counter needed a fast way to process sales. The kitchen needed visibility into what had actually been ordered, without relying on shouted tickets or paper. And the owner needed a way to see how the business was performing without being physically present.",
    approach: "Rather than building a single storefront, I mapped the restaurant's real workflow, from the moment a customer opens the menu to the moment an order is fulfilled and recorded, and designed a separate, purpose-built interface for each role in that workflow, connected by the same order data.",
    solution: "Four interfaces, one system: a customer-facing digital menu for browsing and ordering, a sales desk for processing transactions, a kitchen display for tracking incoming orders, and an owner dashboard for business visibility.",
    deliverables: [
      { title: "Customer Menu", desc: "A browsing and ordering experience for customers.", url: "https://icehubelite-ux.github.io/ice-hub-360/frontend/customer-menu/index.html" },
      { title: "Sales Desk", desc: "An interface for staff to process orders and payment.", url: "https://icehubelite-ux.github.io/ice-hub-360/frontend/sales-desk/index.html" },
      { title: "Kitchen Display", desc: "A real-time view of incoming orders for kitchen staff.", url: "https://icehubelite-ux.github.io/ice-hub-360/frontend/kitchen/index.html" },
      { title: "Owner Dashboard", desc: "A management view of the business for the owner.", url: "https://icehubelite-ux.github.io/ice-hub-360/frontend/dashboard/index.html" },
      { title: "AI Video Ad", desc: "An AI-generated advertisement created for the brand.", url: "videos/ice-hub-ai-ad.mp4" },
    ],
    role: ["Product Concept", "UX/UI Design", "Frontend Development", "System Architecture", "AI Video Creation"],
    services: ["Digital Systems", "UI/UX", "Frontend Development", "AI & Creative"],
    technologies: ["HTML/CSS/JavaScript", "GitHub Pages"],
    liveUrl: "https://icehubelite-ux.github.io/ice-hub-360/frontend/customer-menu/index.html",
    results: "Designed and deployed as a connected restaurant management experience, with four role-specific interfaces built around the restaurant's actual order workflow. Currently live and in use — the live site now also carries real customer reviews and credits the infrastructure to Mr Ahmed Growth Solutions in its footer.",
    testimonial: null,
    testimonialAuthor: null,
    seoTitle: "Ice Hub 360: A Digital Operating System for a Modern Restaurant",
    seoDescription: "How a connected customer menu, sales desk, kitchen display and owner dashboard were built into one restaurant system.",
    cover: "icehub",
    gallery: [
      { image: "images/ice-hub/ice-hub-1.jpg", caption: "The digital menu: browse by category, set quantity, order with no forms until you're ready." },
      { image: "images/ice-hub/ice-hub-2.jpg", caption: "Real customer reviews and business details, live on the deployed site." },
    ],
  },
  {
    id: "tesmalrufhan-world",
    slug: "tesmalrufhan-world",
    title: "Tesmalrufhan World",
    client: "Tesmalrufhan World",
    year: "2026",
    category: "ecommerce",
    categories: ["ecommerce", "websites", "digital-presence"],
    industry: "E-commerce",
    status: "live",
    featured: true,
    published: true,
    sortOrder: 2,
    shortDescription: "Building a digital commerce experience around product discovery, ordering and customer trust.",
    description: "An e-commerce presence built around how customers actually browse and decide to buy, clear product presentation, a straightforward path to ordering, and the trust signals a first-time buyer looks for.",
    business: "Tesmalrufhan World operates as an online commerce destination, presenting products to customers who are discovering the brand for the first time.",
    challenge: "New online buyers decide quickly. The site needed to present products clearly, make ordering simple, and give a first-time visitor enough confidence to complete a purchase.",
    approach: "The build focused on product discovery and a clean path from browsing to ordering, rather than adding features unrelated to how the store is actually used.",
    solution: "A commerce-focused website structured around product discovery and a straightforward ordering journey.",
    deliverables: [
      { title: "Storefront", desc: "Product discovery and browsing experience.", url: "https://tesmalrufhanworld.netlify.app" },
      { title: "Ordering Journey", desc: "A simplified path from product to order." },
    ],
    role: ["Website Design", "Frontend Development"],
    services: ["Digital Presence", "E-commerce"],
    technologies: ["Web Development", "Netlify"],
    liveUrl: "https://tesmalrufhanworld.netlify.app",
    results: "Live e-commerce experience deployed for product discovery and ordering.",
    testimonial: null,
    seoTitle: "Tesmalrufhan World: A Digital Commerce Experience",
    seoDescription: "Building a digital commerce experience around product discovery, ordering and customer trust.",
    cover: "tesmal",
  },
  {
    id: "mr-ahmed-growth-solutions",
    slug: "mr-ahmed-growth-solutions",
    title: "Mr Ahmed Growth Solutions",
    client: "Self-initiated",
    year: "2026",
    category: "digital-presence",
    categories: ["digital-presence", "growth", "websites"],
    industry: "Personal Brand",
    status: "live",
    featured: true,
    published: true,
    sortOrder: 3,
    shortDescription: "Building my own digital growth studio, the same principles I use for clients, applied to my own business.",
    description: "This is a self-initiated project, not client work: an earlier iteration of my own studio's positioning, visual identity and service architecture, a working example of how I approach my own presence before applying the same thinking to someone else's business.",
    business: "This is Mr Ahmed Growth Solutions itself, an earlier version of my own personal brand and studio site, built and shipped the way I'd build it for a client.",
    challenge: "Positioning a one-person studio credibly, without either overselling or disappearing into a generic freelancer template.",
    approach: "Treat the studio like any other business: define the positioning, design the identity, build the site, and structure the services around real problems rather than a list of tools.",
    solution: "A personal brand site with clear positioning, a service structure, and a conversion path for enquiries, since evolved into the site you're looking at now.",
    deliverables: [
      { title: "Brand Positioning", desc: "Defined how the studio is presented and understood." },
      { title: "Service Architecture", desc: "Organized offerings into clear solution areas." },
      { title: "Website", desc: "The studio's own site and conversion journey.", url: "https://mrahmedgrowthsolutions.netlify.app" },
    ],
    role: ["Brand Strategy", "Website Design", "Frontend Development"],
    services: ["Digital Presence", "Customer Acquisition"],
    technologies: ["Web Development", "Netlify"],
    liveUrl: "https://mrahmedgrowthsolutions.netlify.app",
    results: "Live and evolving, this project is continuously updated as the studio's positioning and service offering develop.",
    testimonial: null,
    seoTitle: "Mr Ahmed Growth Solutions, Building My Own Digital Growth Studio",
    seoDescription: "A self-initiated project demonstrating how I position, design and communicate my own services.",
    cover: "mags",
  },
  {
    id: "creative-space",
    slug: "creative-space",
    title: "Creative Space Limited",
    client: "Creative Space Limited",
    year: "2026",
    category: "websites",
    categories: ["websites", "digital-presence"],
    industry: "Business Services",
    status: "live",
    featured: true,
    published: true,
    sortOrder: 4,
    shortDescription: "A business website built for clear, professional presentation.",
    description: "A website built to give Creative Space Limited a clear, professional digital presence, presenting the business the way it needed to be presented to the people looking it up.",
    business: "Creative Space Limited is a business presented through its own website, built to communicate what it does and how to get in touch.",
    challenge: "The business needed a clear, professional website rather than a social-media-only presence.",
    approach: "Structure the site around what a visitor actually needs to know, who the business is, what it offers, and how to make contact, presented cleanly.",
    solution: "A professional business website built and deployed for Creative Space Limited.",
    deliverables: [
      { title: "Business Website", desc: "A professional site presenting the business.", url: "https://creativespacelimited.netlify.app" },
    ],
    role: ["Website Design", "Frontend Development"],
    services: ["Digital Presence"],
    technologies: ["Web Development", "Netlify"],
    liveUrl: "https://creativespacelimited.netlify.app",
    results: "Live business website, deployed and in use.",
    testimonial: null,
    seoTitle: "Creative Space Limited: Business Website",
    seoDescription: "A business website built for clear, professional presentation.",
    cover: "creative",
  },
  {
    id: "janesse-integrated-services",
    slug: "janesse-integrated-services",
    title: "Janesse Integrated Services",
    client: "Janesse Integrated Services Limited",
    year: "2026",
    category: "digital-presence",
    categories: ["digital-presence", "websites"],
    industry: "Event Design & Culinary Training",
    status: "live",
    featured: true,
    published: true,
    sortOrder: 5,
    shortDescription: "A website, Google Business Profile and social presence for an event-design studio that also runs a hands-on cake-training academy.",
    description: "Janesse Integrated Services runs two connected businesses under one brand: full-scale event design, weddings, receptions and kids' parties, and a structured, hands-on cake-and-pastry training academy.",
    business: "Janesse plans and styles events end-to-end: stage and backdrop design, table and chair styling, draping, lighting and floral work for weddings and receptions, plus custom cake orders. Alongside that, it runs a training academy that takes students from basic batter work through to advanced cake artistry and specialty builds.",
    challenge: "Two real but different businesses were sharing one brand, decor and event styling on one side, hands-on training on the other, and needed a digital presence that could represent both clearly without either one crowding out the other, across Search, social media and the website itself.",
    approach: "Structure the site around the two audiences separately, a visitor booking a wedding and a visitor considering training shouldn't have to dig through the wrong content to find what they came for, while keeping one consistent brand identity across both.",
    solution: "A multi-page website (Home, About, Services, Training, Gallery, Locations, Contact) alongside a Google Business Profile and ongoing social media management.",
    deliverables: [
      { title: "Website", desc: "A multi-page site covering services, a real project gallery, and a dedicated training program section.", url: "https://remarkable-daifuku-0f505d.netlify.app/" },
      { title: "Google Business Profile", desc: "Set up and managed for local discovery." },
      { title: "Social Media", desc: "Ongoing management of the business's social presence." },
    ],
    role: ["Website Design", "Google Business Profile", "Social Media Management"],
    services: ["Digital Presence"],
    technologies: ["Web Development", "Netlify"],
    liveUrl: "https://remarkable-daifuku-0f505d.netlify.app/",
    results: "Live and in use. The site presents both sides of the business, event design services with a real project gallery, and a training academy with its own program page, under one consistent brand.",
    testimonial: null,
    seoTitle: "Janesse Integrated Services: Event Design & Training Academy",
    seoDescription: "A website, Google Business Profile and social presence for an event-design studio and cake-training academy.",
    cover: "janesse",
    gallery: [
      { image: "images/janesse/janesse-1.jpg", caption: "Full-scale wedding design, stage, draping and floral styling, built start to finish." },
      { image: "images/janesse/janesse-2.jpg", caption: "A slice of the real project gallery, decor builds, kids' party setups and custom cakes." },
      { image: "images/janesse/janesse-3.jpg", caption: "The training academy walks students from puff-puff basics through advanced cake artistry." },
    ],
  },
  {
    id: "sug-tour-travels",
    slug: "sug-tour-travels",
    title: "SUG Tour & Travels",
    client: "SUG Tour Consult & Networking Services Ltd",
    year: "2026",
    category: "growth",
    categories: ["growth", "digital-presence", "websites"],
    industry: "Travel. Kaduna, Nigeria",
    status: "live",
    featured: false,
    published: true,
    sortOrder: 6,
    shortDescription: "A website and digital presence for an IATA-accredited travel agency offering flights, hotels and visa support across Nigeria.",
    description: "SUG Tour is an IATA-accredited travel agency based in Kaduna, Nigeria, handling flight bookings, hotel reservations and visa procurement support for individual, corporate and group travellers, and expanding into Hajj and Umrah packages.",
    business: "SUG Tour Consult & Networking Services Ltd is an IATA-accredited agency offering air ticket booking, hotel reservations and visa procurement support, with a dedicated track for corporate and group travel, and an expanding Hajj/Umrah offering.",
    challenge: "As an accredited agency competing for trust in a market full of informal, unverified travel agents, the business needed a digital presence that led with credibility, the IATA accreditation, clear service breakdowns, and a straightforward path to enquiry, rather than just a list of services.",
    approach: "Lead with the accreditation and a confident, trust-first headline, break services into clear categories a traveller actually searches for (flights, hotels, visas, corporate/group), and route enquiries through the channel this audience already uses: WhatsApp.",
    solution: "A website built around trust signals and clear service categories, a Google Business Profile for local discovery, and a WhatsApp-based enquiry journey.",
    deliverables: [
      { title: "Website", desc: "A trust-first site leading with IATA accreditation, broken into clear service categories.", url: "https://sugtourconsult.netlify.app/" },
      { title: "Google Business Profile", desc: "Local discovery and business presence." },
      { title: "WhatsApp Journey", desc: "A direct enquiry path suited to the audience." },
    ],
    role: ["Digital Strategy", "Website Design", "Campaign Concept"],
    services: ["Digital Presence", "Customer Acquisition"],
    technologies: ["Web Development", "Netlify"],
    liveUrl: "https://sugtourconsult.netlify.app/",
    results: "Live and deployed, leading with the agency's IATA accreditation. Campaign performance will be shared here once verified.",
    testimonial: null,
    seoTitle: "SUG Tour: IATA-Accredited Travel Agency Website",
    seoDescription: "A trust-first website and digital presence for an IATA-accredited travel agency in Kaduna, Nigeria.",
    cover: "sug",
    gallery: [
      { image: "images/sug-tour/sug-tour-1.jpg", caption: "\"Travel with confidence\" — the homepage leads with IATA accreditation, not just service claims." },
      { image: "images/sug-tour/sug-tour-2.jpg", caption: "Services broken into what travellers actually search for: flights, hotels, visa support." },
    ],
  },
  {
    id: "bokobaru-farmers-mcs",
    slug: "bokobaru-farmers-mcs",
    title: "Bokobaru Farmers MCS",
    client: "Bokobaru Farmers MCS Limited",
    year: "2026",
    category: "growth",
    categories: ["growth"],
    industry: "Agriculture: Frozen Foods",
    status: "coming-soon",
    featured: false,
    published: true,
    sortOrder: 7,
    shortDescription: "A 90-day digital presence and promotion strategy for a frozen chicken business.",
    description: "Bokobaru Farmers MCS Limited produces and sells frozen chicken. This project is a 90-day digital presence and promotion strategy for the business.",
    business: "An agricultural business producing and distributing Bokobaru frozen chicken.",
    challenge: "A frozen-food agriculture brand competing for attention against far more visible packaged-food competitors, with no structured digital presence to date.",
    approach: "A structured 90-day plan for building digital presence and promotion, sequencing what gets built and launched first rather than doing everything at once.",
    solution: "A phased digital presence and promotion rollout, currently underway.",
    deliverables: [
      { title: "90-Day Strategy", desc: "A phased plan for digital presence and promotion." },
    ],
    role: ["Digital Strategy"],
    services: ["Customer Acquisition", "Digital Presence"],
    technologies: [],
    liveUrl: null,
    results: "Coming soon.",
    testimonial: null,
    seoTitle: "Bokobaru Farmers MCS: Digital Growth Strategy",
    seoDescription: "A 90-day digital presence and promotion strategy for a frozen chicken business.",
    cover: "bokobaru",
  },
  {
    id: "tybatz-clothing",
    slug: "tybatz-clothing",
    title: "Tybatz Clothing",
    client: "Tybatz Clothing",
    year: "2026",
    category: "creative",
    categories: ["creative", "ecommerce"],
    industry: "Fashion",
    status: "coming-soon",
    featured: false,
    published: true,
    sortOrder: 8,
    shortDescription: "A creative and digital experience for a fashion brand.",
    description: "A creative and digital experience currently in development for the fashion brand Tybatz Clothing.",
    business: "Tybatz Clothing is a fashion brand building out its creative and digital presence.",
    challenge: "A fashion brand's digital presence lives or dies on how well it presents product and creative direction, the priority here is getting that visual language right before the site goes live.",
    approach: "Creative direction and digital presence work first, structured launch to follow.",
    solution: "In development, full case study to follow once the engagement is live.",
    deliverables: [],
    role: [],
    services: ["Creative Production"],
    technologies: [],
    liveUrl: null,
    results: "Coming soon.",
    testimonial: null,
    seoTitle: "Tybatz Clothing: Fashion & Creative",
    seoDescription: "A creative and digital experience for a fashion brand.",
    cover: "tybatz",
  },
];

/**
 * SERVICES — same principle as PROJECTS: one array, no hard-coded cards.
 * Add/remove/reorder a service by editing this list only.
 */
/**
 * SERVICES — same principle as PROJECTS: one array, no hard-coded cards.
 * Add/remove/reorder a service by editing this list only.
 *
 * `image` is optional — leave it null/omit it and the card shows a
 * generated placeholder background. Set it to a real photo (local path
 * like "images/services/growth-strategy.jpg" or a hosted URL) and the
 * card uses that instead — no other file needs to change.
 */
const SERVICES = [
  { icon: "🎯", title: "Growth Strategy", desc: "Data-driven growth plans built for your market, audience and revenue goals.", image: "images/services/growth-strategy.jpg" },
  { icon: "🔍", title: "Local SEO & GBP", desc: "Dominate Google Maps. Get found by ready-to-buy customers searching right now.", image: "images/services/local-seo-gbp.jpg" },
  { icon: "💻", title: "Website Development", desc: "Premium, mobile-first websites engineered to convert visitors into paying customers.", image: "images/services/website-development.jpg" },
  { icon: "📈", title: "Paid Advertising", desc: "Google & Meta Ads that generate qualified leads with measurable return on spend.", image: "images/services/paid-advertising.jpg" },
  { icon: "🔁", title: "CRM & Automation", desc: "Smart systems, including n8n workflows, that follow up leads and close sales, automatically.", image: "images/services/crm-automation.jpg" },
  { icon: "📱", title: "WhatsApp Marketing", desc: "Turn WhatsApp into a 24/7 revenue engine with broadcasts and conversion flows.", image: "images/services/whatsapp-marketing.jpg" },
  { icon: "📣", title: "Digital Marketing", desc: "Content, social media, email: multi-channel campaigns that build sales.", image: "images/services/digital-marketing.jpg" },
  { icon: "🧲", title: "Lead Generation", desc: "Funnels, lead magnets and capture systems that build a predictable prospect pipeline.", image: "images/services/lead-generation.jpg" },
  { icon: "✨", title: "Branding & Positioning", desc: "Build a brand identity that commands premium pricing in your market.", image: "images/services/brand-positioning.jpg" },
  { icon: "🎬", title: "AI Video Creation", desc: "AI-produced video content for ads, social and product storytelling, built fast, without a studio.", image: "images/services/ai-video-creation.jpg" },
  { icon: "✂️", title: "Video Editing", desc: "Clean, platform-ready edits that turn raw footage into content people actually finish watching.", image: "images/services/video-editing.jpg" },
  { icon: "✉️", title: "Email Marketing", desc: "Sequences and campaigns that keep a business front-of-mind and turn subscribers into customers.", image: "images/services/email-marketing.jpg" },
  { icon: "🖋️", title: "Email Design", desc: "Emails that look intentional and on-brand, not like a default template.", image: "images/services/email-design.jpg" },
  { icon: "🎨", title: "UI/UX Design", desc: "Interfaces designed around how people actually use them, not just how they look.", image: "images/services/ui-ux-design.jpg" },
];

/**
 * SAMPLES — craft-level proof for services that aren't full client
 * "systems" (email designs, AI video work). Empty until real assets are
 * supplied — nothing here is invented. Shape:
 *   { title, context, image (data URI or URL), url }         for emails
 *   { title, context, videoUrl (mp4/YouTube embed), thumb }  for AI videos
 */
const EMAIL_DESIGNS = [];
const AI_VIDEO_SAMPLES = [
  { title: "Ice Hub Elite: AI Video Ad", context: "An AI-generated advertisement created for Ice Hub Elite.", videoUrl: "videos/ice-hub-ai-ad.mp4" },
  { title: "Ice Hub Elite: Cone Ice Cream", context: "An AI-generated ice cream cone ad for Ice Hub Elite.", videoUrl: "videos/ice-hub-ai-ad-2.mp4" },
  { title: "Ice Hub Elite: Social Ad", context: "An AI-generated social ad created for Ice Hub Elite.", videoUrl: "videos/ice-hub-ai-ad-3.mp4" },
];

/**
 * UI_UX_DESIGNS — same self-service pattern. Drop an image into
 * `images/ui-ux/` and add one entry:
 *   { title, context, image: "images/ui-ux/my-design.jpg", url (optional, e.g. a Figma link) }
 */
const UI_UX_DESIGNS = [];

/**
 * N8N_AUTOMATIONS — real automation/workflow work (n8n or otherwise).
 * Drop a screenshot into `images/n8n/` and add one entry:
 *   { title, context, image: "images/n8n/my-flow.jpg", url (optional) }
 */
const N8N_AUTOMATIONS = [];

/**
 * SHOWREEL_VIDEOS — the main showreel slot. Same self-service pattern as
 * AI_VIDEO_SAMPLES: drop an .mp4 into a `videos/` folder next to index.html
 * and add one entry here — no other file needs to change.
 *   { title, context, videoUrl }
 */
const SHOWREEL_VIDEOS = [
  { title: "Mr Ahmed Growth Solutions: Showreel", context: "Brand & systems showreel.", videoUrl: "videos/showreel-1.mp4" },
];

/**
 * RESUME_PDF_URL — same self-service pattern. Replace the file at this
 * relative path (drop a new resume.pdf into the root folder, same name)
 * to update the résumé sitewide — no other file needs to change.
 */
const RESUME_PDF_URL = "resume.pdf";

/**
 * CERTIFICATES — same pattern as EMAIL_DESIGNS/AI_VIDEO_SAMPLES. Drop an
 * image or PDF into a `certificates/` folder and add one entry:
 *   { title, issuer, date, image: "certificates/my-cert.jpg", url }
 */
const CERTIFICATES = [];

/**
 * SOCIALS — same principle as everything else: one array, no hard-coded
 * buttons. Used on the README hero, the footer, and contact.sh.
 */
const SOCIALS = [
  { id: "whatsapp", label: "WhatsApp", code: "WA", href: "https://wa.me/2348038622085", handle: "+234 803 862 2085" },
  { id: "email", label: "Email", code: "✉", href: "mailto:mrahmedgrowthsolutions@gmail.com", handle: "mrahmedgrowthsolutions@gmail.com" },
  { id: "github", label: "GitHub", code: "GH", href: "https://github.com/IamAhmta", handle: "@IamAhmta" },
  { id: "linkedin", label: "LinkedIn", code: "in", href: "https://www.linkedin.com/in/mrahmedgrowthsolutions", handle: "/in/mrahmedgrowthsolutions" },
  { id: "facebook", label: "Facebook", code: "f", href: "https://web.facebook.com/MrAhmedGrowthSolutions/", handle: "/MrAhmedGrowthSolutions" },
  { id: "instagram", label: "Instagram", code: "IG", href: "https://www.instagram.com/mrahmedgrowthsolutions", handle: "@mrahmedgrowthsolutions" },
  { id: "tiktok", label: "TikTok", code: "TT", href: "https://www.tiktok.com/@mrahmedgrowthsolutions", handle: "@mrahmedgrowthsolutions" },
  { id: "x", label: "X", code: "X", href: "https://x.com/iamahmta", handle: "@iamahmta" },
];

// Sort by sortOrder by default — the owner can reorder projects by editing
// this single field, with no layout changes required.
PROJECTS.sort((a, b) => a.sortOrder - b.sortOrder);

function getPublishedProjects() {
  return PROJECTS.filter((p) => p.published);
}
function getFeaturedProjects() {
  return getPublishedProjects().filter((p) => p.featured);
}
function getShippingProjects() {
  return getPublishedProjects()
    .filter((p) => p.status === "in-progress" || p.status === "coming-soon")
    .slice(0, 4);
}
function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug && p.published);
}
function getNextProject(currentSlug) {
  const list = getPublishedProjects();
  const idx = list.findIndex((p) => p.slug === currentSlug);
  return list[(idx + 1) % list.length];
}
