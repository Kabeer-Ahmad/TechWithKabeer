import { Github, Linkedin, Instagram, Youtube, Twitter } from "lucide-react";

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/kabeer-ahmad", // Assuming github handle based on linkedin
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/kabeer-ahmad/",
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: "https://instagram.com", // Placeholder, user didn't provide
    },
    {
        name: "YouTube",
        icon: Youtube,
        url: "https://youtube.com", // Placeholder
    },
    {
        name: "TikTok",
        icon: Twitter, // Lucide doesn't have TikTok, using Twitter as placeholder or generic
        url: "https://tiktok.com", // Placeholder
    },
];

export const EXPERIENCES = [
    {
        role: "COO | AI Solutions Architect | Full-Stack Dev",
        company: "Nexium",
        period: "Apr 2025 – Present",
        description: [
            "Spearheading the development of next-generation AI-driven tech solutions, positioning Nexium as a pioneering force in the industry",
            "Implementing forward-thinking strategies to enhance global market penetration, boost brand recognition, and establish Nexium as a dominant player in the tech ecosystem.",
            "Leading AI-driven product development and cloud architecture for next-generation SaaS platforms."
        ],
        technologies: ["AI/ML", "Cloud Architecture", "SaaS", "Strategic Planning", "Full Stack"]
    },
    {
        role: "Software Engineer Intern",
        company: "PureLogics",
        period: "Apr 2025 – July 2025",
        description: [
            "Wrote clean and reusable Python code, and participated in agile sprints, code reviews, and debugging sessions to optimize system performance.",
            "Worked closely with frontend teams to integrate APIs and ensure smooth, secure user interactions."
        ],
        technologies: ["Python", "Agile", "API Integration", "Flask", "Django", "Debugging"]
    },
    {
        role: "Cyber Security Engineer Intern",
        company: "YoungDev",
        period: "Sep 2024 – Oct 2024",
        description: [
            "Conducted security assessments using Nmap, OpenVAS, and Metasploit, identifying and mitigating security threats.",
            "Deployed honeypots, analyzed network traffic with Wireshark, and implemented security protocols to defend against cyber threats."
        ],
        technologies: ["Nmap", "OpenVAS", "Metasploit", "Wireshark", "Network Security"]
    },
    {
        role: "Full Stack Development Intern",
        company: "CodeAlpha",
        period: "Sep 2024 – Oct 2024",
        description: [
            "Built and optimized web applications using React.js, Next.js, and Node.js, enhancing both front-end and back-end functionalities.",
            "Applied JavaScript and database management skills to develop scalable, high-performance applications while collaborating with experienced professionals."
        ],
        technologies: ["React.js", "Next.js", "Node.js", "JavaScript", "Database Management"]
    },
    {
        role: "Software Quality Assurance Intern",
        company: "10Pearls",
        period: "Jun 2024 – Aug 2024",
        description: [
            "Designed, executed, and managed comprehensive test cases for software applications, ensuring high-quality deliverables. Conducted API testing using Postman, functional testing, and bug tracking to enhance software reliability.",
            "Utilized Selenium WebDriver, Cypress, and JMeter for automated testing and performance optimization."
        ],
        technologies: ["Selenium", "Cypress", "JMeter", "Postman", "QA Automation"]
    },
    {
        role: "Unity Game Development Intern",
        company: "Mindstorm Studios",
        period: "Jun 2024 – Aug 2024",
        description: [
            "Developed and optimized interactive 3D games using Unity and C# and Assisted in designing intuitive user interfaces for smooth game flow.",
            "Participated in the full game development life cycle, from concept to deployment, launching 1 game with 100+ active users."
        ],
        technologies: ["Unity", "C#", "3D Game Dev", "UI Design"]
    },
    {
        role: "Full Stack Development Intern",
        company: "Entracloud",
        period: "Jun 2024 – Aug 2024",
        description: [
            "Worked on 2+ full-stack web applications utilizing Node.js, React, and MongoDB Along with RESTful APIs and authentication systems.",
            "Collaborated with cross-functional teams to implement new features."
        ],
        technologies: ["Node.js", "React", "MongoDB", "REST APIs", "Authentication"]
    },
    {
        role: "Python Development Intern",
        company: "OctaNet Services Pvt Ltd",
        period: "May 2024 – Jul 2024",
        description: [
            "Developed 5+ automation scripts and data processing tools using Python, Optimized backend services.",
            "Gained experience with Python libraries like Tensor and Pandas, building tools that processed 100,000+ data records."
        ],
        technologies: ["Python", "Pandas", "Tensor", "Automation", "Data Processing"]
    }
];

