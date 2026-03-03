export const missionPillars = [
  {
    title: "Relief for vulnerable groups",
    description: "Support destitute families, aged persons, widows, and orphans with dignified, practical interventions.",
  },
  {
    title: "Education scholarships & bursaries",
    description: "Unlock long-term opportunity by supporting school fees, supplies, and mentorship pathways.",
  },
  {
    title: "Clean water & sanitation",
    description: "Improve community health outcomes through safe water projects and sanitation awareness programs.",
  },
];

export const categories = ["All", "Education", "Water", "Relief"];
export const allTags = ["bursary", "rural", "water", "youth", "education"];

export const updates = [
  {
    slug: "bursary-distribution-2026",
    title: "2026 Bursary Distribution Reaches 120 Students",
    excerpt: "Cornerstone Foundation hands out full school bursaries to 120 students from underserved households across the region.",
    content: "This year's bursary distribution marks a significant milestone for the Cornerstone Foundation. Over 120 students from destitute, widowed, and orphaned households received full bursaries covering school fees, uniforms, textbooks, and mentorship support. Each recipient was carefully selected through a community-based vetting process to ensure the most vulnerable are prioritised. Education is the foundation's greatest tool for lasting change.",
    date: "January 15, 2026",
    category: "Education",
    tags: ["bursary", "youth", "education"],
    image: "/images/foundation_community_impact.png",
    author: "Foundation Board",
    views: 1240,
    comments: 15,
  },
  {
    slug: "scholarship-intake-2026",
    title: "Scholarship Applications Open for 2026",
    excerpt: "Applications are now open for bright students from underserved households across Kenya.",
    content: "Education remains the greatest equalizer. We are proud to announce the opening of our 2026 scholarship intake. Aimed at exceptionally bright students from vulnerable backgrounds, these scholarships cover full tuition, uniforms, and a structured mentorship programme through to completion of high school. No child should be denied a future simply because of circumstance. Eligible candidates are encouraged to apply through their school's administration office before the deadline.",
    date: "February 2, 2026",
    category: "Education",
    tags: ["bursary", "youth", "education"],
    image: "/images/school_building_premium.png",
    author: "Foundation Board",
    views: 3450,
    comments: 42,
  },
  {
    slug: "water-access-expansion",
    title: "Clean Water Project Keeps Girls in School",
    excerpt: "Three new boreholes free hundreds of children from daily water walks — giving them time to learn.",
    content: "The lack of clean water has long kept children, especially girls, out of school in rural Kenya. After completion of three new solar-powered boreholes serving over 2,500 community members, school attendance among girls in the affected villages has risen sharply. With water now accessible minutes from home, families no longer depend on children to walk miles each day. This infrastructural investment is, at its heart, an investment in education.",
    date: "February 28, 2026",
    category: "Education",
    tags: ["rural", "water", "education"],
    image: "/images/borehole_clean_water.png",
    author: "Tech & Ops Team",
    views: 890,
    comments: 8,
  }
];

export type TeamMember = {
  slug: string;
  name: string;
  position: string;
  image: string;
  bio: string;
};

export const boardOfTrustees: TeamMember[] = [
  {
    slug: "julius-migos-ogamba",
    name: "Julius Migos Ogamba",
    position: "Founder",
    image: "/images/team_placeholder.png",
    bio: "Steward of the foundation's strategic direction and institutional values, ensuring alignment with the core mission of serving the most vulnerable in society.",
  },
  {
    slug: "job-bogonko-mongaare",
    name: "Job Bogonko Monga'are",
    position: "Trustee",
    image: "/images/team_placeholder.png",
    bio: "Provides governance oversight and ensures accountability across all foundation programmes, driving community impact with integrity and diligence.",
  },
  {
    slug: "joshua-wabwire",
    name: "Joshua Wabwire",
    position: "Trustee",
    image: "/images/team_placeholder.png",
    bio: "Brings extensive experience in community development and social governance to the board, championing evidence-based approaches to humanitarian support.",
  },
  {
    slug: "ronald-gitobu-mworia",
    name: "Ronald Gitobu Mworia",
    position: "Trustee",
    image: "/images/team_placeholder.png",
    bio: "Oversees legal compliance and institutional policy, ensuring the foundation adheres to its Declaration of Trust and statutory obligations.",
  },
];

export const managementTeam: TeamMember[] = [
  {
    slug: "chief-executive-director",
    name: "TBA",
    position: "Chief Executive Director",
    image: "/images/team_placeholder.png",
    bio: "Leads the overall strategic direction and operational excellence of the Cornerstone Foundation, ensuring mission alignment across all departments.",
  },

  {
    slug: "program-director",
    name: "TBA",
    position: "Program Director",
    image: "/images/team_placeholder.png",
    bio: "Oversees the design, delivery, and evaluation of all foundation programmes, ensuring quality and impact in education, water, and humanitarian initiatives.",
  },

  {
    slug: "logistics-manager",
    name: "TBA",
    position: "Logistics Manager",
    image: "/images/team_placeholder.png",
    bio: "Manages procurement, supply chain, and field logistics to ensure smooth and efficient delivery of resources to beneficiary communities.",
  },
  {
    slug: "communities-manager",
    name: "TBA",
    position: "Communities Manager",
    image: "/images/team_placeholder.png",
    bio: "Builds and sustains relationships with community partners, local leaders, and beneficiaries to ensure inclusive and community-driven programming.",
  },
  {
    slug: "strategy-mobilization-manager",
    name: "TBA",
    position: "Strategy & Mobilization Manager",
    image: "/images/team_placeholder.png",
    bio: "Drives strategic planning and community mobilization efforts, helping the foundation scale its reach and deepen its impact across Kenya.",
  },
  {
    slug: "funds-development-manager",
    name: "TBA",
    position: "Funds Development Manager",
    image: "/images/team_placeholder.png",
    bio: "Leads fundraising strategy, donor relations, and grant acquisition to secure sustainable funding for all foundation programmes.",
  },
];

