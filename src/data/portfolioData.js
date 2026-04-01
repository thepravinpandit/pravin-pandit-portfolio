// ═══════════════════════════════════════════════════════════════════
// 🚀 PORTFOLIO DATA — SINGLE SOURCE OF TRUTH
// All editable content lives here. No need to touch any component files.
// ═══════════════════════════════════════════════════════════════════

export const portfolioData = {
  name: 'Pravin Pandit',
  title: 'Associate Process Manager | Data Scientist | AI Engineer',
  tagline:
    'Associate Process Manager at eClerx with 4+ years of experience designing and deploying production-grade AI agents, RAG architectures, and low-latency enterprise AI systems.',
  roles: [
    'AI Engineer',
    'Data Scientist',
    'GenAI Builder',
    'RAG Architect',
    'ML Engineer',
  ],
  role: 'Associate Process Manager at eClerx',
  location: 'Pune, Maharashtra, India',
  websiteUrl: 'https://pravinpandit.github.io/ai-portfolio',
  resumeLink: '/resume/pravin-pandit-resume.pdf',
  profileImage: '/profile/pravin-pandit.svg',
  heroHighlights: [
    'Currently driving AI initiatives and delivery excellence at eClerx',
    'Built 3+ large-scale GenAI systems including AI agents and RAG copilots',
    'Reduced inference latency by up to 40% through pipeline optimization',
    'Improved system accuracy by 40–50% with prompt and retrieval tuning',
  ],
  heroLabels: {
    badge: '',
    currentRole: 'Current Role',
  },
  heroStats: [
    { label: 'Years Experience', value: 4, suffix: '+' },
    { label: 'GenAI Systems Built', value: 3, suffix: '+' },
    { label: 'Latency Reduction', value: 40, suffix: '%' },
  ],
  visitorCounter: {
    namespace: 'pravinpandit-portfolio',
    key: 'visits',
  },
  ctaLabels: {
    projects: 'View Projects',
    contact: 'Contact',
    resume: 'Resume',
  },
  footerTagline: 'Associate Process Manager | AI Engineer',
  contact: {
    email: 'pravin.h.pandit@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pravinpandit',
    github: 'https://github.com/thepravinpandit',
    twitter: 'https://x.com/impravin0708',
  },
}

export const siteMeta = {
  canonical: 'https://pravinpandit.github.io/ai-portfolio',
  ogImage: '/social/og-preview.svg',
  description:
    'Portfolio of Pravin Pandit, Associate Process Manager at eClerx specializing in AI agents, RAG systems, and production-grade GenAI applications.',
}

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'writing', label: 'Writing' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export const mobileNavSections = [
  { id: 'home', label: 'Home', icon: 'House' },
  { id: 'projects', label: 'Projects', icon: 'FolderGit2' },
  { id: 'experience', label: 'Experience', icon: 'BriefcaseBusiness' },
  { id: 'writing', label: 'Writing', icon: 'NotebookPen' },
  { id: 'contact', label: 'Contact', icon: 'MessageSquare' },
]

export const sectionContent = {
  about: {
    eyebrow: 'About Me',
    title: 'Applied AI engineering with production focus',
    description: 'Building scalable, low-latency AI systems for finance and enterprise workflows.',
    journeyTitle: 'Professional Summary',
    pathTitle: 'Career Path',
    closing:
      'I specialize in AI agents, Retrieval-Augmented Generation (RAG), prompt and tool orchestration, and robust AI system engineering with measurable business impact.',
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Core capabilities across AI delivery',
    description:
      'Hands-on expertise spanning model development, GenAI orchestration, data platforms, and cloud deployment.',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Selected AI and GenAI projects',
    description: 'Real systems delivered with measurable gains in latency, accuracy, and resolution efficiency.',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Work experience timeline',
    description: '4+ years delivering AI/ML and GenAI systems for enterprise and finance domains at scale.',
  },
  certifications: {
    eyebrow: 'Certifications',
    title: 'Certifications and awards',
    description: 'Industry credentials aligned with applied AI engineering and GenAI implementation.',
  },
  writing: {
    eyebrow: 'Latest Writing',
    title: 'Articles and expert contributions',
    description:
      'Medium articles and LinkedIn expert contributions on AI agents, machine learning, and career growth in data science.',
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'Impact snapshots',
    description: 'Representative stakeholder feedback themes from project outcomes and delivery impact.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Open to AI engineering opportunities',
    description: "Let's collaborate on production-ready AI systems and GenAI product engineering.",
    directTitle: 'Reach me directly',
    formTitle: 'Send a message',
  },
}

