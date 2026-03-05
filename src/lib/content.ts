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
    slug: "bibleless-run-2026",
    title: "Founder Migosi & Governor Wavinya Ndeti Lead Machakos BTL Run",
    excerpt: "A vibrant morning at Machakos High School as the Cornerstone community runs to support Bible translation and literacy.",
    content: "The Machakos BTL Run and Walk for the Bibleless saw a powerful show of unity and purpose. Our Founder, Dr. Julius Migos Ogamba, was joined by Machakos Governor, H.E. Wavinya Ndeti, at Machakos High School to champion the cause of indigenous language literacy. The event raised crucial funds to support BTL’s ongoing work in completing Bible translations for over twenty Kenyan communities, ensuring that the Word is accessible to all in their heart languages.",
    date: "January 15, 2026",
    category: "Humanitarian",
    tags: ["community", "run", "literacy"],
    image: "/images/bibleless-run-participants.jpeg",
    author: "Events Team",
    views: 1240,
    comments: 15,
  },
  {
    slug: "graduation-ceremony-2026",
    title: "Founder Migosi & President Ruto Champion Higher Education Excellence",
    excerpt: "A landmark day as H.E. President William Ruto and Cornerstone Founder Dr. Julius Migos Ogamba lead the installation of new university leadership.",
    content: "The Cornerstone Foundation's commitment to academic excellence and visionary governance was showcased on a national stage. Our Founder, Dr. Julius Migos Ogamba (Cabinet Secretary for Education), accompanied H.E. President William Ruto for the historic installation of the Co-operative University’s second Chancellor. This milestone in higher education governance mirrors the Foundation’s own mission: ensuring that institutions of learning are guided by visionary leaders committed to transformation and academic brilliance.",
    date: "February 2, 2026",
    category: "Education",
    tags: ["graduation", "leadership", "education"],
    image: "/images/president-ruto-founder-migosi-graduation.jpeg",
    author: "Foundation Press",
    views: 3450,
    comments: 42,
  },
  {
    slug: "founder-community-engagement",
    title: "Founder Migosi Engages with Local Community",
    excerpt: "Julius Migos Ogamba spends the day in the field, listening to community needs and planning future interventions.",
    content: "Integrity and local partnership are at the heart of the Cornerstone Foundation. Founder Julius Migos Ogamba recently held an extensive community engagement session to directly hear the challenges and aspirations of the families we serve. These field visits are crucial for ensuring our programs remain evidence-driven and community-prioritized, fostering a culture of mutual respect and accountable impact.",
    date: "February 28, 2026",
    category: "Relief",
    tags: ["founder", "community", "leadership"],
    image: "/images/founder-migosi-event.jpeg",
    author: "Ops Team",
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
    image: "/images/team/founder.jpeg",
    bio: "Steward of the foundation's strategic direction and institutional values, ensuring alignment with the core mission of serving the most vulnerable in society.",
  },
  {
    slug: "job-bogonko-mongaare",
    name: "Job Bogonko Monga'are",
    position: "Trustee",
    image: "/images/team/placeholder.png",
    bio: "Provides governance oversight and ensures accountability across all foundation programmes, driving community impact with integrity and diligence.",
  },
  {
    slug: "joshua-wabwire",
    name: "Joshua Wabwire",
    position: "Trustee",
    image: "/images/team/placeholder.png",
    bio: "Brings extensive experience in community development and social governance to the board, championing evidence-based approaches to humanitarian support.",
  },
  {
    slug: "ronald-gitobu-mworia",
    name: "Ronald Gitobu Mworia",
    position: "Trustee",
    image: "/images/team/placeholder.png",
    bio: "Oversees legal compliance and institutional policy, ensuring the foundation adheres to its Declaration of Trust and statutory obligations.",
  },
];

export const managementTeam: TeamMember[] = [
  {
    slug: "chief-executive-director",
    name: "TBA",
    position: "Chief Executive Director",
    image: "/images/team/placeholder.png",
    bio: "Leads the overall strategic direction and operational excellence of the Cornerstone Foundation, ensuring mission alignment across all departments.",
  },

  {
    slug: "program-director",
    name: "TBA",
    position: "Program Director",
    image: "/images/team/placeholder.png",
    bio: "Oversees the design, delivery, and evaluation of all foundation programmes, ensuring quality and impact in education, water, and humanitarian initiatives.",
  },

  {
    slug: "logistics-manager",
    name: "TBA",
    position: "Logistics Manager",
    image: "/images/team/placeholder.png",
    bio: "Manages procurement, supply chain, and field logistics to ensure smooth and efficient delivery of resources to beneficiary communities.",
  },
  {
    slug: "communities-manager",
    name: "TBA",
    position: "Communities Manager",
    image: "/images/team/placeholder.png",
    bio: "Builds and sustains relationships with community partners, local leaders, and beneficiaries to ensure inclusive and community-driven programming.",
  },
  {
    slug: "strategy-mobilization-manager",
    name: "TBA",
    position: "Strategy & Mobilization Manager",
    image: "/images/team/placeholder.png",
    bio: "Drives strategic planning and community mobilization efforts, helping the foundation scale its reach and deepen its impact across Kenya.",
  },
  {
    slug: "funds-development-manager",
    name: "TBA",
    position: "Funds Development Manager",
    image: "/images/team/placeholder.png",
    bio: "Leads fundraising strategy, donor relations, and grant acquisition to secure sustainable funding for all foundation programmes.",
  },
];