export const PROJECTS = [
    {
        title: "Stylique",
        subtitle: "Next-Gen AI Fashion Platform + Plugins",
        description: "AI-powered styling assistant that helps you make smart shopping decisions and try outfits virtually. Get personalized recommendations that match your style perfectly.",
        tech: ["Next.js", "AI/ML", "Virtual Try-On", "TypeScript", "TailwindCSS", "Fashion Tech"],
        demoLink: "https://www.styliquetechnologies.com/",
        githubLink: "https://github.com/nexium-global/stylique-project-code"
    },
    {
        title: "Dressify",
        subtitle: "AI-Driven Digital Wardrobe Manager",
        description: "An end-to-end platform designed to revolutionize the way users manage and leverage their wardrobe. By combining a digital closet manager with an AI-driven recommendation engine, Dressify offers comprehensive item management, intelligent outfit suggestions, and virtual try-ons.",
        tech: ["Next.js", "AI/ML", "Virtual Try-On", "TypeScript", "Computer Vision", "Fashion Tech"],
        demoLink: "https://dressify-sable.vercel.app/",
        githubLink: "https://github.com/Ali-Ch-001/dessify-project-code"
    },
    {
        title: "QuickNote AI",
        subtitle: "AI-Powered Notes Application",
        description: "A production-ready AI-powered notes web app built with Next.js, Supabase, and multiple AI providers. Create, manage, and summarize your notes with intelligent AI assistance.",
        tech: ["Next.js", "TypeScript", "Supabase", "AI/ML", "TailwindCSS", "OpenAI"],
        demoLink: "https://quick-note-ai-free.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/QuickNote-AI"
    },
    {
        title: "Gloria Jean's Coffees POS",
        subtitle: "Point of Sale System",
        description: "A modern, web-based Point of Sale (POS) system built with Next.js 15, TypeScript, Tailwind CSS, and Supabase for Gloria Jean's Coffees.",
        tech: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "POS System", "Real-time"],
        demoLink: "https://pos-gloria.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/POS_Gloria"
    },
    {
        title: "Binexia Bot",
        subtitle: "AI-Powered Trading Signal Platform",
        description: "A modern AI-powered trading signal platform built using Next.js and Supabase. It allows users to access trading signals after registration and payment verification.",
        tech: ["Next.js", "TypeScript", "Supabase", "AI/ML", "Trading Signals", "Payment Integration"],
        demoLink: "https://binexia-bot.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/binexia-bot"
    },
    {
        title: "Event Ticketing System",
        subtitle: "Real-time Event Ticketing Platform",
        description: "A modern, real-time event ticketing platform built with Django, Django Channels, and WebSockets. This system enables fair ticket distribution, live availability updates, and a seamless user experience for both attendees and administrators.",
        tech: ["Django", "Python", "WebSockets", "Django Channels", "Real-time", "PostgreSQL"],
        githubLink: "https://github.com/Kabeer-Ahmad/Event-Ticketing-System"
    },
    {
        title: "Sahi Security Limited",
        subtitle: "Security Services Website",
        description: "A website for client to show what services they offer and contact them.",
        tech: ["Next.js", "TypeScript", "TailwindCSS", "React", "Responsive Design"],
        demoLink: "https://sahi-security-nextjs.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/SahiSecurityNextjs"
    },
    {
        title: "Finsync",
        subtitle: "A Financial Management Platform",
        description: "Built a P2P payment platform for financial management for underserved communities.",
        tech: ["Next.js", "TypeScript", "Appwrite", "Plaid", "Dwolla", "React Hook Form", "Zod", "TailwindCSS", "Chart.js"],
        demoLink: "https://finsync-delta.vercel.app/",
        githubLink: "https://github.com/Kabeer-Ahmad/FinSync"
    },
    {
        title: "CoinSensei",
        subtitle: "A Secure USDT Buy/Sell Platform",
        description: "Built a P2P trading platform for secure and seamless USDT transactions in Pakistan.",
        tech: ["Next.js", "TypeScript", "MySQL", "React Hook Form", "HTML", "TailwindCSS", "CSS", "PHP", "PHP Mailer"],
        demoLink: "https://www.coinsensei.co/",
        githubLink: "https://github.com/Kabeer-Ahmad/CoinSensei-Web"
    },
    {
        title: "IoT-Based Smoke/Temperature Monitoring System",
        subtitle: "Real-time Monitoring",
        description: "Built a real-time temperature monitoring system, featuring remote data logging and alerts.",
        tech: ["IoT", "Python", "Arduino", "Sensors", "ESP 8266"],
        githubLink: "https://github.com/Kabeer-Ahmad/Smoke-Detection-System-ESP-8266"
    },
    {
        title: "Slingshot Racer",
        subtitle: "Unity Based Car Game",
        description: "Developed an engaging car racing game with a slingshot mechanism.",
        tech: ["Unity", "C#", "Physics Engine", "Game Mechanics", "UI/UX"],
        githubLink: "https://github.com/Kabeer-Ahmad/SlingShot-Mechanism-Unity-Car-Game"
    },
    {
        title: "Scientific Computing Tool",
        subtitle: "Complex Scientific Calculations",
        description: "Built a tool for complex scientific calculations and data analysis using NumPy and SciPy.",
        tech: ["C/C++", "Python (NumPy, SciPy)"],
        githubLink: "https://github.com/username/scientific-computing-tool"
    },
    {
        title: "Face Detection",
        subtitle: "Real-time Face Detection",
        description: "Developed a real-time face detection tool using OpenCV for image processing.",
        tech: ["Python (OpenCV)", "C++"],
        githubLink: "https://github.com/username/face-detection"
    },
    {
        title: "HoneyMaze",
        subtitle: "Maze Solver In Assembly Language",
        description: "Designed a maze game where we have to navigate honeybee to find the exit.",
        tech: ["Assembly Language (Intel 8088)"],
        githubLink: "https://github.com/username/honeymaze"
    }
];