export const about = {
  headline: 'Associate Process Manager at eClerx with 4+ years of enterprise AI delivery experience.',
  body: [
    'I design and deploy production-grade AI systems across finance and enterprise domains, translating business problems into scalable, low-latency AI solutions. I currently work as an Associate Process Manager at eClerx.',
    'My core focus areas include AI agents, RAG architectures, prompt optimization, and end-to-end ML systems, with strong expertise in Python, Machine Learning, and Deep Learning.',
  ],
  journey: ['Accenture', 'Xoriant', 'eClerx'],
}

export const skillGroups = [
  {
    category: 'Programming & Systems',
    proficiency: 94,
    description: 'Backend-first AI system development and API integration.',
    items: [
      { name: 'Python', context: 'Primary language for AI services, pipelines, and orchestration.' },
      { name: 'Flask', context: 'Built service endpoints and integrations for AI workflows.' },
      { name: 'WebSocket APIs', context: 'Enabled low-latency real-time communication layers.' },
    ],
  },
  {
    category: 'Machine Learning',
    proficiency: 90,
    description: 'Classical ML design, evaluation, and optimization.',
    items: [
      { name: 'Supervised & Unsupervised Learning', context: 'Built end-to-end ML solutions for business classification tasks.' },
      { name: 'Feature Engineering', context: 'Designed features to improve model signal quality and robustness.' },
      { name: 'Model Evaluation', context: 'Balanced precision, recall, and F1 for high-confidence decisions.' },
      { name: 'PCA & Class Imbalance Handling', context: 'Used PCA and ADASYN to improve fairness and performance.' },
    ],
  },
  {
    category: 'Deep Learning',
    proficiency: 86,
    description: 'Applied neural architectures for NLP and sequence tasks.',
    items: [
      { name: 'Neural Networks', context: 'Structured deep learning models for predictive tasks.' },
      { name: 'Transformers (NLP)', context: 'Implemented transformer-based workflows in language applications.' },
      { name: 'RNN / LSTM / CNN', context: 'Worked with sequence and feature-extraction architectures.' },
    ],
  },
  {
    category: 'Generative AI & LLMs',
    proficiency: 95,
    description: 'AI agent frameworks, RAG pipelines, and prompt/tool orchestration.',
    items: [
      { name: 'AI Agents', context: 'Designed dynamic tool selection based on intent and context.' },
      { name: 'RAG Architectures', context: 'Improved domain relevance and grounding in enterprise content generation.' },
      { name: 'Prompt Engineering', context: 'Improved output quality and consistency via prompt optimization.' },
      { name: 'LlamaIndex & LangChain', context: 'Built orchestration layers and retrieval-integrated agent flows.' },
      { name: 'OpenAI & Azure OpenAI', context: 'Production integrations for LLM-powered enterprise use cases.' },
    ],
  },
  {
    category: 'Data Platforms, MLOps & Cloud',
    proficiency: 91,
    description: 'Data infrastructure and deployment for production-grade AI systems.',
    items: [
      { name: 'SQL (MySQL)', context: 'Managed structured data for online/offline AI processing.' },
      { name: 'Cosmos DB & Oracle DB', context: 'Integrated enterprise databases into AI pipelines.' },
      { name: 'Azure Blob Storage', context: 'Built extraction and optimization flows from cloud storage.' },
      { name: 'MLflow & Airflow', context: 'Experiment tracking and pipeline orchestration.' },
      { name: 'Docker & CI/CD', context: 'Containerized delivery and repeatable deployment.' },
      { name: 'Azure & AWS', context: 'Cloud deployments for scalable AI systems.' },
    ],
  },
]

export const projectFilters = ['All', 'GenAI', 'ML', 'Automation']

// ═══════════════════════════════════════════════════════════════════
// 🚀 ADD YOUR OWN PROJECTS BELOW
//
// Each project supports the following fields:
//
//  title       (string,   required) — Project name
//  category    (string,   required) — 'GenAI' | 'ML' | 'Automation' | 'Web' | custom
//  featured    (boolean,  optional) — Set true to show as the highlighted hero project
//  year        (string,   optional) — e.g. '2024'
//  image       (string,   required) — Thumbnail path: '/projects/your-image.svg'
//  tags        (string[], optional) — Short tech-stack labels shown on cards
//  description (string,   optional) — One-line card summary (falls back to problem)
//  problem     (string,   required) — The problem it solves
//  solution    (string,   required) — Your approach / what you built
//  details     (string,   optional) — Longer implementation deep-dive (shown in modal)
//  impact      (string,   required) — Quantified outcome / business value
//  github      (string,   optional) — Full GitHub URL or empty string
//  demo        (string,   optional) — Live demo URL or empty string
//  screenshots (string[], optional) — Additional images shown in the modal carousel
//
// TIP: Set featured: true on your BEST project — it appears full-width at the top.
// ═══════════════════════════════════════════════════════════════════

