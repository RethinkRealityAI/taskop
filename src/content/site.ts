/**
 * Single source of truth for all site copy.
 * Content restored from the archived taskopglobalconsulting.com (Wayback Machine, July 2024)
 * and lightly edited for clarity. Edit here to update the site.
 */

export const site = {
  name: "Taskop Global Consulting",
  shortName: "TaskOp",
  legalName: "TASKOP Global Consulting Inc.",
  abbreviation: "TGCI",
  tagline: "Global expertise. Tailored solutions.",
  description:
    "TaskOp Global Consulting serves health institutions, pharmaceuticals, corporations and non-profits worldwide with public health consultation, organizational support and clinical trial patient recruitment.",
  url: "https://taskopglobalconsulting.com",
  email: "hello@taskopglobalconsulting.com",
  address: {
    line1: "15 Stewart Cres",
    line2: "Thornton, ON L0L 2N0",
    country: "Canada",
  },
  foundedYear: 2020,
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export type Sector = {
  slug: string;
  title: string;
  shortTitle: string;
  intro: string;
  bullets?: string[];
  services: string[];
  image: { src: string; alt: string };
};

export const sectors: Sector[] = [
  {
    slug: "pharmaceuticals",
    title: "Pharmaceuticals & Health Institutions",
    shortTitle: "Pharma & Health",
    intro:
      "When it comes to pharma and clinical trial initiatives, our role is to help you navigate an ambiguous, fast-changing arena and bring your products to market successfully.",
    bullets: [
      "Navigate a global, ambiguous and fast-changing competitive arena to access relevant, actionable knowledge quickly and efficiently.",
      "Navigate crucial regulatory, product safety and market access landscapes to successfully bring your products to market.",
    ],
    services: [
      "Patient recruitment, engagement and retention in clinical trials",
      "Patient engagement in research",
      "Research site engagement",
      "Protocol feasibility",
      "Research ethics",
      "Meeting coordination",
    ],
    image: {
      src: "/images/sector-pharma.jpg",
      alt: "Clinical research coordinator reviewing a study with a patient participant",
    },
  },
  {
    slug: "non-profit",
    title: "Non-Profit Organizations",
    shortTitle: "Non-Profits",
    intro:
      "We know that running a non-profit organization comes with many challenges. To ensure your optimal efficiency, we offer the services below.",
    services: [
      "Non-profit and charitable status registration",
      "Start-up and foundational documents development",
      "Strategic plan development",
      "Capacity building plan",
      "Leadership, senior management, volunteer and board training",
      "Patient-facing material content development",
      "Management, good governance and organizational growth",
      "Focus group moderation",
      "Social listening and storytelling",
      "Patient engagement in clinical trials",
      "Meeting, conference and congress planning and coordination",
      "Program development strategy",
      "Patient engagement strategy",
      "Policy development",
    ],
    image: {
      src: "/images/sector-nonprofit.jpg",
      alt: "Board members of a community health charity in a planning workshop",
    },
  },
  {
    slug: "business",
    title: "Business Corporations",
    shortTitle: "Corporations",
    intro:
      "Whether you are self-employed or part of a large corporation, we have your back. Here are some of the ways we can support your business.",
    services: [
      "Corporation set-up and growth consultation",
      "Business registration, plans, strategies, trademarks and policies",
      "Website development and support",
      "Guidance to achieving the competitive edge",
      "Leadership training",
    ],
    image: {
      src: "/images/sector-business.jpg",
      alt: "Executives and a consultant reviewing growth plans in a boardroom",
    },
  },
];

export const home = {
  hero: {
    eyebrow: "Global consulting for health, non-profit and business",
    headline: "Expertise that moves your mission forward",
    subhead:
      "TaskOp serves clients from around the world. By blending sector leadership with a global perspective, we tackle your requests with tenacity and prowess, guiding you through customized solutions specific to your needs.",
    primaryCta: { label: "Start a conversation", href: "/contact" },
    secondaryCta: { label: "Explore services", href: "/services" },
  },
  intro: {
    eyebrow: "Welcome to TaskOp",
    headline: "Results, dedication and commitment to excellent service. Every single time.",
    body: "Whether seeking public health consultation, organizational support or recruiting patients for clinical trial purposes, our diverse clientele shares one common trait: they expect results, dedication and commitment to excellent service, and we deliver every single time. TaskOp has carved a niche space for itself, which is why people are turning to us and choose to stay with us.",
  },
  stats: [
    { value: 2020, suffix: "", label: "Founded in Ontario, Canada", format: "year" },
    { value: 3, suffix: "", label: "Sectors served", format: "number" },
    { value: 25, suffix: "+", label: "Specialized services", format: "number" },
    { value: 100, suffix: "%", label: "Client-driven, result-focused", format: "number" },
  ],
  process: [
    {
      step: "01",
      title: "Listen",
      body: "We embrace you as the expert in your field. We start by understanding your goals, constraints and the outcomes that matter.",
    },
    {
      step: "02",
      title: "Tailor",
      body: "Fixed project or ongoing program, we shape our services to your unique scope rather than forcing you into a template.",
    },
    {
      step: "03",
      title: "Deliver",
      body: "Work independently or integrate our team with yours. Either way, we stay accessible, hands-on and accountable to results.",
    },
  ],
  values: [
    {
      title: "Efficiency",
      body: "A strong pool of expertise, deployed quickly and without waste, so you get to answers faster.",
    },
    {
      title: "Innovation",
      body: "Fresh perspectives and digital-first thinking applied to complex health, policy and organizational challenges.",
    },
    {
      title: "Client-driven",
      body: "Your priorities set the agenda. We work alongside your team as advisers and hands-on contractors.",
    },
    {
      title: "Result-focused",
      body: "Every engagement is measured by outcomes delivered, not hours logged.",
    },
  ],
};

export const about = {
  hero: {
    eyebrow: "About TaskOp",
    headline: "A niche consultancy with a global perspective",
    body: "TASKOP Global Consulting Inc. serves health institutions, pharmaceuticals, corporations and non-profits. Day by day, our team delivers solutions that address our clients' challenges and needs, and we proudly assert that we have the unique expert knowledge to fulfill their resource gaps and project needs.",
  },
  mission: {
    eyebrow: "Our mission",
    headline:
      "Utilize a strong pool of expertise to provide our clientele with successful solutions.",
    body: "TASKOP Global Consulting Inc.'s mission is built on the foundational values of efficiency and innovation. At TGCI, we are client-driven and result-focused, embracing our clients as experts in their fields.",
  },
  approach: {
    eyebrow: "How we work",
    headline: "It's your call",
    body: "We can work independently or integrate our team with yours to find the very best solutions to unwind your most complex issues. Whether it is your highly specialized or more diverse tasks, our services are shaped to meet your needs.",
    points: [
      "Advisers and hands-on contractors, easily accessible every step of the way",
      "Support for fixed, project-based engagements or ongoing programs",
      "Services tailored to your unique project or program scope",
    ],
  },
};

export const servicesPage = {
  hero: {
    eyebrow: "Services",
    headline: "Bridge the knowledge gap and unlock unique perspectives",
    body: "Whatever the aspiration is, we understand that getting started on the journey can be overwhelming. That's why TaskOp is one of the most cost-effective and client-friendly ways to bridge the knowledge gap and unlock unique perspectives that ensure success for our clients.",
  },
  offerSummary: [
    "Organizational governance and leadership development",
    "Capacity building",
    "Policy drafting",
    "Strategic and work plan drafting",
    "Digital health solutions",
    "Stakeholder and patient engagement",
    "Patient and HCP education",
    "Employee and volunteer training workshops",
    "Charitable status registration",
  ],
  note: "If you require a service other than those listed, please feel free to contact us.",
};

export type Client = {
  name: string;
  shortName: string;
  url: string;
  logo: { src: string; width: number; height: number };
  /** Approximate rendered logo height in the logo strip, to balance visual weight across marks. */
  logoHeight: number;
  /** Card header wash, drawn from the client's own brand and kept faint so the logo stays dominant. */
  tint: string;
  sector: string;
  location: string;
  description: string;
  /** What TaskOp does / did for them. Keep to one sentence. */
  engagement: string;
};

export const clients: Client[] = [
  {
    name: "City of Toronto",
    shortName: "City of Toronto",
    url: "https://www.toronto.ca/",
    logo: { src: "/images/clients/city-of-toronto.png", width: 1200, height: 368 },
    logoHeight: 34,
    tint: "#1b1f5e",
    sector: "Public sector / municipal government",
    location: "Toronto, Ontario, Canada",
    description:
      "The municipal government of Canada's largest city, delivering public health, community and social services to nearly three million residents across dozens of divisions and agencies.",
    engagement: "Community engagement, stakeholder consultation and program support.",
  },
  {
    name: "Sickle Cell Awareness Group of Ontario",
    shortName: "SCAGO",
    url: "https://www.sicklecellanemia.ca/",
    logo: { src: "/images/clients/scago.png", width: 531, height: 99 },
    logoHeight: 30,
    tint: "#c0392b",
    sector: "Non-profit / patient organization",
    location: "Ontario, Canada",
    description:
      "A leading charitable patient organization providing evidence-based support, education and advocacy to families living with sickle cell disease across Ontario, with more than 20 years of advocacy for 2,500+ members.",
    engagement: "Organizational strategy, patient engagement, digital health tools and capacity building.",
  },
  {
    name: "European Sickle Cell Federation",
    shortName: "ESCF",
    url: "https://www.escfederation.eu/",
    logo: { src: "/images/clients/escf.png", width: 371, height: 114 },
    logoHeight: 38,
    tint: "#3730a3",
    sector: "Non-profit / umbrella federation",
    location: "Brussels, Belgium",
    description:
      "A European umbrella network of sickle cell disease patient organisations speaking with one united voice, representing an estimated 52,000 people living with sickle cell disease across the EU and supporting its national member organisations.",
    engagement: "Governance, policy and strategic-plan drafting, and congress coordination.",
  },
  {
    name: "Global Action Network for Sickle Cell and Other Inherited Blood Disorders",
    shortName: "GANSID",
    url: "https://inheritedblooddisorders.world/",
    logo: { src: "/images/clients/gansid.png", width: 384, height: 94 },
    logoHeight: 40,
    tint: "#d1495b",
    sector: "Non-profit / global health network",
    location: "Global (Africa and Southeast Asia regions)",
    description:
      "A global alliance advancing advocacy, capacity building, clinician mentorship and education for sickle cell disease, thalassemia, hemophilia and other inherited blood disorders, working with the WHO and patient organizations worldwide.",
    engagement: "Program development strategy, stakeholder engagement and clinician training platforms.",
  },
  {
    name: "Sudanese Community Association of Ontario",
    shortName: "SCAON",
    url: "https://www.scaon.org/",
    logo: { src: "/images/clients/scaon.png", width: 406, height: 406 },
    logoHeight: 56,
    tint: "#17795e",
    sector: "Non-profit / community organization",
    location: "Toronto, Ontario, Canada",
    description:
      "A not-for-profit serving Sudanese Canadians since 1989, providing integration and settlement services and access to mainstream services so members can fully contribute to Canadian society.",
    engagement: "Governance, capacity building and community program development.",
  },
  {
    name: "Shea Allnaturals",
    shortName: "Shea Allnaturals",
    url: "https://www.allnaturalscosmetics.com/",
    logo: { src: "/images/clients/shea-allnaturals.png", width: 1000, height: 97 },
    logoHeight: 18,
    tint: "#b07219",
    sector: "Business / consumer products",
    location: "Barrie, Ontario, Canada",
    description:
      "Hand-crafted botanical skincare rooted in West-African tradition: shea butter, argan oil, black soap and cold-pressed oils, made in Barrie, Ontario since 2002 and sold direct and wholesale.",
    engagement: "Business growth consultation, website development and support.",
  },
];

export const clientsPage = {
  hero: {
    eyebrow: "Our clients",
    headline: "Trusted by health institutions, pharmaceuticals, corporations and non-profits",
    body: "Day by day, our team delivers solutions that address our clients' challenges and needs. We proudly assert that we have the unique expert knowledge to fulfill their resource gaps and project needs.",
  },
  help: {
    headline: "We are here to help",
    body: "TGCI's consultants are advisers and hands-on contractors that are easily accessible to provide innovative solutions every step of the way. Whether you require support for a fixed, project-based engagement or an ongoing program, TGCI can tailor our services to your unique project or program scope.",
  },
  testimonials: [
    {
      quote:
        "They expect results, dedication and commitment to excellent service, and we deliver every single time.",
      author: "The TaskOp promise",
      role: "To every client",
    },
  ],
};

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  bio?: string;
  /** Public LinkedIn profile URL. */
  linkedin?: string;
};

