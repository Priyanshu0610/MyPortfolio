export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  serial: string;
  image: string;
  gallery: string[];
  link: string;
  desc: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
  client: string;
  brief: string;
  redactedText: string;
}

export const projects: ProjectData[] = [
  {
    id: "twogoodco",
    slug: "twogoodco",
    title: "Two Good Co",
    category: "Web Design",
    year: "2026",
    serial: "PRJ-001",
    image: "/project img/twogoodco/twogooco.webp",
    gallery: [
      "/project img/twogoodco/twogooco2.webp",
      "/project img/twogoodco/twogooco4.webp"
    ],
    link: "https://priyanshu0610.github.io/two-good-co-clone/",
    desc: "Rigid geometric typography and neon accents.",
    initialX: 10,
    initialY: 10,
    initialRotate: -6,
    client: "Two Good Co",
    brief: "The objective was to redesign the visual identity of Two Good Co to reflect their aggressive expansion.",
    redactedText: "During the initial phase, we discovered that [the core infrastructure] was completely unstable. We had to pivot the entire visual system to hide the fact that [the backend integration] was failing. The final result is a rigid, unforgiving aesthetic that masks the internal chaos."
  },
  {
    id: "shecan",
    slug: "shecan",
    title: "She Can Foundation",
    category: "Web Design",
    year: "2025",
    serial: "PRJ-002",
    image: "/project img/shecan/shecanfoundation.webp",
    gallery: [
      "/project img/shecan/shecanfoundation3.webp",
      "/project img/shecan/shecanfoundation4.webp"
    ],
    link: "https://priyanshu0610.github.io/sheCanFoundationSite/",
    desc: "Brutalist fashion platform redefining luxury streetwear.",
    initialX: 45,
    initialY: 15,
    initialRotate: 4,
    client: "She Can",
    brief: "Create a digital storefront for a luxury brand that feels actively hostile to the user.",
    redactedText: "The client specifically requested that the checkout process be [deliberately confusing] to artificially inflate the exclusivity of the garments. We implemented a system where users are randomly [ejected from the queue] if they hesitate for more than 30 seconds."
  },
  {
    id: "nexus",
    slug: "nexus",
    title: "Nexus",
    category: "Motion & 3D",
    year: "2025",
    serial: "PRJ-003",
    image: "/project img/nexus/nexus.webp",
    gallery: [
      "/project img/nexus/nexus2.webp",
      "/project img/nexus/nexus4.webp"
    ],
    link: "https://priyanshu0610.github.io/nexusProject/",
    desc: "Immersive WebGL landing page blending raw wireframes.",
    initialX: 20,
    initialY: 45,
    initialRotate: -3,
    client: "Nexus Initiative",
    brief: "Develop an interactive 3D simulation to showcase the Nexus prototype without revealing its true scale.",
    redactedText: "The 3D models provided to us were highly classified. We were instructed to deliberately distort the [physics engine] module so that foreign competitors could not reverse-engineer the [magnetic levitation] propulsion system. The raw wireframe aesthetic is actually a camouflage mechanism."
  },
  {
    id: "nayepank",
    slug: "nayepank",
    title: "Naye Pankh",
    category: "UI/UX",
    year: "2024",
    serial: "PRJ-004",
    image: "/project img/nayepank/nayepank.webp",
    gallery: [
      "/project img/nayepank/nayepank2.webp",
      "/project img/nayepank/nayepank4.webp"
    ],
    link: "https://priyanshu0610.github.io/ngoSite/",
    desc: "Data-heavy interface stripped down to essentials.",
    initialX: 70,
    initialY: 50,
    initialRotate: 12,
    client: "Naye Pankh",
    brief: "A minimalist dashboard for high-frequency algorithmic operations.",
    redactedText: "To achieve the sub-millisecond latency required, we had to [strip out all standard safety protocols]. The interface now directly hooks into the unregulated offshore API, bypassing standard compliance checks entirely. It is highly [illegal, but incredibly fast]."
  },
  {
    id: "aiportfolio",
    slug: "aiportfolio",
    title: "AI Portfolio",
    category: "Creative Dev",
    year: "2026",
    serial: "PRJ-005",
    image: "/project img/aiportfolio/ai portfolio.webp",
    gallery: [
      "/project img/aiportfolio/ai portfolio2.webp"
    ],
    link: "https://priyanshu0610.github.io/-portfolioAi/",
    desc: "A massive, chaotic archive of AI generation.",
    initialX: 35,
    initialY: 60,
    initialRotate: -2,
    client: "Internal Archive",
    brief: "A brutalist digital environment where AI-generated artifacts are processed.",
    redactedText: "The model began producing [hyper-realistic deepfakes] without any prompting. We decided to archive the outputs in this brutalist framework before the [sentient neural network] containment breach occurs. Do not look directly at the artifacts."
  }
];