export const projects = [
  {
    title: 'FNPA Assistant — AI-driven Financial Intelligence Agent',
    category: 'GenAI',
    featured: true,
    year: '2024',
    image: '/projects/rag-assistant.svg',
    tags: ['Python', 'LlamaIndex', 'LangChain', 'Oracle DB', 'WebSocket'],
    description: 'Production-grade AI agent with dynamic tool selection for financial query resolution.',
    problem: 'Financial teams needed faster, context-aware handling of company-specific queries.',
    solution:
      'Built a production-grade AI agent with dynamic tool selection, advanced prompt optimization, and enterprise-grade workflows.',
    details:
      'Implemented Python + LlamaIndex + LangChain based orchestration with Oracle database integration and real-time WebSocket APIs for low-latency interaction.',
    stack: ['Python', 'LlamaIndex', 'LangChain', 'Oracle DB', 'WebSocket APIs'],
    impact: 'Improved query resolution efficiency by 20–30% and reduced response time by 30%.',
    screenshots: ['/projects/rag-assistant.svg', '/projects/rag-assistant-2.svg'],
  },
  {
    title: 'SAP Delivery Copilot — Generative AI System',
    category: 'GenAI',
    featured: false,
    year: '2024',
    image: '/projects/doc-intelligence.svg',
    tags: ['Azure Functions', 'OpenAI', 'MySQL', 'Cosmos DB', 'Redis'],
    description: 'Dynamic GenAI document generation system with RAG-enhanced enterprise content.',
    problem: 'Financial document generation workflows were manual, slow, and inconsistent.',
    solution:
      'Developed a dynamic GenAI document generation system with RAG-enhanced enterprise content generation.',
    details:
      'Integrated Azure Functions, Logic Apps, OpenAI LLM, MySQL, Cosmos DB, Node.js, Python, and Redis; improved data handling integrity and workflow scalability.',
    stack: ['Azure Functions', 'Logic Apps', 'OpenAI LLM', 'MySQL', 'Cosmos DB', 'Python', 'Redis'],
    impact: 'Enhanced domain-specific content generation quality by 30–40%.',
    screenshots: ['/projects/doc-intelligence.svg'],
  },
  {
    title: 'Bank Customer Churn Prediction System',
    category: 'ML',
    featured: false,
    year: '2023',
    image: '/projects/forecasting-engine.svg',
    tags: ['Python', 'Scikit-learn', 'PCA', 'ADASYN'],
    description: 'ML classification system for early churn risk detection with strong precision-recall balance.',
    problem: 'Banking teams needed early churn risk detection with strong precision-recall balance.',
    solution:
      'Built an ML classification solution with PCA, ADASYN, hyperparameter tuning, and multi-model evaluation.',
    details:
      'Evaluated algorithms for precision, recall, and F1-score; selected robust models and improved data quality through balancing and dimensionality reduction.',
    stack: ['Python', 'Scikit-learn', 'PCA', 'ADASYN', 'Model Tuning'],
    impact: 'Improved churn prediction performance by 20–30%, with model accuracy gains of 10–20%.',
    screenshots: ['/projects/forecasting-engine.svg'],
  },
  {
    title: 'Dynamic AI Agent Tool-Selection Framework',
    category: 'Automation',
    featured: false,
    year: '2023',
    image: '/projects/automation-system.svg',
    tags: ['Python', 'AI Agents', 'Tool Calling', 'WebSocket'],
    description: 'Context-aware AI agent framework for dynamic tool selection on multi-intent queries.',
    problem: 'Static tool routing reduced response quality in multi-intent enterprise queries.',
    solution:
      'Designed a context-aware AI agent framework for dynamic tool selection based on user intent and task context.',
    details:
      'Engineered orchestration logic and low-latency inference pipelines to improve execution efficiency in real-time workflows.',
    stack: ['Python', 'AI Agents', 'Tool Calling', 'WebSocket', 'Workflow Engines'],
    impact: 'Improved system accuracy by 20% and execution efficiency by 30%.',
    screenshots: ['/projects/automation-system.svg'],
  },
]

