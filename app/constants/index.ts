import { Github, Linkedin, Mail } from "lucide-react";

export const PROFILE = {
    name: "Kabeer Ahmad",
    handle: "Tech With Kabeer",
    title: "Software Engineer",
    focus: "Full-Stack & Applied AI",
    specialties: ["LLM Integration", "AI Agents", "Automation"],
    summary:
        "Software engineer specializing in full-stack development and applied AI. I turn LLMs, open-source models and automation into production-ready products.",
    location: "Lahore, Pakistan",
    timezone: "Asia/Karachi",
    email: "kabeeahmad.ka@gmail.com",
    altEmail: "tech.w.kabeer@gmail.com",
    whatsapp: "+923214480668",
    site: "https://tech-with-kabeer.vercel.app",
    cv: "/Kabeer Ahmad CV.pdf",
    languages: [
        { name: "English", level: "Advanced" },
        { name: "Urdu", level: "Native" },
    ],
};

export const SOCIAL_LINKS = [
    { name: "GitHub", icon: Github, url: "https://github.com/Kabeer-Ahmad", handle: "@Kabeer-Ahmad" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/kabeer-ahmad/", handle: "in/kabeer-ahmad" },
    { name: "Email", icon: Mail, url: `mailto:${PROFILE.email}`, handle: PROFILE.email },
];

export type Experience = {
    role: string;
    company: string;
    location: string;
    type: "Full-time" | "Founder" | "Internship";
    period: string;
    description: string[];
    technologies: string[];
};

export const EXPERIENCES: Experience[] = [
    {
        role: "Associate Software Engineer",
        company: "Innovage.io",
        location: "Lahore",
        type: "Full-time",
        period: "Jan 2026 – Nov 2026",
        description: [
            "Built React Native mobile apps for Innovage's own product line, adding on-device AI with Apple Intelligence and LLM APIs for features such as smart suggestions and content generation.",
            "Rebuilt a client's legacy .NET portals as modern React and Node.js applications, improving speed, usability and maintainability.",
            "Designed business automations with n8n and Python — including AI voice-calling agents — that took repetitive work off the team's hands.",
            "Worked across the full stack from UI to APIs and databases, shipping features from idea to production.",
        ],
        technologies: ["React Native", "Apple Intelligence", "LLM APIs", "React", "Node.js", ".NET", "n8n", "Python", "AI Voice Agents"],
    },
    {
        role: "Software Engineer & Founding Member",
        company: "Stylique Technologies",
        location: "Lahore",
        type: "Founder",
        period: "Mar 2025 – Jan 2026",
        description: [
            "Developed a virtual try-on pipeline using custom diffusion models, DensePose and SCHP to deliver photorealistic inference for B2B clients.",
            "Selected for the LUMS LCE Idea Launch incubation program and subsequently incubated at the National Incubation Center (NIC).",
            "Led end-to-end development from R&D to production, optimizing heavy GPU workloads and building a scalable Shopify integration.",
        ],
        technologies: ["PyTorch", "Stable Diffusion", "DensePose", "SCHP", "Hugging Face", "Next.js", "Shopify", "GPU Optimization"],
    },
    {
        role: "Co-Founder & Software Architect",
        company: "Nexium",
        location: "Lahore",
        type: "Founder",
        period: "Jan 2025 – Dec 2025",
        description: [
            "Led AI-driven product development and cloud architecture for next-generation SaaS platforms.",
            "Defined technical strategy and delivery for client and in-house products, from discovery to deployment.",
        ],
        technologies: ["Next.js", "Node.js", "Python", "AWS", "Google Cloud", "Docker", "Supabase", "AI/ML"],
    },
    {
        role: "Software Engineer Intern",
        company: "PureLogics",
        location: "Lahore",
        type: "Internship",
        period: "Apr 2025 – Jul 2025",
        description: [
            "Wrote clean and reusable Python code, and participated in agile sprints, code reviews and debugging sessions to optimize system performance.",
            "Worked closely with frontend teams to integrate APIs and ensure smooth, secure user interactions.",
        ],
        technologies: ["Python", "Django", "Flask", "REST APIs", "Agile"],
    },
    {
        role: "Cyber Security Engineer Intern",
        company: "YoungDev",
        location: "Remote",
        type: "Internship",
        period: "Sep 2024 – Oct 2024",
        description: [
            "Conducted security assessments using Nmap, OpenVAS and Metasploit, identifying and mitigating security threats.",
            "Deployed honeypots, analyzed network traffic with Wireshark, and implemented security protocols to defend against cyber threats.",
        ],
        technologies: ["Nmap", "OpenVAS", "Metasploit", "Wireshark", "Network Security"],
    },
    {
        role: "Full Stack Development Intern",
        company: "CodeAlpha",
        location: "Lahore",
        type: "Internship",
        period: "Sep 2024 – Oct 2024",
        description: [
            "Built and optimized web applications using React.js, Next.js and Node.js, enhancing both front-end and back-end functionality.",
            "Applied JavaScript and database management skills to develop high-performance applications while collaborating with experienced professionals.",
        ],
        technologies: ["React.js", "Next.js", "Node.js", "JavaScript", "MongoDB"],
    },
    {
        role: "Software Quality Assurance Intern",
        company: "10Pearls",
        location: "Remote",
        type: "Internship",
        period: "Jun 2024 – Aug 2024",
        description: [
            "Designed, executed and managed comprehensive test cases; conducted API testing with Postman, functional testing and bug tracking to improve software reliability.",
            "Used Selenium WebDriver, Cypress and JMeter for automated testing and performance optimization.",
        ],
        technologies: ["Selenium", "Cypress", "JMeter", "Postman", "QA Automation"],
    },
    {
        role: "Unity Game Development Intern",
        company: "Mindstorm Studios",
        location: "Remote",
        type: "Internship",
        period: "Jun 2024 – Aug 2024",
        description: [
            "Developed and optimized interactive 3D games using Unity and C#, and helped design intuitive user interfaces for smooth game flow.",
        ],
        technologies: ["Unity", "C#", "3D", "Game UI"],
    },
    {
        role: "Full Stack Development Intern",
        company: "Entracloud",
        location: "Remote",
        type: "Internship",
        period: "Jun 2024 – Aug 2024",
        description: [
            "Worked on full-stack web applications using Node.js, React and MongoDB, along with REST APIs and authentication systems.",
        ],
        technologies: ["Node.js", "React", "MongoDB", "REST APIs", "Auth"],
    },
    {
        role: "Python Development Intern",
        company: "OctaNet Services",
        location: "Remote",
        type: "Internship",
        period: "May 2024 – Jul 2024",
        description: [
            "Developed automation scripts and data-processing tools in Python and optimized backend services.",
            "Built tools with Pandas that processed 100,000+ data records.",
        ],
        technologies: ["Python", "Pandas", "Automation", "Data Processing"],
    },
];

export type ProjectCategory = "AI" | "Mobile" | "Web" | "Client" | "Systems";

export type Project = {
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    category: ProjectCategory;
    featured?: boolean;
    isNew?: boolean;
    demoLink?: string;
    githubLink?: string;
};

export const PROJECTS: Project[] = [
    {
        title: "Stylique",
        subtitle: "AI Virtual Try-On Platform",
        description: "A B2B engine delivering photorealistic virtual try-on and sizing recommendations, with plugins for Shopify stores.",
        tech: ["Next.js", "Three.js", "TypeScript", "Supabase", "Python", "PyTorch", "Stable Diffusion", "Hugging Face", "Shopify", "TailwindCSS", "Radix", "Gradio"],
        category: "AI",
        featured: true,
        demoLink: "https://www.styliquetechnologies.com/",
        githubLink: "https://github.com/nexium-global/stylique-project-code",
    },
    {
        title: "FacelessFlowAI",
        subtitle: "End-to-End AI Video Generator",
        description: "A pipeline that generates full AI videos — script, visuals and voiceover — and auto-publishes them to YouTube.",
        tech: ["Next.js", "Remotion", "AWS Lambda", "S3", "Supabase", "OpenAI", "Gemini", "ElevenLabs", "Runway", "Qwen TTS", "YouTube API"],
        category: "AI",
        featured: true,
        isNew: true,
    },
    {
        title: "SniperBotAI",
        subtitle: "AI Trading System",
        description: "An automated trading system where an AI model makes the final trade call, wrapped in full risk management.",
        tech: ["Python", "MQL5", "MetaTrader 5", "LLM APIs"],
        category: "AI",
        featured: true,
        isNew: true,
    },
    {
        title: "SomnAI",
        subtitle: "Private AI Dream Journal",
        description: "Hold to speak your dream each morning — SomnAI transcribes it, writes a reflection with Apple Intelligence and surfaces recurring motifs, themes and people. Entirely on-device: no account, no server.",
        tech: ["Swift", "SwiftUI", "SwiftData", "Apple Intelligence", "Foundation Models", "Speech"],
        category: "Mobile",
        isNew: true,
        demoLink: "https://somnai-ten.vercel.app",
        githubLink: "https://github.com/Kabeer-Ahmad/Somnai",
    },
    {
        title: "Pillbook",
        subtitle: "Pill Reminder",
        description: "A medication reminder app that keeps track of your doses and nudges you when it's time to take them.",
        tech: ["Mobile", "Reminders"],
        category: "Mobile",
        isNew: true,
    },
    {
        title: "Plainly",
        subtitle: "Document Summarizer",
        description: "Turns long, dense documents into plain-language summaries you can read in a minute.",
        tech: ["Mobile", "AI Summarization"],
        category: "Mobile",
        isNew: true,
    },
    {
        title: "Physio School",
        subtitle: "Adaptive Quizzes for Physiotherapy",
        description: "Every quiz is generated fresh, difficulty follows the student's ability, missed questions return on a spaced schedule and each attempt ends with a plain-language debrief — on iOS, Android and web from one codebase.",
        tech: ["Expo", "React Native", "Next.js", "NestJS", "Firestore", "Firebase Auth", "Anthropic API", "Turborepo", "Zod"],
        category: "Mobile",
        isNew: true,
    },
    {
        title: "CoinSensei",
        subtitle: "Secure USDT Buy / Sell App",
        description: "A P2P trading app for secure and seamless USDT transactions in Pakistan across TRC20 and BEP20 networks.",
        tech: ["React Native", "Expo", "Supabase", "Python", "Hugging Face", "AWS", "TRC20", "BEP20"],
        category: "Mobile",
        demoLink: "https://www.coinsensei.co/",
        githubLink: "https://github.com/Kabeer-Ahmad/CoinSensei-Web",
    },
    {
        title: "QuickNote AI",
        subtitle: "AI Note-Taking Web App",
        description: "An AI note-taking app that summarizes notes and extracts key insights from videos.",
        tech: ["Next.js", "TypeScript", "Supabase", "OpenAI API", "Gemini API", "TailwindCSS", "Vercel"],
        category: "AI",
        demoLink: "https://quick-note-ai-free.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/QuickNote-AI",
    },
    {
        title: "Finsync",
        subtitle: "Financial Management Platform",
        description: "A unified app to track every expense and make payments across all your banks via Plaid.",
        tech: ["Next.js", "TypeScript", "Appwrite", "Plaid", "Dwolla", "React Hook Form", "Zod", "TailwindCSS", "Chart.js"],
        category: "Web",
        demoLink: "https://finsync-delta.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/FinSync",
    },
    {
        title: "Face Detection",
        subtitle: "Real-time Facial Attribute Analysis",
        description: "A real-time tool that identifies skin tone, eye colour, hair colour and length, and glasses.",
        tech: ["Python", "OpenCV", "MediaPipe", "Hugging Face"],
        category: "AI",
    },
    {
        title: "Dressify",
        subtitle: "AI Digital Wardrobe Manager",
        description: "A digital closet with an AI recommendation engine — item management, intelligent outfit suggestions and virtual try-ons.",
        tech: ["Next.js", "TypeScript", "Computer Vision", "Virtual Try-On"],
        category: "AI",
        demoLink: "https://dressify-sable.vercel.app/",
        githubLink: "https://github.com/Ali-Ch-001/dessify-project-code",
    },
    {
        title: "Gloria Jean's Coffees POS",
        subtitle: "Point of Sale System",
        description: "A modern web-based point-of-sale system for Gloria Jean's Coffees with real-time order handling.",
        tech: ["Next.js 15", "TypeScript", "Supabase", "TailwindCSS", "Real-time"],
        category: "Client",
        demoLink: "https://pos-gloria.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/POS_Gloria",
    },
    {
        title: "Binexia Bot",
        subtitle: "AI Trading Signal Platform",
        description: "A trading-signal platform where users unlock AI-generated signals after registration and payment verification.",
        tech: ["Next.js", "TypeScript", "Supabase", "AI/ML", "Payments"],
        category: "Web",
        demoLink: "https://binexia-bot.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/binexia-bot",
    },
    {
        title: "Car Body Shop",
        subtitle: "Body Repair Site + AI Paint Visualizer",
        description: "Site for a Rochdale car body shop with a CMS-driven blog, local area pages and an AI widget that suggests a paint colour and renders your car in it.",
        tech: ["Next.js", "OpenAI Images", "SunEditor", "Nodemailer", "TailwindCSS"],
        category: "Client",
        demoLink: "https://www.carbodyshop.org/",
        githubLink: "https://github.com/Kabeer-Ahmad/Car-Body-Shop-Website",
    },
    {
        title: "Little Knots",
        subtitle: "Handmade Crochet Store",
        description: "Storefront for a handmade crochet brand delivering across Pakistan — categories, product pages, checkout, order tracking and an admin panel.",
        tech: ["Next.js 16", "React 19", "TypeScript", "Supabase", "TailwindCSS"],
        category: "Client",
        demoLink: "https://littleknots.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/LittleKnots",
    },
    {
        title: "Lofty Rankers",
        subtitle: "Digital Marketing Agency",
        description: "A 3D, motion-rich website for an SEO and digital marketing agency.",
        tech: ["Next.js", "React Three Fiber", "Three.js", "Framer Motion"],
        category: "Client",
        demoLink: "https://loftyrankers.com/",
        githubLink: "https://github.com/Kabeer-Ahmad/LoftyRankers",
    },
    {
        title: "Bea Foster",
        subtitle: "Luxury Fashion & Interiors Brand",
        description: "Brand site for a luxury fashion and interior designer — boutique with Stripe checkout, magazine, events, masterclasses and an admin panel.",
        tech: ["Next.js", "Supabase", "Stripe", "Zustand", "Framer Motion"],
        category: "Client",
    },
    {
        title: "Wayne's Mobile Mechanic",
        subtitle: "Mechanic Website · Ohio, US",
        description: "Site for a mobile mechanic in Westerville, OH — interactive 3D hero scene, service pages, blog and a booking form.",
        tech: ["Next.js", "React Three Fiber", "GSAP", "Framer Motion", "Nodemailer"],
        category: "Client",
    },
    {
        title: "Angi's Maintenance Service",
        subtitle: "Cleaning & Maintenance Company",
        description: "Marketing site for a cleaning and maintenance company — services, project gallery, blog and an enquiry form.",
        tech: ["Next.js", "Framer Motion", "Nodemailer"],
        category: "Client",
        demoLink: "https://www.angismaintenanceservice.com/",
    },
    {
        title: "Golden Watch Security",
        subtitle: "Security Services · UK",
        description: "Website for a UK security company offering manned guarding, mobile patrols, alarm response and key holding.",
        tech: ["Next.js 16", "TailwindCSS 4", "Framer Motion"],
        category: "Client",
        demoLink: "https://golden-watch-security.vercel.app/",
    },
    {
        title: "Event Ticketing System",
        subtitle: "Real-time Ticketing Platform",
        description: "Fair ticket distribution with live availability updates over WebSockets, for attendees and administrators alike.",
        tech: ["Django", "Django Channels", "WebSockets", "PostgreSQL"],
        category: "Web",
        githubLink: "https://github.com/Kabeer-Ahmad/Event-Ticketing-System",
    },
    {
        title: "Sahi Security Limited",
        subtitle: "Security Services Website",
        description: "A marketing site for a security company to showcase its services and capture enquiries.",
        tech: ["Next.js", "TypeScript", "TailwindCSS"],
        category: "Client",
        demoLink: "https://sahi-security-nextjs.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/SahiSecurityNextjs",
    },
    {
        title: "IoT Smoke & Temperature Monitor",
        subtitle: "Real-time Monitoring",
        description: "A real-time smoke and temperature monitoring system with remote data logging and alerts.",
        tech: ["ESP8266", "Arduino", "Python", "Sensors"],
        category: "Systems",
        githubLink: "https://github.com/Kabeer-Ahmad/Smoke-Detection-System-ESP-8266",
    },
    {
        title: "Slingshot Racer",
        subtitle: "Unity Car Game",
        description: "A car racing game built around a slingshot launch mechanic.",
        tech: ["Unity", "C#", "Physics"],
        category: "Systems",
        githubLink: "https://github.com/Kabeer-Ahmad/SlingShot-Mechanism-Unity-Car-Game",
    },
    {
        title: "Scientific Computing Tool",
        subtitle: "Numerical Analysis",
        description: "A tool for complex scientific calculations and data analysis.",
        tech: ["C/C++", "NumPy", "SciPy"],
        category: "Systems",
    },
    {
        title: "HoneyMaze",
        subtitle: "Maze Game in Assembly",
        description: "Guide a honeybee to the exit of a maze — written entirely in Intel 8088 assembly.",
        tech: ["Assembly (8088)"],
        category: "Systems",
    },
];

export const SKILLS: Record<string, string[]> = {
    "AI & Automation": ["LLM APIs", "Agentic AI", "RAG", "PyTorch", "OpenCV", "Hugging Face", "Stable Diffusion", "ComfyUI", "n8n", "Zapier", "MediaPipe"],
    "Frontend & Mobile": ["React.js", "Next.js", "React Native", "Expo", "Three.js", "TypeScript", "JavaScript", "HTML5", "Tailwind CSS", "Remotion"],
    "Backend": ["Node.js", "Python", ".NET", "C / C++ / C#", "Django", "Express.js", "REST APIs"],
    "Data": ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Appwrite", "Redis"],
    "Cloud & DevOps": ["AWS", "Google Cloud", "Vercel", "Railway", "Docker", "Git / GitHub", "CI/CD"],
    "Testing & QA": ["Playwright", "Selenium", "Cypress", "Postman", "JMeter"],
};

export const EDUCATION = [
    {
        degree: "BS, Computer Science",
        institution: "FAST – NUCES, Lahore",
        period: "2021 – 2025",
        details: "CGPA 3.63",
    },
    {
        degree: "Pre-Engineering",
        institution: "Punjab Group of Colleges, Lahore",
        period: "2019 – 2021",
        details: "Grade A",
    },
];

export const PUBLICATIONS = [
    {
        title: "Scalable Network Intrusion Detection Systems Through Advanced Feature Engineering",
        venue: "IEEE Xplore",
        id: "11523882",
        link: "https://ieeexplore.ieee.org/document/11523882",
    },
];

export const CREDENTIALS = [
    { title: "Meta Front-End Developer", provider: "Meta", date: "2023", type: "Certification", link: "https://www.coursera.org/account/accomplishments/verify/UZQD4HA6H8PQ" },
    { title: "Unity Certified: Game Developer", provider: "Unity", date: "2024", type: "Certification", link: "https://www.linkedin.com/in/kabeer-ahmad/details/certifications/1724454583103/single-media-viewer/?profileId=ACoAADzqUHsBX5vvU7Lbns3nsqbR0uvvxHegu3w" },
    { title: "AWS Cloud Foundations", provider: "AWS", date: "2024 & 2025", type: "Certification", link: "https://www.credly.com/badges/23c77166-9596-4e14-a8aa-ac57cb8dcfeb/linked_in_profile" },
    { title: "ROS (Robot Operating System)", provider: "Robotics", date: "2024", type: "Certification" },
    { title: "Ethical Hacking – Mobile Platforms & Network Architecture", provider: "Great Learning", date: "2024", type: "Certification", link: "https://www.linkedin.com/in/kabeer-ahmad/details/certifications/1734259951592/single-media-viewer/?profileId=ACoAADzqUHsBX5vvU7Lbns3nsqbR0uvvxHegu3w" },
    { title: "IoT Bootcamp", provider: "Grandeur", date: "2024", type: "Certification", link: "https://credsverse.com/credentials/59d01ab3-d47b-4aa2-ae62-b8f64eb469fe" },
    { title: "AI for Everyone", provider: "DeepLearning.AI", date: "2024", type: "Course" },
    { title: "Foundations of Cybersecurity", provider: "Google", date: "2024", type: "Course", link: "https://www.coursera.org/account/accomplishments/verify/1VTOJMQVRVWE" },
    { title: "Play It Safe: Manage Security Risks", provider: "Google", date: "2024", type: "Course", link: "https://www.coursera.org/account/accomplishments/verify/D2U95QWWUI4O" },
    { title: "Microsoft Designer × Copilot (MLSA)", provider: "Microsoft", date: "2024", type: "Course", link: "https://www.linkedin.com/in/kabeer-ahmad/details/certifications/1733738446984/single-media-viewer/?profileId=ACoAADzqUHsBX5vvU7Lbns3nsqbR0uvvxHegu3w" },
    { title: "API Testing with JMeter", provider: "10Pearls", date: "2024", type: "Course", link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-3be68adde5f644c44b138d1ef14b20808748f814e5d7a57b329561037" },
    { title: "Automation with Selenium WebDriver", provider: "10Pearls", date: "2024", type: "Course", link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-3a397c5e1fdaa1cc3b0f8b71874f2d731a9e3a4024cfe724329564187" },
    { title: "Test Automation with Cypress", provider: "10Pearls", date: "2024", type: "Course", link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-245b15ca0edca328d2be38f765cd200896e89797473986ec329565950" },
    { title: "Introduction to API Testing with Postman", provider: "10Pearls", date: "2024", type: "Course", link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-193684c0f5ef021ed0012f8b4724ad11ae4b6d8f2536448c329569707" },
    { title: "QA Fundamentals", provider: "10Pearls", date: "2024", type: "Course", link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-f62cae352be09a069fb89d4d9be0d232cc1326eaddb32078329561702" },
];

/** Real businesses I've built for — shown as a wordmark strip. */
export const CLIENTS = [
    "Gloria Jean's Coffees",
    "Car Body Shop",
    "Little Knots",
    "Lofty Rankers",
    "Bea Foster",
    "Wayne's Mobile Mechanic",
    "Angi's Maintenance",
    "Golden Watch Security",
    "Sahi Security",
    "Physio School",
];

/** Things that were independently selected or reviewed. */
export const RECOGNITION = [
    { title: "LUMS LCE Idea Launch", detail: "Stylique selected for the incubation program", tag: "Incubation" },
    { title: "National Incubation Center", detail: "Stylique incubated at NIC", tag: "Incubation" },
    { title: "IEEE Xplore", detail: "Network intrusion detection paper published", tag: "Research" },
];

export const STATS = [
    { value: 2, suffix: "+", label: "Years shipping production code" },
    { value: PROJECTS.length, suffix: "", label: "Projects built & shipped" },
    { value: EXPERIENCES.length, suffix: "", label: "Engineering roles & internships" },
    { value: 1, suffix: "", label: "IEEE publication" },
];
