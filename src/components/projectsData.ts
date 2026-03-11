export interface ProjectData {
  id: string;
  year: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  highlights: string[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: '01',
    year: '2026',
    status: 'ACTIVE',
    title: 'Pacifica Farcaster Trading Mini-App',
    description: 'Built a Farcaster-native perpetual trading mini-app using the Pacifica API,featuring Solana wallet authentication, automated limit orders, and secure backend order execution.',
    longDescription: 'Built a Farcaster mini-app that lets users trade Pacifica perpetual markets directly from Warpcast. Implemented wallet authentication, account linking, order execution flows, automated limit-order monitoring, and secure agent-wallet signing for backend trade execution.',
    tags: [
      "Next.js",
      "React",
      "Farcaster Mini-App SDK",
      "Solana",
      "Prisma",
      "Postgres",
      "Tailwind"
    ],
    github: 'https://github.com/Elijah-hash7/Trading_Pacifica',
    link: 'https://farcaster.xyz/miniapps/njjonSb3ft0s/pacificast',
    highlights: [
      'Developed a Farcaster mini-app trading interface optimized for mobile users',
      'Integrated Warpcast, Phantom, and Solflare wallet authentication',
      'Built backend order infrastructure for market and limit orders',
      'Implemented automated limit-order execution with cron monitoring',
      'Designed secure agent-wallet signing for server-side trade execution',
      'Added social trading features including leaderboards and PnL sharing'
    ],
  },

  {
    id: "02",
    status : 'COMPLETED',
    year: "2024",
    title: "Library Management System (JavaFX)",
    description:
      "Desktop library management system built with JavaFX for managing books, users, and borrowing workflows.",

    longDescription:
      "Developed a JavaFX desktop application that manages book records, borrowing activity, and waitlists. The system allows librarians to add and manage books, track availability, and handle borrowing requests through a structured interface connected to a relational database.",

    tags: [
      "Java",
      "JavaFX",
      "MySQL",
      "Desktop Application",
      "Database Systems"
    ],
    github : 'https://github.com/Elijah-hash7/Java/tree/main/Library',
    highlights: [
      "Built multi-screen JavaFX interface for managing books and users",
      "Connected application to a relational database for persistent records",
      "Implemented borrowing logic and book availability tracking",
      "Added waitlist handling for books that are currently unavailable",
      "Used JDBC with prepared statements for database operations"
    ]
  },

  {
    id: '03',
    year: '2025',
    status: 'COMPLETED',
    title: 'Jecofx Academy Website',
    description:
      "' academy website built to present trading programs, improve student onboarding, and create a clean conversion-focused landing experience.",

    longDescription:
      'Designed and built the official website for Jecofx Academy with a strong focus on clarity, structured content, and conversion. The site presents training programs, learning paths, and academy credibility through a clean layout, responsive sections, and clear calls-to-action to guide visitors from discovery to enrollment.',

    tags: [
      'Astro',
      'React',
      'Tailwind CSS',
      'Responsive Design',
      'UI/UX'
    ],
    github: 'https://github.com/Elijah-hash7/JecoFx-Academy',
    link: 'https://jecofx.com',
    highlights: [
      'Designed structured landing sections for academy programs and student onboarding',
      'Built responsive layouts optimized for mobile and desktop users',
      'Created reusable UI components for consistency across the site',
      'Improved content hierarchy to make the academy offerings easy to understand',
      'Optimized images and assets for faster page performance'
    ]
  },

  {
    id: '04',
    year: '2025',
    status: 'COMPLETED',
    title: 'SMART FORM BUILDER',
    description: 'Backend service for a dynamic form system that connects with Airtable to store and manage responses.',
    longDescription: 'Supports conditional logic so form questions change based on user input. Also includes OAuth authentication and API endpoints for handling form submissions and data retrieval.',
    tags: ['NODE.JS', 'EXPRESS', 'AIRTABLE API', 'OAUTH'],
    github: 'https://github.com/Elijah-hash7/FormApp',
    link: 'https://smart-formapp.vercel.app/',
    highlights: [
      'Built dynamic forms with conditional logic',
      'OAuth authentication for secure access',
      'Integrated Airtable API for storing responses',
      'REST endpoints for form submission and data retrieval',
    ],
  },

  {
    id: '05',
    status: 'ACTIVE',
    year: '2026',
    title: 'Finlite Financial Platform (Backend Support)',
    description:
      'Contributing backend support and system improvements for a financial management platform focused on tracking transactions and user financial activity.',
  
    longDescription:
      'Working as a supporting backend developer on Finlite, contributing to server-side logic and platform improvements. My role focused on assisting with backend functionality, improving system reliability, and supporting features that manage financial data and user interactions.',
  
    tags: [
      'Backend Development',
      'APIs',
      'Financial Systems',
    ],
    github : 'https://github.com/finlite/FINLITE-',
    highlights: [
      'Contributed to backend logic supporting financial tracking features',
      'Assisted with API functionality and server-side improvements',
      'Worked collaboratively with the main project developer',
      'Helped maintain backend reliability for platform features'
    ]
  },

  {
    id: '06',
    status: 'ACTIVE',
    year: "2026",
    title: 'Edu AI Platform (Base Integration)',
    description:
      'Collaborating on integrating Base blockchain features into an AI-powered education platform.',
  
    longDescription:
      'Collaborating with the project owner to explore Base blockchain integration within an AI-powered learning platform. My focus is on implementing onchain components and helping design how blockchain functionality can support educational tools and digital credentials.',
    tags: [
      'Blockchain',
      'Base',
      'Nextjs',
      'Typescript',
      'Web3',
      'Education Technology',
      'Collaboration'
    ],
  
    highlights: [
      'Working on Base blockchain integration for the platform',
      'Exploring onchain credential and verification concepts',
      'Contributing to architecture decisions for Web3 functionality',
      'Collaborating with the project owner on blockchain features'
    ]
  },

  {
    id: '07',
    year: '2026',
    status: 'COMPLETED',
    title: 'Backend Dev Career Playbook',
    description: 'Built a comprehensive, research-backed career guide for backend developers — covering job boards, Discord communities, open source, hackathons, freelance platforms, and networking strategy across Web2 and Web3.',
    longDescription: 'Researched and documented a full career playbook for backend-focused developers trying to break into the global job market. Covers 50+ verified platforms across 10 channels including Web2 and Web3 job boards, Discord communities, open source contribution targets, global hackathons, freelance platforms, writing and visibility strategy, Twitter networking, and engineer-to-engineer outreach. Each section includes what the platform gives you, how to approach it correctly, and explicit do/don\'t guidance based on what actually works. Built as a single-page interactive HTML reference designed for developers to use as an ongoing resource.',
    tags: [
      'Career Strategy',
      'Web2',
      'Web3',
      'Node.js',
      'TypeScript',
      'Backend Development',
      'Open Source',
      'Technical Writing',
      'HTML',
      'CSS',
    ],
    link: 'https://my-play-book-six.vercel.app/',
    highlights: [
      'Researched and verified 50+ platforms across Web2 and Web3 ecosystems',
      'Documented 15+ Discord communities with specific value propositions for backend devs',
      'Mapped 8 open source repositories ideal for Node.js and TypeScript contributors',
      'Covered 10 global hackathons including ETHGlobal, DoraHacks, and ETHDenver',
      'Included engineer-to-engineer networking frameworks and outreach templates',
      'Built interactive single-page HTML reference with navigation, do/don\'t breakdowns, and platform cards',
    ],
  }




];