export const experience = [
  {
    company: 'eClerx',
    role: 'Associate Process Manager',
    period: 'Current Role',
    logo: '/logos/eclerx.svg',
    highlights: [
      'Leading AI-focused process initiatives for scalable enterprise delivery.',
      'Driving execution quality across AI system development and operational workflows.',
      'Bridging business priorities with practical AI engineering outcomes.',
    ],
    details: [
      'Collaborating with cross-functional teams to productionize AI use cases with measurable impact.',
      'Improving workflow efficiency by applying data-driven decision frameworks and AI-enabled automation.',
      'Strengthening delivery governance, reliability, and stakeholder alignment in AI programs.',
    ],
  },
  {
    company: 'Xoriant',
    role: 'Senior Applied AI Engineer / AI-ML Engineer',
    period: 'Previous Role',
    logo: '/logos/xoriant.svg',
    highlights: [
      'Designed production-grade AI agent frameworks with dynamic tool selection.',
      'Built real-time WebSocket inference pipelines for low-latency AI workflows.',
      'Improved system accuracy by 20% and reduced latency by up to 60% in targeted modules.',
    ],
    details: [
      'Architected context-aware tool orchestration logic for enterprise AI tasks.',
      'Led prompt engineering and tool orchestration strategy to improve output quality consistency.',
      'Built dynamic period and scenario extraction systems with measurable gains in performance and accuracy.',
    ],
  },
  {
    company: 'Accenture Solution Pvt Ltd',
    role: 'AI/ML Engineer',
    period: 'Jan 2022 – Jun 2024',
    logo: '/logos/accenture.svg',
    highlights: [
      'Built ML pipelines for ingestion, preprocessing, and evaluation with 10–20% performance gains.',
      'Implemented RAG capabilities to improve relevance and accuracy of domain-specific content.',
      'Optimized Azure Blob-based data extraction and improved processing performance by 20%.',
    ],
    details: [
      'Managed MySQL and Cosmos DB workflows for online and offline content processing.',
      'Applied robust data handling standards to preserve integrity and improve system reliability.',
      'Delivered scalable data and AI components aligned with enterprise delivery goals.',
    ],
  },
]

export const certifications = [
  {
    name: 'OCI 2025 Generative AI Professional',
    org: 'Oracle',
    year: '2025',
    badge: '/badges/ml-spec.svg',
    description: 'Professional certification focused on building and deploying generative AI solutions using Oracle Cloud Infrastructure.',
  },
  {
    name: 'NPCI Bharat AI Quest Finalist',
    org: 'NPCI',
    year: '2025',
    badge: '/badges/azure-ai.svg',
    description: 'National-level AI innovation challenge finalist recognition.',
  },
  {
    name: 'Databricks — Generative AI Fundamentals',
    org: 'Databricks',
    year: '2024',
    badge: '/badges/genai-llm.svg',
    description: 'Covers generative AI concepts, LLM fundamentals, and Databricks GenAI tools.',
  },
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    org: 'Microsoft',
    year: '2024',
    badge: '/badges/azure-ai.svg',
    description: 'Foundational certification covering Azure AI services and principles.',
  },
  {
    name: 'PCAP — Certified Associate Python Programmer',
    org: 'Python Institute',
    year: '2024',
    badge: '/badges/ml-spec.svg',
    description: 'Industry-recognized Python programming certification from the Python Institute.',
  },
  {
    name: 'Accenture Tech Leap — AI ML Foundation',
    org: 'Accenture',
    year: '2023',
    badge: '/badges/azure-ds.svg',
    description: 'Internal AI/ML foundations program aligned with enterprise AI delivery.',
  }
]

export const articles = [
  {
    title: 'Deep Agents: The Beginning of a New AI Era (Part 1)',
    description: 'An introduction to deep agents and why this paradigm is reshaping practical AI system design.',
    date: '2026-01-28',
    readTime: '2 min',
    link: 'https://medium.com/@thepravinpandit/deep-agents-the-beginning-of-a-new-ai-era-part-1-b155061661f2',
  },
  {
    title: 'Deep Agents in Action: Building a Real Agent with LangGraph (Part 2)',
    description: 'Hands-on walkthrough for building a practical deep agent using LangGraph and modern GenAI patterns.',
    date: '2026-01-30',
    readTime: '3 min',
    link: 'https://medium.com/@thepravinpandit/deep-agents-in-action-building-a-real-agent-with-langgraph-part-2-365403c51d38',
  }
]

export const testimonials = [
  {
    quote:
      'Pravin consistently translated complex AI requirements into reliable production systems with clear performance improvements.',
    name: 'Amit',
    title: 'Tech Lead',
    company: 'Accenture',
    avatar: '/avatars/ritika.svg',
  },
  {
    quote:
      'His work on agent orchestration and low-latency pipelines significantly improved both execution speed and output quality.',
    name: 'Engineering Collaboration Partner',
    title: 'Engineering Lead',
    company: 'Xoriant',
    avatar: '/avatars/aman.svg',
  },
  {
    quote:
      'Pravin brought strong rigor in data handling, model evaluation, and deployment practices to every AI initiative.',
    name: 'Project Leadership Feedback',
    title: 'AI/ML Program Manager',
    company: 'Accenture',
    avatar: '/avatars/neha.svg',
  },
]
