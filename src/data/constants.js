import piggame from "./PigGame.png"
import mtbs from "./MTBS.png"
import Eweb from "./ECweb.png"
import blogApp from "./BlogApp.png"
import covidTracker from "./CovidTracker.png"
import lcsFinder from "./LCSfinder.png"
import guessGame from "./GuessGame.png"
import aiGame from "./SentimentSong.png"
import toDoList from "./ToDoList.png"
import indexing from "./Indexingforspatialdata.png"
import image from "./imageanaylysis.png"
import bank from "./BankConc.png"
import dfsaLogo from "../images/dfsa.webp"
import j360xLogo from "../images/J360x.webp"
import oxagileLogo from "../images/oxagile.jpg"
import brainyBeamLogo from "../images/BrainyBeam.png"

export const Bio = {
    name: "Krutik Gevariya",
    tagline: "Lead Software Developer | AI Engineer",
    roles: [
      "Lead Software Developer",
      "AI Engineer",
      "Lead Developer",
    ],
    description:
      "Lead Software Developer and AI Engineer with experience building production-grade AI platforms, multi-agent systems, document intelligence solutions, and enterprise analytics products. Proven track record designing and deploying GPT-powered applications, AI copilots, and automated decision-support systems using CrewAI, OpenAI models, Python, Redis, PostgreSQL, and cloud-native architectures. Experienced in leading technical strategy, system design, and AI adoption across enterprise environments.",
    github: "https://github.com/krutik2377",
    resume:
      "https://drive.google.com/file/d/1INdEgiYbw7cMFKww1TNZMmWdzfniaKrY/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/kg2377",
    email: "krutikgevariya7723@gmail.com",
    phone: "(438) 304-1034",
  };

  /** Repo name patterns hidden from the portfolio UI (stats still count). */
  export const githubHiddenRepoPatterns = [
    /^fs-re-ak\//i,
    /j360x/i,
    /dfsa/i,
  ];

  export const heroStats = [
    { value: "3+", label: "Years Experience" },
    { value: "100+", label: "Business Users" },
    { value: "80%+", label: "Automation Gain" },
    { value: "30%", label: "Dev Efficiency ↑" },
  ];

  export const techMarquee = [
    { name: "Python", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    { name: "CrewAI", image: "https://avatars.githubusercontent.com/u/170677839?s=200&v=4" },
    { name: "React", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
    { name: "TypeScript", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
    { name: "OpenAI", image: "https://cdn.simpleicons.org/openai/90EE90" },
    { name: "Redis", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" },
    { name: "PostgreSQL", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
    { name: "Docker", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
    { name: "LangChain", image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    { name: "Spring Boot", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" },
  ];

  export const navSections = [
    { id: "about", label: "About" },
    { id: "publications", label: "Publications" },
    { id: "playground", label: "AI Demo" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "github", label: "GitHub" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  export const agentWorkflowSteps = [
    {
      id: 0,
      icon: "💬",
      name: "User Query",
      vocPipeline: true,
      description:
        "Customer feedback enters the platform through web UI, API, or batch ingestion. In this demo, the text you paste in the VoC Classifier is the input that starts the pipeline.",
      tech: ["REST API", "WebSockets", "VoC Ingestion"],
    },
    {
      id: 1,
      icon: "🔀",
      name: "Router Agent",
      vocPipeline: true,
      description:
        "Classifies intent (VoC feedback, document query, or report request), assigns priority, and hands off to the orchestration layer with the right agent crew.",
      tech: ["LLM", "Intent Classification", "Priority Routing"],
    },
    {
      id: 2,
      icon: "🎯",
      name: "Orchestration",
      vocPipeline: true,
      description:
        "The CrewAI orchestration layer coordinates multi-agent execution — task delegation, agent handoffs, shared state in Redis, and retry logic across the pipeline.",
      tech: ["CrewAI", "Redis", "Task Orchestration", "Agent Handoffs"],
    },
    {
      id: 3,
      icon: "📊",
      name: "Insight Agent",
      vocPipeline: true,
      vocClassifierStep: true,
      description:
        "Runs VoC analysis on the feedback — sentiment scoring, theme detection, and suggested actions. This is the same logic powering the VoC Classifier demo on the other tab.",
      tech: ["NLP", "Sentiment Analysis", "Theme Detection", "VoC Analytics"],
    },
    {
      id: 4,
      icon: "📄",
      name: "Document Agent",
      vocPipeline: false,
      description:
        "Optional parallel path for document-heavy requests — ingests PDFs, extracts knowledge, and grounds responses with RAG. Skipped for pure VoC feedback flows.",
      tech: ["Document Intelligence", "RAG", "PostgreSQL"],
    },
    {
      id: 5,
      icon: "📋",
      name: "Report Agent",
      vocPipeline: true,
      description:
        "Takes insight outputs (sentiment, themes, suggested action) and compiles executive summaries, dashboards, and automated reports for stakeholders.",
      tech: ["GPT", "PDF Generation", "Redis Cache"],
    },
  ];

  export const caseStudies = [
    {
      slug: "enterprise-ai-platform",
      title: "Enterprise AI / VoC Platform",
      subtitle: "Multi-agent customer experience analytics for enterprise clients",
      role: "Lead Software Developer",
      date: "2024 – Present",
      tags: ["CrewAI", "AI", "Enterprise"],
      placeholder: true,
      github: null,
    },
    {
      slug: "sentiment-song-recommendation",
      title: "Sentiment Based Song Recommendation",
      subtitle: "NLP-powered conversational recommendation system",
      role: "Developer",
      date: "Jun 2021 – Jul 2021",
      tags: ["Python", "NLTK", "NLP"],
      placeholder: true,
      github: "https://github.com/krutik2377/Sentiment-Based-Song-Recommendation-System",
    },
    {
      slug: "social-media-platform",
      title: "Real-Time Social Media Platform",
      subtitle: "Scalable full-stack platform with WebSockets and Kubernetes",
      role: "Developer",
      date: "Jan 2023 – Apr 2023",
      tags: ["Java", "Spring Boot", "Azure"],
      placeholder: true,
      github: "https://github.com/krutik2377",
    },
  ];

  export const publications = [
    {
      id: 0,
      title: "Architecting Large-scale System Design: Harnessing CQRS and Materialized Views for High Performance",
      date: "2024",
      platform: "Medium",
      url: "https://medium.com/@gevariyakrutik2377/architecting-large-scale-system-design-harnessing-cqrs-and-materialized-views-for-high-performance-1d5992d5e7f2",
      desc: "Explores CQRS and materialized views for building highly scalable, read-optimized system architectures with independent write and query scaling.",
    },
    {
      id: 1,
      title: "Agentic Programming: A Head Start to Building the Future of Intelligent Systems",
      date: "2025",
      isLatest: true,
      platform: "Medium",
      url: "https://shorturl.at/4w1bP",
      desc: "An introduction to agentic programming — how intelligent systems can plan, adapt, and act autonomously beyond traditional instruction-following software.",
    },
  ];
  
  export const skills = [
    {
      title: "Programming Languages",
      skills: [
        {
          name: "Python",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        },
        {
          name: "Java",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        },
        {
          name: "TypeScript",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
        },
        {
          name: "JavaScript",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
        },
      ],
    },
    {
      title: "AI & Agentic Systems",
      skills: [
        {
          name: "LLM Integration",
          image: "https://cdn.simpleicons.org/openai/412991",
        },
        {
          name: "Multi-Agent Systems",
          image: "https://avatars.githubusercontent.com/u/170677839?s=200&v=4",
        },
        {
          name: "Agentic AI Workflows",
          image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
        },
        {
          name: "AI Copilots",
          image: "https://cdn.simpleicons.org/openai/412991",
        },
        {
          name: "Prompt Engineering",
          image: "https://cdn.simpleicons.org/openai/412991",
        },
        {
          name: "AI Workflow Orchestration",
          image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
        },
        {
          name: "Document Intelligence",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        },
        {
          name: "Knowledge Grounding",
          image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
        },
        {
          name: "Semantic Search",
          image: "https://www.trychroma.com/chroma-logo.png",
        },
        {
          name: "RAG",
          image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
        },
        {
          name: "Vector Databases",
          image: "https://www.trychroma.com/chroma-logo.png",
        },
        {
          name: "AI Automation",
          image: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        },
      ],
    },
    {
      title: "AI Frameworks & Libraries",
      skills: [
        {
          name: "LangChain",
          image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
        },
        {
          name: "LlamaIndex",
          image: "https://avatars.githubusercontent.com/u/92402340?s=200&v=4",
        },
        {
          name: "CrewAI",
          image: "https://avatars.githubusercontent.com/u/170677839?s=200&v=4",
        },
        {
          name: "FastMCP",
          image: "https://cdn.simpleicons.org/anthropic/191919",
        },
        {
          name: "ChromaDB",
          image: "https://www.trychroma.com/chroma-logo.png",
        },
        {
          name: "OpenAI API",
          image: "https://cdn.simpleicons.org/openai/412991",
        },
        {
          name: "Hugging Face",
          image: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        },
        {
          name: "Socket.IO",
          image: "https://socket.io/images/logo-dark.svg",
        },
        {
          name: "PyMuPDF",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        },
      ],
    },
    {
      title: "Backend & Frameworks",
      skills: [
        {
          name: "Spring Boot",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg",
        },
        {
          name: "Node.js",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express.js",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
        },
        {
          name: "React",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
        },
        {
          name: "Next.js",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "Django",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
        },
        {
          name: "WebSockets",
          image: "https://socket.io/images/logo-dark.svg",
        },
        {
          name: "REST APIs",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Microservices Architecture",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
        },
        {
          name: "Event-Driven Architecture",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
        },
      ],
    },
    {
      title: "Databases",
      skills: [
        {
          name: "PostgreSQL",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Redis",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
        },
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        {
          name: "Docker",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
        },
        {
          name: "Kubernetes",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg",
        },
        {
          name: "AWS",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
        },
        {
          name: "Azure",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
        },
        {
          name: "CI/CD",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
        },
        {
          name: "Nginx",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg",
        },
        {
          name: "Jenkins",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
        },
      ],
    },
    {
      title: "Tools",
      skills: [
        {
          name: "Linux",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
        },
        {
          name: "Git/GitHub",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
        },
        {
          name: "Prisma",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg",
        },
        {
          name: "Jira",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg",
        },
        {
          name: "CodeRabbit",
          image: "https://www.coderabbit.ai/favicon.ico",
        },
      ],
    },
  ];
  
  export const experiences = [
    {
      id: 0,
      img: j360xLogo,
      role: "Lead Software Developer",
      company: "DFSA Inc. / J360x — Montreal, Canada (Remote)",
      date: "Feb 2026 – Present",
      badges: ["Leadership", "AI", "Enterprise"],
      desc: "• Led architecture and delivery of an AI-powered CX analytics platform for enterprise clients, improving development efficiency by 30% and reducing production defects by 25%. • Designed and deployed a CrewAI-based multi-agent platform that automated customer insights, recommendations, and document generation, reducing manual analysis effort by 80%+. • Built a multilingual AI copilot with enterprise knowledge grounding and document intelligence, supporting 100+ business users across client organizations. • Developed a document intelligence platform that transformed enterprise PDFs into queryable knowledge, significantly accelerating information retrieval. • Implemented Redis-based AI pipelines for customer feedback analysis, document ingestion, and automated insight generation at scale.",
      skills: [
        "CrewAI",
        "Redis",
        "AI/ML",
        "Document Intelligence",
        "Multi-agent Systems",
        "Enterprise AI",
        "Python",
      ],
    },
    {
      id: 1,
      img: dfsaLogo,
      role: "Software Developer",
      company: "DFSA Inc. — Montreal, Canada (Remote)",
      date: "Aug 2024 - Jan 2026",
      badges: ["AI", "GPT", "VoC"],
      desc: "• Engineered an AI-powered VoC platform that consolidated multi-channel customer feedback into real-time insights and recommendations. • Built AI-driven classification pipelines that categorized customer feedback, identified emerging themes, and surfaced actionable insights. • Implemented GPT-powered analytics workflows that contributed to a 20% increase in customer satisfaction ratings and improved Net Promoter Scores by more than 15 points within six months. • Developed no-code operational tooling that enabled non-technical teams to manage AI routing and business rules independently.",
      skills: [
        "GPT",
        "AI/ML",
        "VoC Platform",
        "NLP",
        "No-code Tooling",
        "Python",
      ],
    },
    {
      id: 2,
      img: oxagileLogo,
      role: "Software Developer",
      company: "OxAgile Inc. — Ontario, Canada (Remote)",
      date: "May 2023 - Apr 2024",
      badges: ["Full-Stack", "React", "Spring Boot"],
      desc: "• Architected scalable web applications with React, TypeScript, and Spring Boot, integrating RESTful and SOAP APIs for seamless system functionality and reducing API response times by 20%. • Led full-cycle software development, exploring emerging technologies to enhance innovation and system efficiency.",
      skills: [
        "React",
        "TypeScript",
        "Spring Boot",
        "REST APIs",
        "SOAP APIs",
      ],
    },
    {
      id: 3,
      img: oxagileLogo,
      role: "Software Developer Intern",
      company: "OxAgile Inc. — Ontario, Canada (Remote)",
      date: "Jan 2023 - Apr 2023",
      badges: ["Full-Stack", "UI/UX"],
      desc: "• Redesigned interactive user interfaces, reducing bounce rates by 15% and improving engagement. • Engineered backend systems with optimized API communication, increasing system reliability and enhancing cloud performance.",
      skills: [
        "React",
        "REST APIs",
        "UI/UX",
        "Backend Development",
      ],
    },
    {
      id: 4,
      img: brainyBeamLogo,
      role: "Data Science Intern",
      company: "Brainy Beam Technologies Pvt. Ltd — Ahmedabad, India",
      date: "May 2021 – Jun 2021",
      badges: ["ML", "Data Pipelines"],
      desc: "• Streamlined data collection and preprocessing pipelines, boosting execution speed by 50% for large-scale sentiment analysis on 10,000+ reviews. • Enhanced data pipelines, scaling a product to 12K+ new customers, contributing to a 15% sales increase and 20% rise in customer retention.",
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "Sentiment Analysis",
        "Data Pipelines",
        "Machine Learning",
      ],
    },
  ];
  


  export const projects = [
    {
      id: 12,
      featured: true,
      title: "Social Media Platform",
      date: "Jan 2023 – Apr 2023",
      description:
        "Developed a real-time social media platform using Java, Spring Boot, and RESTful APIs with PostgreSQL, integrating WebSockets for messaging and reducing data retrieval latency by 35% in an Agile environment. Deployed on Azure with Kubernetes for scalability, using JUnit test cases to ensure robust API performance and adherence to best practices for code quality.",
      image: blogApp,
      tags: ["Java", "Spring Boot", "PostgreSQL", "WebSockets", "Azure", "Kubernetes"],
      category: "full-stack",
      caseStudySlug: "social-media-platform",
      github: "https://github.com/krutik2377",
    },
    {
      id: 13,
      featured: true,
      title: "Recipe App",
      date: "Sep 2023 – Dec 2023",
      description:
        "Built a recipe-sharing platform using Java, Spring Boot, and a microservices architecture, developing RESTful APIs with Azure cloud storage to reduce retrieval time by 25% and improve performance by 20%. Utilized Docker and Kubernetes for reliable, scalable deployments in an Agile process, ensuring high-quality deliverables through JUnit testing and operational optimization.",
      image: Eweb,
      tags: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "Azure"],
      category: "full-stack",
      github: "https://github.com/krutik2377",
    },
    {
      id: 9,
      featured: true,
      title: "Movie Ticket Booking System",
      date: "Feb 2023 - Apr 2023",
      description:
        "This is a robust and resilient system designed to ensure continuous functionality in a distributed theater environment that is run by command line. It consists of three server components, allowing it to keep providing responses even if one server fails.To improve reliability, the project includes a fault tolerance mechanism that checks the accuracy of responses from each server. This mechanism detects and addresses incorrect or inconsistent responses, ensuring clients receive reliable information.The implementation incorporates various concepts from distributed systems, such as multicast communication for efficient message distribution, a total order algorithm to maintain message consistency, and the UDP protocol for fast and lightweight server communication.Additionally, the project employs CORBA (Common Object Request Broker Architecture) for seamless communication between clients and servers. This enables transparent and standardized interactions, simplifying development and integration. By combining these technologies and concepts, the Distributed Theater High Availability and Software Crash Recovery project achieves a resilient and dependable system that ensures uninterrupted operation, improves fault tolerance, and delivers a smooth experience for both theater management and clients.",
      image:
        mtbs,
      tags: [
        "Java",
        "Corba",
        "UDP communication",
      ],
      category: "web app",
      github: "https://github.com/krutik2377/DSD_Project_CORBA",
      // webapp: "https://trackify.duckdns.org",
      member: [
        {
          name: "Naren Zadafiya",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/naren-zadafiya-23768b210/?originalSubdomain=in",
          github: "https://github.com/zadfiya",
        },
        {
          name: "Shivam Patel",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/shivampatel0304/",
          github: "https://github.com/shivampatel304",
        },
        {
          name: "Nayan Sorathiya",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/nayankumar-sorathiya-367916143/?originalSubdomain=in",
          github: "https://github.com/nayansorarhiya",
        },
      ],
    },
    {
      id: 0,
      title: "An ECommerce Website",
      date: "Apr 2023 - May 2023",
      description:
        "Developed an eCommerce Website using MERN stack which has amazing features as well.",
      image:
        Eweb,
      tags: ["React Js", "MongoDb", "Node Js", "Express Js"],
      category: "web app",
      github: "https://github.com/krutik2377/An-Ecommerce-Website",
      // webapp: "https://podstream.netlify.app/",
    },
    {
      id: 1,
      title: "A Blogging Application",
      date: "Oct 2022 - Dec 2022",
      description:
        "Designed a blogging application that is developed by Mainly by Spring Boot , PostMan , JWT , MySql , Swagger , Hibernate  , AWS",
      image:
        blogApp,
      tags: [
        "Spring Boot",
        "JWT",
        "Postman",
        "Hibernate",
        "MySQL",
        "AWS",
      ],
      category: "web app",
      github: "https://github.com/krutik2377/Blooging-Application",
      // webapp: "https://vexa-app.netlify.app/",
    },
    {
      id: 2,
      title: "A Covid-19 Tracker",
      date: "Sep 2022 - Dec 2022",
      description:
        "It is a Web based data processing system that reads API/JSON data, creates a compact local database, and offers basic parameterized query functionality.This project adheres to coding standards, employs relevant design patterns, utilizes refactoring techniques, incorporates testing tools, and provides comprehensive documentation in a Software Architecture Document. The system ensures efficient data handling and retrieval for seamless integration with various applications. Here the important thing is that any kind of APIs is not used in this entire project except for presentation of data.",
      image:
        covidTracker,
      tags: ["Java", "Servlet", "MySQL", "JSP", "JDBC", "JUnit"],
      category: "web app",
      github: "https://github.com/krutik2377/A-Covid-19-Tracker",
      // webapp: "https://brain-tumor.netlify.app/",
      member: [
        {
          name: "Shivam Patel",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/shivampatel0304/",
          github: "https://github.com/shivampatel304",
        },
      ],
    },
    {
      id: 3,
      archive: true,
      title: "A Pig Game",
      date: "Aug 2023 - Sep 2023",
      description:
        "It is a javascript game in which it is dice based game which is using DOM object Manipulation and handling events at the backend by javascript",
      image:
        piggame,
      tags: ["HTML","JavaScript","CSS"],
      category: "web app",
      github: "https://github.com/krutik2377/Pig_Game",
      // webapp: "https://play.google.com/store/apps/details?id=com.rishav.buckoid",
    },
    {
      id: 10,
      title: "RegexBased LCS Finder",
      date: "May 2023 - Jul 2023",
      description:
        "It is Java Based Project that matches with word from a given dictonaries with provided regex with the help of self made regex pattern matcher without library and then finds the LCS of first three alphabatical words from that matched words.",
      image:
        lcsFinder,
      tags: ["Java","Regex Pattern Matcher"],
      category: "web app",
      github: "https://github.com/krutik2377/RegexBased-LCS-Finder",
      // webapp: "https://github.com/rishavchanda/Job-finder-App",
    },
    {
      id: 4,
      archive: true,
      title: "Guess My Number Game",
      date: "Sep 2023",
      description:
        "Designed a Simple game guess the number which will manipulate the simple backend DOM objects at the backend and count scores of your guesses.",
      image:
        guessGame,
      tags: ["javascript","HTML","CSS"],
      category: "web app",
      github: "https://github.com/krutik2377/GuessMyNumberGame",
      // webapp: "https://whatsapp-clone-rishav.web.app",
    },
    {
      id: 5,
      featured: true,
      title: "Sentiment Based Song Recommendation System",
      date: "Jun 2021 - Jul 2021",
      description:
        " It is an application that is an example of NLP' sentiment analysis library. In which, it communicate with the user and then decide the sentiment based on that conversation.",
      image:
       aiGame,
      tags: ["Python", "NLTK","File System"],
      category: "Artificial Intelligence",
      caseStudySlug: "sentiment-song-recommendation",
      github: "https://github.com/krutik2377/Sentiment-Based-Song-Recommendation-System",
      // webapp: "https://rishav-react-todo.netlify.app/",
    },
    {
      id: 6,
      archive: true,
      title: "To-Do-List",
      date: "Jan 2021",
      description:
        "A simple To-Do-List based on HTML , CSS , Javascript that maintains the daily task to do for User.",
      image:
       toDoList,
      tags: ["HTML","Css","JavaScript"],
      category: "web app",
      github: "https://github.com/krutik2377/To-Do-List",
      // webapp: "https://breaking-bad-webapp.netlify.app",
    },
    {
      id: 7,
      title: "Indexing Framework For 3D Spatial Data",
      date: "Jan 2023 - April 2023",
      description:
        "This project involves developing an effective index structure to speed up finding answers to two types of queries on a dataset of 10 million points in the 3D space stored in relation Points(X,Y,Z), where the attributes are real numbers in the range [0, 1000]. The first type of query involves finding all the points in the input dataset that are inside or lie on the borders of the cube defined by query parameters x1, x2, y1, y2, z1, and z2. The second type of query involves finding the nearest neighbor point(s) of a given point A(x1, y1, z1) in the dataset.The index structure can be either standard or ad hoc, tree-based or hash-based, and should be used for both types of queries. The project report should present the index/hash structure or a mixed (ad hoc) solution and explain its features. Additionally, the report should include the size of the index created and the query processing time to answer the queries. The maximum number of points for answering each query type is three, and the maximum points for the report are two. The presentation style and Q/A during the demo will get one point at most.The goal of this project is to build a fast and scalable indexing structure for 3D point clouds, using advanced indexing techniques to accelerate spatial query processing.",
      image:
        indexing,
      tags: ["Java", "Database Design" , "Problem solving"],
      category: "web app",
      github: "https://github.com/krutik2377/Indexing-Framework-for-3D-Spatial-Data.git",
      // webapp: "https://github.com/rishavchanda/Quiz-Earn",
      member: [
        {
          name: "Shivam Patel",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/shivampatel0304/",
          github: "https://github.com/shivampatel304",
        },
      ],
    },
    {
      id: 8,
      title: "BankConc- A banking Application",
      date: "May 2023 - Aug 2023",
      description:
        "BankConc is a state-of-the-art banking application built on Erlang, offering users a seamless experience for managing their finances. With its intuitive interface and robust features, BankConc enables users to efficiently handle transactions, transfer funds securely, and access various banking services on the fly. Whether it's checking balances, paying bills, or automating transactions, BankConc provides a secure and user-friendly platform for all banking needs, backed by advanced encryption technology to safeguard sensitive financial information.",
      image:
        bank,
      tags: ["Erlang", "Concurrency", "Parallel Programming"],
      category: "web app",
      github: "https://github.com/krutik2377/BankConc--A-Banking-Application.git",
      // webapp: "https://github.com/rishavchanda/Quiz-Earn",
    },
    {
      id: 11,
      featured: true,
      title: "Advancing Fairness in Facial Image Analysis",
      date: "Sep 2023 - Dec 2023",
      description:
        "Advancing Fairness in Facial Image Analysis is a pioneering project that harnesses the power of machine learning, convolutional neural networks (CNNs), and rigorous evaluation techniques to develop a fair and unbiased AI system for facial analysis. By implementing a PyTorch CNN for image analysis and employing k-fold validation, the project ensures robust model evaluation. Moreover, the project effectively addresses biases related to age, race, and gender, delivering a high-accuracy AI system while setting ethical standards in AI development. Through the acquisition of skills in machine learning, CNNs, k-fold validation, bias detection, and ethical AI development, this project exemplifies a commitment to advancing fairness and equity in AI technology.",
      image:
        image,
      tags: ["Machine Learning", "CNN", "Bias Detection and Mitigation" , "Ethical AI developement"],
      category: "Artificial Intelligence",
      github: "https://github.com/krutik2377/BankConc--A-Banking-Application.git",
      // webapp: "https://github.com/rishavchanda/Quiz-Earn",
      member: [
        {
          name: "Shivam Patel",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/shivampatel0304/",
          github: "https://github.com/shivampatel304",
        },
        {
          name: "Nayan Sorathiya",
          img: "https://thenounproject.com/api/private/icons/1995118/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
          linkedin: "https://www.linkedin.com/in/nayankumar-sorathiya-367916143/?originalSubdomain=in",
          github: "https://github.com/nayansorarhiya",
        },
      ],
    },
  ];

  export const education = [
    {
      id: 0,
      school: "Concordia University, Montreal, Canada",
      img : "https://logowik.com/content/uploads/images/concordia-university6864.jpg",
      date: "Sep 2022 - Apr 2024",
      grade: "3.2 GPA",
      desc: "Master's in Applied Computer Science with coursework in algorithm design, distributed systems, advanced databases, artificial intelligence, and software design methodology. Active member of Google Developers Student Club (GDSC) at Concordia.",
      degree: "Master's in Applied Computer Science",
      highlights: ["AI", "Distributed Systems", "Advanced Databases", "GDSC Member"],
    },
    {
      id: 1,
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Gujarat_Technological_University_%28GTU%29_logo.jpg",
      school: "A.D. Patel Institute of Technology, Gujarat, India",
      date: "Jul 2018 - Jun 2022",
      grade: "9.04 CGPA",
      desc: "Bachelor's in Computer Engineering with a strong foundation in software engineering, data structures, algorithms, and core computer science disciplines.",
      degree: "Bachelor's in Computer Engineering",
      highlights: ["9.04 CGPA", "Computer Engineering", "GTU Affiliated"],
    },
  ]; 
  
  // export const TimeLineData = [
  //   { year: 2017, text: "Started my journey" },
  //   { year: 2018, text: "Worked as a freelance developer" },
  //   { year: 2019, text: "Founded JavaScript Mastery" },
  //   { year: 2020, text: "Shared my projects with the world" },
  //   { year: 2021, text: "Started my own platform" },
  // ];