// Photos: add `image: "/images/team/<name>.jpg"` to a member (and drop the file into
// public/images/team/) and the team page will render the photo instead of the initials avatar.
export const team: TeamMember[] = [
  {
    name: "Dapo Ajisafe",
    role: "Lead Tech Consultant & Developer",
    initials: "DA",
    image: "/images/team/dapo.jpg",
    linkedin: "https://www.linkedin.com/in/dapoajisafe/",
  },
  {
    name: "Samuel Tunji-Ajayi",
    role: "Director of Operations",
    initials: "ST",
    image: "/images/team/samuel.jpg",
    linkedin: "https://www.linkedin.com/in/samuel-tunji-ajayi/",
  },
  {
    name: "Pamela Tunji-Ajayi",
    role: "Critical Research & Operations",
    initials: "PT",
    image: "/images/team/pamela.jpg",
  },
];

export const faqs = [
  {
    q: "Who does TaskOp work with?",
    a: "We serve health institutions, pharmaceutical companies, business corporations and non-profit organizations, from self-employed professionals to large enterprises, in Canada and around the world.",
  },
  {
    q: "Can you support a one-off project as well as an ongoing program?",
    a: "Yes. Whether you require support for a fixed, project-based engagement or an ongoing program, we tailor our services to your unique scope.",
  },
  {
    q: "Do you work independently or with our internal team?",
    a: "It's your call. We can work independently or integrate our team with yours to find the very best solutions to your most complex issues.",
  },
  {
    q: "What if I need a service that isn't listed?",
    a: "Reach out. Our listed services are a starting point, and we regularly scope custom engagements around a client's specific needs.",
  },
  {
    q: "Where are you based?",
    a: "We are headquartered in Thornton, Ontario, Canada, and serve clients globally.",
  },
];

export const cta = {
  headline: "Let's unwind your most complex challenge",
  body: "Tell us about your project or program. We'll come back with a clear, tailored plan for how TaskOp can help.",
  primary: { label: "Contact us", href: "/contact" },
  secondary: { label: "Email hello@taskopglobalconsulting.com", href: "mailto:hello@taskopglobalconsulting.com" },
};