export const SKILLS = {
    "Languages": ["C / C++ / C#", "Python", "PHP", "Assembly (Intel 8088)", "TypeScript", "JavaScript", "Java", "Kotlin", "Swift", "Go"],
    "Web Development": ["HTML", "CSS / Tailwind CSS / SCSS", "Next.js", "React.js", "Three.js", "Vue.js", "Node.js", "Express.js", "WordPress / Shopify", "REST APIs", "GraphQL"],
    "Databases": ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase", "Appwrite / Supabase", "DynamoDB"],
    "Cloud & DevOps": ["AWS (EC2, S3, Lambda)", "Google Cloud", "Azure", "Hugging Face", "Docker", "Kubernetes", "CI/CD", "Vercel", "Netlify", "Git / GitHub"],
    "AI / ML": ["TensorFlow", "PyTorch", "Scikit-learn", "HuggingFace", "OpenAI API", "LangChain", "Computer Vision", "NLP"],
    "Mobile Development": ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "Expo"],
    "Graphics & Design": ["Canva", "Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe XD", "CapCut", "Adobe Premiere Pro", "Blender", "Sketch"],
    "Project Management": ["Agile / Scrum", "Jira", "Trello", "Asana", "Notion", "Slack", "Microsoft Teams", "Leadership", "Team Collaboration"],
    "Tools & Testing": ["Postman", "JMeter", "Cypress", "Jest", "Selenium", "Git", "VS Code", "Linux / Unix"]
};

export const EDUCATION = [
    {
        degree: "BS ( COMPUTER SCIENCE )",
        institution: "FAST - NUCES, Lahore",
        period: "2021 - 2025",
        details: "CGPA-3.57"
    },
    {
        degree: "Pre-Engineering",
        institution: "Punjab Group of Colleges, Lahore",
        period: "2019 - 2021",
        details: "Grade-A"
    }
];

export const CREDENTIALS = [
    {
        title: "META Front-End Developer",
        provider: "Meta",
        date: "2023",
        type: "Certification",
        link: "https://www.coursera.org/account/accomplishments/verify/UZQD4HA6H8PQ"
    },
    {
        title: "Unity Certified: Game Developer",
        provider: "Unity",
        date: "2024",
        type: "Certification",
        link: "https://www.linkedin.com/in/kabeer-ahmad/details/certifications/1724454583103/single-media-viewer/?profileId=ACoAADzqUHsBX5vvU7Lbns3nsqbR0uvvxHegu3w"
    },
    {
        title: "Amazon Cloud Foundation",
        provider: "AWS",
        date: "2024",
        type: "Certification",
        link: "https://www.credly.com/badges/23c77166-9596-4e14-a8aa-ac57cb8dcfeb/linked_in_profile"
    },
    {
        title: "Foundations of CyberSecurity",
        provider: "Google",
        date: "2024",
        type: "Course",
        link: "https://www.coursera.org/account/accomplishments/verify/1VTOJMQVRVWE"
    },
    {
        title: "Play It Safe: Manage Security Risks",
        provider: "Google",
        date: "2024",
        type: "Course",
        link: "https://www.coursera.org/account/accomplishments/verify/D2U95QWWUI4O"
    },
    {
        title: "DeepLearning - AI for Everyone",
        provider: "DeepLearning.AI",
        date: "2024",
        type: "Course",
        link: "#"
    },
    {
        title: "MLSA Microsoft Designer x Copilot",
        provider: "Microsoft",
        date: "2024",
        type: "Course",
        link: "https://www.linkedin.com/in/kabeer-ahmad/details/certifications/1733738446984/single-media-viewer/?profileId=ACoAADzqUHsBX5vvU7Lbns3nsqbR0uvvxHegu3w"
    },
    {
        title: "ROS (Robot Operating System)",
        provider: "Robotics",
        date: "2024",
        type: "Certification",
        link: "#"
    },
    {
        title: "Ethical Hacking - Mobile Platforms",
        provider: "Great Learning",
        date: "2024",
        type: "Certification",
        link: "https://www.linkedin.com/in/kabeer-ahmad/details/certifications/1734259951592/single-media-viewer/?profileId=ACoAADzqUHsBX5vvU7Lbns3nsqbR0uvvxHegu3w"
    },
    {
        title: "IOT Bootcamp",
        provider: "Grandeur",
        date: "2024",
        type: "Certification",
        link: "https://credsverse.com/credentials/59d01ab3-d47b-4aa2-ae62-b8f64eb469fe"
    },
    {
        title: "API Testing With JMETER",
        provider: "10Pearls",
        date: "2024",
        type: "Course",
        link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-3be68adde5f644c44b138d1ef14b20808748f814e5d7a57b329561037"
    },
    {
        title: "Automation With Selenium Web Driver",
        provider: "10Pearls",
        date: "2024",
        type: "Course",
        link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-3a397c5e1fdaa1cc3b0f8b71874f2d731a9e3a4024cfe724329564187"
    },
    {
        title: "Test Automation with Cypress",
        provider: "10Pearls",
        date: "2024",
        type: "Course",
        link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-245b15ca0edca328d2be38f765cd200896e89797473986ec329565950"
    },
    {
        title: "Introduction to API Testing with Postman",
        provider: "10Pearls",
        date: "2024",
        type: "Course",
        link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-193684c0f5ef021ed0012f8b4724ad11ae4b6d8f2536448c329569707"
    },
    {
        title: "QA Fundamentals",
        provider: "10Pearls",
        date: "2024",
        type: "Course",
        link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-f62cae352be09a069fb89d4d9be0d232cc1326eaddb32078329561702"
    }
];
