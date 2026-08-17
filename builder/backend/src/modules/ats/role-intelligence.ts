// // // ============================================================
// // // ROLE INTELLIGENCE ENGINE
// // // ============================================================
// // //
// // // Purpose:
// // // - Maintain role-specific ATS benchmarks
// // // - Resolve free-text target roles safely
// // // - Support compound role titles
// // // - Support known + custom roles
// // // - Keep scoring configuration-driven
// // // - Avoid substring-based role misclassification
// // //
// // // IMPORTANT:
// // // targetRole supplied by the ATS request is the source of truth
// // // for the CURRENT analysis.
// // // This file does not modify the Resume document.
// // // ============================================================

// // export type RoleFamily =
// //   | "frontend"
// //   | "backend"
// //   | "fullstack"
// //   | "java"
// //   | "python"
// //   | "ai-ml"
// //   | "data"
// //   | "devops"
// //   | "cloud"
// //   | "qa"
// //   | "mobile"
// //   | "ui-ux"
// //   | "product"
// //   | "marketing"
// //   | "finance"
// //   | "hr"
// //   | "general";

// // // ============================================================
// // // SENIORITY
// // // ============================================================

// // export interface RoleSenioritySignals {
// //   entry: string[];
// //   mid: string[];
// //   senior: string[];
// //   lead: string[];
// // }

// // const DEFAULT_SENIORITY_SIGNALS: RoleSenioritySignals = {
// //   entry: [
// //     "built",
// //     "developed",
// //     "implemented",
// //     "created",
// //     "integrated",
// //   ],

// //   mid: [
// //     "designed",
// //     "optimized",
// //     "refactored",
// //     "owned",
// //     "automated",
// //   ],

// //   senior: [
// //     "architected",
// //     "scaled",
// //     "led",
// //     "drove",
// //     "established",
// //   ],

// //   lead: [
// //     "technical leadership",
// //     "engineering strategy",
// //     "architecture",
// //     "mentored engineers",
// //     "cross-functional leadership",
// //   ],
// // };

// // // ============================================================
// // // ROLE PROFILE
// // // ============================================================

// // export interface RoleIntelligenceProfile {
// //   id: string;

// //   name: string;

// //   family: RoleFamily;

// //   aliases: string[];

// //   coreSkills: string[];

// //   supportingSkills: string[];

// //   tools: string[];

// //   concepts: string[];

// //   responsibilities: string[];

// //   keywords: string[];

// //   senioritySignals: RoleSenioritySignals;

// //   preferredSections: string[];

// //   projectSignals: string[];

// //   achievementSignals: string[];

// //   benchmarkAvailable: boolean;
// // }

// // // ============================================================
// // // HELPERS
// // // ============================================================

// // const unique = (
// //   values: string[]
// // ): string[] => {
// //   return Array.from(
// //     new Set(
// //       values
// //         .map((value) => value.trim())
// //         .filter(Boolean)
// //     )
// //   );
// // };

// // const createSenioritySignals = (
// //   overrides: Partial<RoleSenioritySignals> = {}
// // ): RoleSenioritySignals => {
// //   return {
// //     entry: unique([
// //       ...DEFAULT_SENIORITY_SIGNALS.entry,
// //       ...(overrides.entry ?? []),
// //     ]),

// //     mid: unique([
// //       ...DEFAULT_SENIORITY_SIGNALS.mid,
// //       ...(overrides.mid ?? []),
// //     ]),

// //     senior: unique([
// //       ...DEFAULT_SENIORITY_SIGNALS.senior,
// //       ...(overrides.senior ?? []),
// //     ]),

// //     lead: unique([
// //       ...DEFAULT_SENIORITY_SIGNALS.lead,
// //       ...(overrides.lead ?? []),
// //     ]),
// //   };
// // };

// // // ============================================================
// // // FRONTEND DEVELOPER
// // // ============================================================

// // const FRONTEND_DEVELOPER: RoleIntelligenceProfile = {
// //   id: "frontend-developer",

// //   name: "Frontend Developer",

// //   family: "frontend",

// //   aliases: [
// //     "frontend developer",
// //     "front end developer",
// //     "frontend engineer",
// //     "front end engineer",
// //     "react developer",
// //     "react engineer",
// //     "ui developer",
// //     "web developer",
// //   ],

// //   coreSkills: [
// //     "HTML",
// //     "CSS",
// //     "JavaScript",
// //     "TypeScript",
// //     "React",
// //   ],

// //   supportingSkills: [
// //     "Next.js",
// //     "Redux",
// //     "Redux Toolkit",
// //     "Tailwind CSS",
// //     "Responsive Design",
// //     "REST API",
// //     "Accessibility",
// //     "Web Performance",
// //     "Testing",
// //     "Git",
// //   ],

// //   tools: [
// //     "Vite",
// //     "Webpack",
// //     "Babel",
// //     "Jest",
// //     "Vitest",
// //     "Cypress",
// //     "Playwright",
// //     "npm",
// //     "Yarn",
// //     "Git",
// //     "GitHub",
// //   ],

// //   concepts: [
// //     "component architecture",
// //     "state management",
// //     "responsive design",
// //     "accessibility",
// //     "performance optimization",
// //     "browser compatibility",
// //     "api integration",
// //     "authentication",
// //     "authorization",
// //     "web security",
// //   ],

// //   responsibilities: [
// //     "build user interfaces",
// //     "develop reusable components",
// //     "integrate APIs",
// //     "implement responsive layouts",
// //     "optimize frontend performance",
// //     "fix UI bugs",
// //     "write maintainable frontend code",
// //     "collaborate with backend developers",
// //   ],

// //   keywords: [
// //     "frontend",
// //     "web application",
// //     "user interface",
// //     "ui",
// //     "react",
// //     "javascript",
// //     "typescript",
// //     "html",
// //     "css",
// //     "rest api",
// //     "responsive",
// //     "performance",
// //     "accessibility",
// //     "git",
// //     "testing",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals(),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "web application",
// //     "dashboard",
// //     "e-commerce",
// //     "saas",
// //     "responsive",
// //     "react application",
// //     "api integration",
// //     "authentication",
// //     "performance",
// //   ],

// //   achievementSignals: [
// //     "performance improvement",
// //     "load time reduction",
// //     "conversion improvement",
// //     "user growth",
// //     "latency reduction",
// //     "accessibility improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // BACKEND DEVELOPER
// // // ============================================================

// // const BACKEND_DEVELOPER: RoleIntelligenceProfile = {
// //   id: "backend-developer",

// //   name: "Backend Developer",

// //   family: "backend",

// //   aliases: [
// //     "backend developer",
// //     "back end developer",
// //     "backend engineer",
// //     "back end engineer",
// //     "server side developer",
// //     "node.js developer",
// //     "node developer",
// //   ],

// //   coreSkills: [
// //     "Node.js",
// //     "Express",
// //     "REST API",
// //     "Databases",
// //     "Authentication",
// //   ],

// //   supportingSkills: [
// //     "TypeScript",
// //     "JavaScript",
// //     "MongoDB",
// //     "PostgreSQL",
// //     "MySQL",
// //     "Redis",
// //     "Docker",
// //     "Testing",
// //     "Git",
// //     "API Design",
// //   ],

// //   tools: [
// //     "Postman",
// //     "Docker",
// //     "Git",
// //     "GitHub",
// //     "npm",
// //     "Jest",
// //     "Redis",
// //     "MongoDB Atlas",
// //   ],

// //   concepts: [
// //     "REST",
// //     "API architecture",
// //     "authentication",
// //     "authorization",
// //     "JWT",
// //     "RBAC",
// //     "database design",
// //     "caching",
// //     "error handling",
// //     "logging",
// //     "security",
// //     "scalability",
// //     "performance",
// //   ],

// //   responsibilities: [
// //     "design backend services",
// //     "build APIs",
// //     "design database schemas",
// //     "implement authentication",
// //     "implement authorization",
// //     "integrate third-party services",
// //     "optimize backend performance",
// //     "write automated tests",
// //     "debug production issues",
// //   ],

// //   keywords: [
// //     "backend",
// //     "server",
// //     "api",
// //     "rest",
// //     "node.js",
// //     "express",
// //     "database",
// //     "mongodb",
// //     "postgresql",
// //     "authentication",
// //     "authorization",
// //     "jwt",
// //     "docker",
// //     "redis",
// //     "git",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals(),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "rest api",
// //     "authentication",
// //     "database",
// //     "microservices",
// //     "backend service",
// //     "payment integration",
// //     "real-time application",
// //     "scalable system",
// //   ],

// //   achievementSignals: [
// //     "latency reduction",
// //     "throughput improvement",
// //     "response time reduction",
// //     "cost reduction",
// //     "uptime improvement",
// //     "scalability improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // FULL STACK DEVELOPER
// // // ============================================================

// // const FULLSTACK_DEVELOPER: RoleIntelligenceProfile = {
// //   id: "fullstack-developer",

// //   name: "Full Stack Developer",

// //   family: "fullstack",

// //   aliases: [
// //     "full stack developer",
// //     "full-stack developer",
// //     "fullstack developer",
// //     "full stack engineer",
// //     "full-stack engineer",
// //     "mern developer",
// //     "mean developer",
// //   ],

// //   coreSkills: [
// //     "JavaScript",
// //     "TypeScript",
// //     "React",
// //     "Node.js",
// //     "REST API",
// //     "Database",
// //   ],

// //   supportingSkills: [
// //     "Express",
// //     "MongoDB",
// //     "PostgreSQL",
// //     "Next.js",
// //     "HTML",
// //     "CSS",
// //     "Git",
// //     "Docker",
// //     "Authentication",
// //     "Testing",
// //   ],

// //   tools: [
// //     "Vite",
// //     "npm",
// //     "Git",
// //     "GitHub",
// //     "Docker",
// //     "Postman",
// //     "Jest",
// //     "MongoDB Atlas",
// //   ],

// //   concepts: [
// //     "frontend development",
// //     "backend development",
// //     "api integration",
// //     "database design",
// //     "authentication",
// //     "authorization",
// //     "deployment",
// //     "web security",
// //     "performance",
// //     "scalability",
// //   ],

// //   responsibilities: [
// //     "develop frontend applications",
// //     "develop backend services",
// //     "integrate APIs",
// //     "design databases",
// //     "implement authentication",
// //     "deploy applications",
// //     "debug end-to-end issues",
// //     "build complete web applications",
// //   ],

// //   keywords: [
// //     "full stack",
// //     "react",
// //     "node.js",
// //     "express",
// //     "javascript",
// //     "typescript",
// //     "mongodb",
// //     "rest api",
// //     "html",
// //     "css",
// //     "git",
// //     "docker",
// //     "authentication",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals(),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //   ],

// //   projectSignals: [
// //     "full stack application",
// //     "saas",
// //     "e-commerce",
// //     "dashboard",
// //     "authentication",
// //     "payment integration",
// //     "rest api",
// //   ],

// //   achievementSignals: [
// //     "performance improvement",
// //     "user growth",
// //     "conversion improvement",
// //     "latency reduction",
// //     "cost reduction",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // JAVA DEVELOPER
// // // ============================================================

// // const JAVA_DEVELOPER: RoleIntelligenceProfile = {
// //   id: "java-developer",

// //   name: "Java Developer",

// //   family: "java",

// //   aliases: [
// //     "java developer",
// //     "java engineer",
// //     "java backend developer",
// //     "java backend engineer",
// //     "spring boot developer",
// //   ],

// //   coreSkills: [
// //     "Java",
// //     "Spring Boot",
// //     "REST API",
// //     "SQL",
// //     "Object-Oriented Programming",
// //   ],

// //   supportingSkills: [
// //     "Spring",
// //     "Hibernate",
// //     "JPA",
// //     "Maven",
// //     "Gradle",
// //     "JUnit",
// //     "Git",
// //     "Microservices",
// //     "Docker",
// //   ],

// //   tools: [
// //     "IntelliJ IDEA",
// //     "Eclipse",
// //     "Maven",
// //     "Gradle",
// //     "Git",
// //     "GitHub",
// //     "Postman",
// //     "Docker",
// //   ],

// //   concepts: [
// //     "OOP",
// //     "data structures",
// //     "design patterns",
// //     "REST",
// //     "microservices",
// //     "database design",
// //     "concurrency",
// //     "exception handling",
// //     "security",
// //     "scalability",
// //   ],

// //   responsibilities: [
// //     "develop Java applications",
// //     "build REST APIs",
// //     "implement business logic",
// //     "design database integrations",
// //     "write automated tests",
// //     "debug applications",
// //     "optimize application performance",
// //   ],

// //   keywords: [
// //     "java",
// //     "spring boot",
// //     "spring",
// //     "rest",
// //     "sql",
// //     "hibernate",
// //     "jpa",
// //     "maven",
// //     "junit",
// //     "microservices",
// //     "docker",
// //     "git",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals(),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "spring boot",
// //     "rest api",
// //     "microservices",
// //     "database",
// //     "enterprise application",
// //   ],

// //   achievementSignals: [
// //     "latency reduction",
// //     "throughput improvement",
// //     "performance improvement",
// //     "cost reduction",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // PYTHON DEVELOPER
// // // ============================================================

// // const PYTHON_DEVELOPER: RoleIntelligenceProfile = {
// //   id: "python-developer",

// //   name: "Python Developer",

// //   family: "python",

// //   aliases: [
// //     "python developer",
// //     "python engineer",
// //     "python backend developer",
// //     "python backend engineer",
// //   ],

// //   coreSkills: [
// //     "Python",
// //     "REST API",
// //     "SQL",
// //     "Object-Oriented Programming",
// //   ],

// //   supportingSkills: [
// //     "FastAPI",
// //     "Django",
// //     "Flask",
// //     "PostgreSQL",
// //     "MongoDB",
// //     "Pytest",
// //     "Docker",
// //     "Git",
// //     "Redis",
// //   ],

// //   tools: [
// //     "PyCharm",
// //     "VS Code",
// //     "pip",
// //     "Poetry",
// //     "Docker",
// //     "Git",
// //     "Postman",
// //     "Pytest",
// //   ],

// //   concepts: [
// //     "OOP",
// //     "API development",
// //     "database design",
// //     "authentication",
// //     "testing",
// //     "async programming",
// //     "caching",
// //     "security",
// //     "scalability",
// //   ],

// //   responsibilities: [
// //     "develop Python applications",
// //     "build APIs",
// //     "implement business logic",
// //     "integrate databases",
// //     "write tests",
// //     "debug applications",
// //     "optimize performance",
// //   ],

// //   keywords: [
// //     "python",
// //     "fastapi",
// //     "django",
// //     "flask",
// //     "rest api",
// //     "sql",
// //     "postgresql",
// //     "mongodb",
// //     "pytest",
// //     "docker",
// //     "git",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals(),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //   ],

// //   projectSignals: [
// //     "api",
// //     "backend",
// //     "automation",
// //     "web application",
// //     "data processing",
// //   ],

// //   achievementSignals: [
// //     "automation time reduction",
// //     "performance improvement",
// //     "latency reduction",
// //     "cost reduction",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // AI / ML ENGINEER
// // // ============================================================

// // const AI_ML_ENGINEER: RoleIntelligenceProfile = {
// //   id: "ai-ml-engineer",

// //   name: "AI/ML Engineer",

// //   family: "ai-ml",

// //   aliases: [
// //     "ai engineer",
// //     "ml engineer",
// //     "machine learning engineer",
// //     "artificial intelligence engineer",
// //     "ai ml engineer",
// //     "ai/ml engineer",
// //   ],

// //   coreSkills: [
// //     "Python",
// //     "Machine Learning",
// //     "Data Structures",
// //     "Statistics",
// //     "Model Development",
// //   ],

// //   supportingSkills: [
// //     "NumPy",
// //     "Pandas",
// //     "Scikit-learn",
// //     "TensorFlow",
// //     "PyTorch",
// //     "SQL",
// //     "Deep Learning",
// //     "NLP",
// //     "Computer Vision",
// //     "Git",
// //   ],

// //   tools: [
// //     "Jupyter",
// //     "MLflow",
// //     "Docker",
// //     "Git",
// //     "GitHub",
// //     "Google Colab",
// //     "AWS",
// //     "Azure",
// //   ],

// //   concepts: [
// //     "supervised learning",
// //     "unsupervised learning",
// //     "deep learning",
// //     "model evaluation",
// //     "feature engineering",
// //     "model deployment",
// //     "data preprocessing",
// //     "statistics",
// //     "NLP",
// //     "computer vision",
// //     "MLOps",
// //   ],

// //   responsibilities: [
// //     "develop machine learning models",
// //     "prepare datasets",
// //     "engineer features",
// //     "evaluate models",
// //     "deploy models",
// //     "monitor model performance",
// //     "build AI solutions",
// //     "optimize model performance",
// //   ],

// //   keywords: [
// //     "AI",
// //     "machine learning",
// //     "Python",
// //     "deep learning",
// //     "NLP",
// //     "computer vision",
// //     "TensorFlow",
// //     "PyTorch",
// //     "scikit-learn",
// //     "Pandas",
// //     "NumPy",
// //     "MLOps",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "trained",
// //         "evaluated",
// //         "preprocessed",
// //       ],
// //       mid: [
// //         "deployed",
// //         "fine-tuned",
// //         "experimented",
// //       ],
// //       senior: [
// //         "designed ML architecture",
// //         "productionized",
// //         "scaled ML systems",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //     "publications",
// //   ],

// //   projectSignals: [
// //     "machine learning model",
// //     "deep learning",
// //     "NLP",
// //     "computer vision",
// //     "prediction",
// //     "classification",
// //     "recommendation system",
// //     "model deployment",
// //   ],

// //   achievementSignals: [
// //     "accuracy improvement",
// //     "precision improvement",
// //     "recall improvement",
// //     "latency reduction",
// //     "model performance",
// //     "cost reduction",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // DATA ANALYST
// // // ============================================================

// // const DATA_ANALYST: RoleIntelligenceProfile = {
// //   id: "data-analyst",

// //   name: "Data Analyst",

// //   family: "data",

// //   aliases: [
// //     "data analyst",
// //     "business data analyst",
// //     "reporting analyst",
// //     "analytics analyst",
// //     "business analyst data",
// //   ],

// //   coreSkills: [
// //     "SQL",
// //     "Excel",
// //     "Data Analysis",
// //     "Statistics",
// //     "Data Visualization",
// //   ],

// //   supportingSkills: [
// //     "Python",
// //     "Pandas",
// //     "Power BI",
// //     "Tableau",
// //     "NumPy",
// //     "Google Sheets",
// //   ],

// //   tools: [
// //     "Excel",
// //     "Power BI",
// //     "Tableau",
// //     "Jupyter",
// //     "SQL",
// //     "Python",
// //   ],

// //   concepts: [
// //     "data cleaning",
// //     "data transformation",
// //     "statistical analysis",
// //     "business intelligence",
// //     "reporting",
// //     "dashboarding",
// //     "data visualization",
// //     "KPI analysis",
// //   ],

// //   responsibilities: [
// //     "analyze business data",
// //     "build dashboards",
// //     "generate reports",
// //     "identify trends",
// //     "clean datasets",
// //     "present insights",
// //     "support business decisions",
// //   ],

// //   keywords: [
// //     "SQL",
// //     "Excel",
// //     "Power BI",
// //     "Tableau",
// //     "Python",
// //     "Pandas",
// //     "data analysis",
// //     "data visualization",
// //     "statistics",
// //     "dashboard",
// //     "reporting",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "analyzed",
// //         "prepared",
// //         "reported",
// //       ],
// //       mid: [
// //         "automated",
// //         "presented",
// //         "owned analytics",
// //       ],
// //       senior: [
// //         "drove insights",
// //         "established reporting",
// //         "led analytics",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "dashboard",
// //     "business intelligence",
// //     "data analysis",
// //     "SQL analysis",
// //     "data visualization",
// //     "KPI reporting",
// //   ],

// //   achievementSignals: [
// //     "revenue increase",
// //     "cost reduction",
// //     "time saved",
// //     "process improvement",
// //     "forecast accuracy",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // DEVOPS ENGINEER
// // // ============================================================

// // const DEVOPS_ENGINEER: RoleIntelligenceProfile = {
// //   id: "devops-engineer",

// //   name: "DevOps Engineer",

// //   family: "devops",

// //   aliases: [
// //     "devops engineer",
// //     "devops developer",
// //     "site reliability engineer",
// //     "platform engineer",
// //     "sre",
// //   ],

// //   coreSkills: [
// //     "Linux",
// //     "Git",
// //     "CI/CD",
// //     "Docker",
// //     "Cloud",
// //   ],

// //   supportingSkills: [
// //     "Kubernetes",
// //     "AWS",
// //     "Azure",
// //     "Terraform",
// //     "Jenkins",
// //     "GitHub Actions",
// //     "Monitoring",
// //     "Networking",
// //     "Bash",
// //   ],

// //   tools: [
// //     "Docker",
// //     "Kubernetes",
// //     "Terraform",
// //     "Jenkins",
// //     "GitHub Actions",
// //     "AWS",
// //     "Azure",
// //     "Linux",
// //     "Prometheus",
// //     "Grafana",
// //   ],

// //   concepts: [
// //     "CI/CD",
// //     "infrastructure as code",
// //     "containerization",
// //     "orchestration",
// //     "monitoring",
// //     "logging",
// //     "cloud infrastructure",
// //     "networking",
// //     "security",
// //     "high availability",
// //   ],

// //   responsibilities: [
// //     "build deployment pipelines",
// //     "manage cloud infrastructure",
// //     "automate deployments",
// //     "monitor applications",
// //     "manage containers",
// //     "maintain production systems",
// //     "improve reliability",
// //     "automate infrastructure",
// //   ],

// //   keywords: [
// //     "devops",
// //     "ci/cd",
// //     "docker",
// //     "kubernetes",
// //     "aws",
// //     "azure",
// //     "terraform",
// //     "jenkins",
// //     "linux",
// //     "git",
// //     "monitoring",
// //     "infrastructure",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "configured",
// //         "deployed",
// //       ],
// //       mid: [
// //         "managed infrastructure",
// //         "automated deployments",
// //       ],
// //       senior: [
// //         "architected infrastructure",
// //         "designed platform",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "CI/CD pipeline",
// //     "Docker",
// //     "Kubernetes",
// //     "cloud deployment",
// //     "infrastructure",
// //     "monitoring",
// //   ],

// //   achievementSignals: [
// //     "deployment time reduction",
// //     "downtime reduction",
// //     "uptime improvement",
// //     "infrastructure cost reduction",
// //     "deployment frequency",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // CLOUD ENGINEER
// // // ============================================================

// // const CLOUD_ENGINEER: RoleIntelligenceProfile = {
// //   id: "cloud-engineer",

// //   name: "Cloud Engineer",

// //   family: "cloud",

// //   aliases: [
// //     "cloud engineer",
// //     "cloud developer",
// //     "cloud architect",
// //     "aws engineer",
// //     "azure engineer",
// //     "gcp engineer",
// //   ],

// //   coreSkills: [
// //     "Cloud Computing",
// //     "AWS",
// //     "Azure",
// //     "GCP",
// //     "Linux",
// //   ],

// //   supportingSkills: [
// //     "Docker",
// //     "Kubernetes",
// //     "Terraform",
// //     "Networking",
// //     "Security",
// //     "CI/CD",
// //     "Infrastructure as Code",
// //   ],

// //   tools: [
// //     "AWS",
// //     "Azure",
// //     "GCP",
// //     "Terraform",
// //     "Docker",
// //     "Kubernetes",
// //     "CloudFormation",
// //     "Git",
// //     "Jenkins",
// //   ],

// //   concepts: [
// //     "cloud architecture",
// //     "networking",
// //     "infrastructure as code",
// //     "high availability",
// //     "scalability",
// //     "cloud security",
// //     "monitoring",
// //     "disaster recovery",
// //     "load balancing",
// //   ],

// //   responsibilities: [
// //     "design cloud infrastructure",
// //     "deploy cloud applications",
// //     "manage cloud resources",
// //     "automate infrastructure",
// //     "monitor cloud systems",
// //     "implement cloud security",
// //     "optimize cloud costs",
// //   ],

// //   keywords: [
// //     "cloud",
// //     "AWS",
// //     "Azure",
// //     "GCP",
// //     "Docker",
// //     "Kubernetes",
// //     "Terraform",
// //     "Linux",
// //     "networking",
// //     "infrastructure",
// //     "CI/CD",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "configured cloud resources",
// //         "deployed",
// //       ],
// //       mid: [
// //         "managed cloud infrastructure",
// //         "optimized cloud costs",
// //       ],
// //       senior: [
// //         "architected cloud infrastructure",
// //         "designed cloud architecture",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "certifications",
// //     "education",
// //   ],

// //   projectSignals: [
// //     "cloud migration",
// //     "cloud deployment",
// //     "AWS",
// //     "Azure",
// //     "GCP",
// //     "infrastructure as code",
// //   ],

// //   achievementSignals: [
// //     "cloud cost reduction",
// //     "uptime improvement",
// //     "deployment improvement",
// //     "performance improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // QA ENGINEER
// // // ============================================================

// // const QA_ENGINEER: RoleIntelligenceProfile = {
// //   id: "qa-engineer",

// //   name: "QA Engineer",

// //   family: "qa",

// //   aliases: [
// //     "qa engineer",
// //     "quality assurance engineer",
// //     "software tester",
// //     "test engineer",
// //     "qa tester",
// //     "automation tester",
// //   ],

// //   coreSkills: [
// //     "Software Testing",
// //     "Test Automation",
// //     "Manual Testing",
// //     "API Testing",
// //     "Test Cases",
// //   ],

// //   supportingSkills: [
// //     "Selenium",
// //     "Cypress",
// //     "Playwright",
// //     "Jest",
// //     "Postman",
// //     "SQL",
// //     "Java",
// //     "JavaScript",
// //     "Python",
// //   ],

// //   tools: [
// //     "Selenium",
// //     "Cypress",
// //     "Playwright",
// //     "Postman",
// //     "Jira",
// //     "Jenkins",
// //     "Jest",
// //     "TestRail",
// //   ],

// //   concepts: [
// //     "test planning",
// //     "regression testing",
// //     "integration testing",
// //     "unit testing",
// //     "API testing",
// //     "test automation",
// //     "bug tracking",
// //     "quality assurance",
// //     "CI/CD",
// //   ],

// //   responsibilities: [
// //     "design test cases",
// //     "execute test plans",
// //     "automate test scenarios",
// //     "identify defects",
// //     "perform regression testing",
// //     "test APIs",
// //     "report bugs",
// //     "improve software quality",
// //   ],

// //   keywords: [
// //     "QA",
// //     "quality assurance",
// //     "testing",
// //     "test automation",
// //     "selenium",
// //     "cypress",
// //     "playwright",
// //     "API testing",
// //     "manual testing",
// //     "regression testing",
// //     "Jira",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "tested",
// //         "executed test cases",
// //         "reported defects",
// //       ],
// //       mid: [
// //         "automated",
// //         "designed test suites",
// //         "owned testing",
// //       ],
// //       senior: [
// //         "architected test automation",
// //         "led QA strategy",
// //         "established quality processes",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "certifications",
// //     "education",
// //   ],

// //   projectSignals: [
// //     "test automation",
// //     "API testing",
// //     "end-to-end testing",
// //     "regression testing",
// //     "CI/CD",
// //   ],

// //   achievementSignals: [
// //     "test coverage improvement",
// //     "defect reduction",
// //     "testing time reduction",
// //     "automation improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // MOBILE DEVELOPER
// // // ============================================================

// // const MOBILE_DEVELOPER: RoleIntelligenceProfile = {
// //   id: "mobile-developer",

// //   name: "Mobile Developer",

// //   family: "mobile",

// //   aliases: [
// //     "mobile developer",
// //     "mobile engineer",
// //     "android developer",
// //     "ios developer",
// //     "flutter developer",
// //     "react native developer",
// //   ],

// //   coreSkills: [
// //     "Mobile Development",
// //     "Android",
// //     "iOS",
// //     "Mobile UI",
// //   ],

// //   supportingSkills: [
// //     "Flutter",
// //     "React Native",
// //     "Kotlin",
// //     "Java",
// //     "Swift",
// //     "Dart",
// //     "REST API",
// //     "Git",
// //   ],

// //   tools: [
// //     "Android Studio",
// //     "Xcode",
// //     "Flutter",
// //     "React Native",
// //     "Firebase",
// //     "Git",
// //     "GitHub",
// //   ],

// //   concepts: [
// //     "mobile architecture",
// //     "state management",
// //     "offline storage",
// //     "API integration",
// //     "push notifications",
// //     "mobile security",
// //     "performance",
// //     "app lifecycle",
// //   ],

// //   responsibilities: [
// //     "develop mobile applications",
// //     "build reusable mobile components",
// //     "integrate APIs",
// //     "implement mobile UI",
// //     "optimize application performance",
// //     "fix mobile bugs",
// //     "publish applications",
// //   ],

// //   keywords: [
// //     "mobile",
// //     "android",
// //     "ios",
// //     "flutter",
// //     "react native",
// //     "kotlin",
// //     "swift",
// //     "dart",
// //     "firebase",
// //     "REST API",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals(),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //   ],

// //   projectSignals: [
// //     "mobile application",
// //     "android app",
// //     "ios app",
// //     "flutter app",
// //     "react native app",
// //   ],

// //   achievementSignals: [
// //     "app performance improvement",
// //     "crash reduction",
// //     "user growth",
// //     "app rating improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // UI / UX DESIGNER
// // // ============================================================

// // const UI_UX_DESIGNER: RoleIntelligenceProfile = {
// //   id: "ui-ux-designer",

// //   name: "UI/UX Designer",

// //   family: "ui-ux",

// //   aliases: [
// //     "ui ux designer",
// //     "ui/ux designer",
// //     "ux designer",
// //     "ui designer",
// //     "product designer",
// //     "user experience designer",
// //     "user interface designer",
// //   ],

// //   coreSkills: [
// //     "UI Design",
// //     "UX Design",
// //     "User Research",
// //     "Wireframing",
// //     "Prototyping",
// //   ],

// //   supportingSkills: [
// //     "Figma",
// //     "Adobe XD",
// //     "Sketch",
// //     "Design Systems",
// //     "Usability Testing",
// //     "Interaction Design",
// //     "Visual Design",
// //   ],

// //   tools: [
// //     "Figma",
// //     "Adobe XD",
// //     "Sketch",
// //     "FigJam",
// //     "Miro",
// //   ],

// //   concepts: [
// //     "user experience",
// //     "user research",
// //     "information architecture",
// //     "interaction design",
// //     "design systems",
// //     "usability",
// //     "accessibility",
// //     "visual hierarchy",
// //   ],

// //   responsibilities: [
// //     "design user interfaces",
// //     "conduct user research",
// //     "create wireframes",
// //     "build prototypes",
// //     "conduct usability testing",
// //     "maintain design systems",
// //     "collaborate with engineers",
// //   ],

// //   keywords: [
// //     "UI",
// //     "UX",
// //     "Figma",
// //     "wireframes",
// //     "prototypes",
// //     "user research",
// //     "usability",
// //     "design systems",
// //     "interaction design",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "designed",
// //         "prototyped",
// //         "created wireframes",
// //       ],
// //       mid: [
// //         "owned design",
// //         "conducted research",
// //         "established design systems",
// //       ],
// //       senior: [
// //         "led design strategy",
// //         "defined design systems",
// //         "drove user experience",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "mobile app design",
// //     "web application design",
// //     "design system",
// //     "prototype",
// //     "user research",
// //   ],

// //   achievementSignals: [
// //     "conversion improvement",
// //     "usability improvement",
// //     "user satisfaction",
// //     "engagement improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // PRODUCT MANAGER
// // // ============================================================

// // const PRODUCT_MANAGER: RoleIntelligenceProfile = {
// //   id: "product-manager",

// //   name: "Product Manager",

// //   family: "product",

// //   aliases: [
// //     "product manager",
// //     "product management",
// //     "associate product manager",
// //     "apm",
// //     "senior product manager",
// //   ],

// //   coreSkills: [
// //     "Product Management",
// //     "Product Strategy",
// //     "Roadmapping",
// //     "Stakeholder Management",
// //     "Requirements",
// //   ],

// //   supportingSkills: [
// //     "Agile",
// //     "Scrum",
// //     "User Research",
// //     "Analytics",
// //     "SQL",
// //     "A/B Testing",
// //     "Product Metrics",
// //   ],

// //   tools: [
// //     "Jira",
// //     "Confluence",
// //     "Notion",
// //     "Amplitude",
// //     "Mixpanel",
// //     "Google Analytics",
// //   ],

// //   concepts: [
// //     "product strategy",
// //     "roadmap",
// //     "product discovery",
// //     "user research",
// //     "prioritization",
// //     "product metrics",
// //     "experimentation",
// //     "stakeholder management",
// //     "agile",
// //   ],

// //   responsibilities: [
// //     "define product requirements",
// //     "manage product roadmap",
// //     "prioritize features",
// //     "conduct product discovery",
// //     "analyze product metrics",
// //     "coordinate stakeholders",
// //     "work with engineering teams",
// //     "measure product outcomes",
// //   ],

// //   keywords: [
// //     "product management",
// //     "product strategy",
// //     "roadmap",
// //     "requirements",
// //     "agile",
// //     "scrum",
// //     "user research",
// //     "analytics",
// //     "stakeholder management",
// //     "product metrics",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "supported",
// //         "analyzed",
// //         "coordinated",
// //       ],
// //       mid: [
// //         "owned roadmap",
// //         "prioritized",
// //         "launched",
// //       ],
// //       senior: [
// //         "defined product strategy",
// //         "drove product vision",
// //         "led cross-functional teams",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "product launch",
// //     "feature launch",
// //     "product strategy",
// //     "user research",
// //     "A/B testing",
// //   ],

// //   achievementSignals: [
// //     "user growth",
// //     "retention improvement",
// //     "conversion improvement",
// //     "revenue growth",
// //     "engagement improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // DIGITAL MARKETING
// // // ============================================================

// // const DIGITAL_MARKETING: RoleIntelligenceProfile = {
// //   id: "digital-marketing",

// //   name: "Digital Marketing",

// //   family: "marketing",

// //   aliases: [
// //     "digital marketing",
// //     "digital marketer",
// //     "digital marketing executive",
// //     "marketing specialist",
// //     "performance marketer",
// //     "growth marketer",
// //   ],

// //   coreSkills: [
// //     "Digital Marketing",
// //     "SEO",
// //     "SEM",
// //     "Content Marketing",
// //     "Social Media Marketing",
// //   ],

// //   supportingSkills: [
// //     "Google Ads",
// //     "Meta Ads",
// //     "Google Analytics",
// //     "Email Marketing",
// //     "Copywriting",
// //     "Marketing Analytics",
// //     "Lead Generation",
// //   ],

// //   tools: [
// //     "Google Analytics",
// //     "Google Ads",
// //     "Meta Ads Manager",
// //     "Search Console",
// //     "HubSpot",
// //     "Mailchimp",
// //     "SEMrush",
// //     "Ahrefs",
// //   ],

// //   concepts: [
// //     "SEO",
// //     "SEM",
// //     "conversion optimization",
// //     "lead generation",
// //     "marketing funnel",
// //     "content strategy",
// //     "campaign optimization",
// //     "analytics",
// //   ],

// //   responsibilities: [
// //     "plan marketing campaigns",
// //     "manage digital channels",
// //     "optimize campaigns",
// //     "analyze marketing performance",
// //     "generate leads",
// //     "improve conversion rates",
// //     "manage SEO initiatives",
// //   ],

// //   keywords: [
// //     "digital marketing",
// //     "SEO",
// //     "SEM",
// //     "Google Ads",
// //     "Meta Ads",
// //     "content marketing",
// //     "social media",
// //     "lead generation",
// //     "Google Analytics",
// //     "conversion",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "executed campaigns",
// //         "created content",
// //         "analyzed campaigns",
// //       ],
// //       mid: [
// //         "optimized campaigns",
// //         "managed budgets",
// //         "owned channels",
// //       ],
// //       senior: [
// //         "led marketing strategy",
// //         "drove growth",
// //         "established acquisition strategy",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "projects",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "marketing campaign",
// //     "SEO campaign",
// //     "paid advertising",
// //     "lead generation",
// //     "content campaign",
// //   ],

// //   achievementSignals: [
// //     "ROAS improvement",
// //     "conversion improvement",
// //     "lead growth",
// //     "traffic growth",
// //     "cost per acquisition reduction",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // FINANCE
// // // ============================================================

// // const FINANCE_ANALYST: RoleIntelligenceProfile = {
// //   id: "finance-analyst",

// //   name: "Finance Analyst",

// //   family: "finance",

// //   aliases: [
// //     "finance analyst",
// //     "financial analyst",
// //     "financial analyst associate",
// //     "fp&a analyst",
// //     "investment analyst",
// //   ],

// //   coreSkills: [
// //     "Financial Analysis",
// //     "Excel",
// //     "Financial Modeling",
// //     "Accounting",
// //     "Financial Reporting",
// //   ],

// //   supportingSkills: [
// //     "Power BI",
// //     "SQL",
// //     "Forecasting",
// //     "Budgeting",
// //     "Valuation",
// //     "Data Analysis",
// //   ],

// //   tools: [
// //     "Microsoft Excel",
// //     "Power BI",
// //     "Tableau",
// //     "SAP",
// //     "Oracle",
// //     "Bloomberg",
// //   ],

// //   concepts: [
// //     "financial modeling",
// //     "forecasting",
// //     "budgeting",
// //     "variance analysis",
// //     "financial reporting",
// //     "valuation",
// //     "risk analysis",
// //     "accounting",
// //   ],

// //   responsibilities: [
// //     "prepare financial analysis",
// //     "build financial models",
// //     "analyze financial performance",
// //     "prepare reports",
// //     "support budgeting",
// //     "perform variance analysis",
// //     "support business decisions",
// //   ],

// //   keywords: [
// //     "financial analysis",
// //     "Excel",
// //     "financial modeling",
// //     "accounting",
// //     "forecasting",
// //     "budgeting",
// //     "valuation",
// //     "financial reporting",
// //     "Power BI",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "analyzed",
// //         "prepared reports",
// //         "supported",
// //       ],
// //       mid: [
// //         "owned analysis",
// //         "built financial models",
// //         "managed forecasts",
// //       ],
// //       senior: [
// //         "led financial planning",
// //         "drove financial strategy",
// //         "established forecasting",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "financial model",
// //     "forecasting",
// //     "budget analysis",
// //     "valuation",
// //     "financial dashboard",
// //   ],

// //   achievementSignals: [
// //     "cost reduction",
// //     "forecast accuracy",
// //     "revenue growth",
// //     "budget optimization",
// //     "process improvement",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // HR
// // // ============================================================

// // const HR_PROFESSIONAL: RoleIntelligenceProfile = {
// //   id: "hr-professional",

// //   name: "HR Professional",

// //   family: "hr",

// //   aliases: [
// //     "hr",
// //     "hr professional",
// //     "human resources",
// //     "hr executive",
// //     "hr manager",
// //     "talent acquisition",
// //     "recruiter",
// //     "technical recruiter",
// //   ],

// //   coreSkills: [
// //     "Human Resources",
// //     "Recruitment",
// //     "Talent Acquisition",
// //     "Employee Relations",
// //     "HR Operations",
// //   ],

// //   supportingSkills: [
// //     "Onboarding",
// //     "Performance Management",
// //     "HR Analytics",
// //     "Payroll",
// //     "Compliance",
// //     "Training",
// //     "Employer Branding",
// //   ],

// //   tools: [
// //     "Workday",
// //     "SAP SuccessFactors",
// //     "LinkedIn Recruiter",
// //     "Greenhouse",
// //     "BambooHR",
// //     "Excel",
// //   ],

// //   concepts: [
// //     "talent acquisition",
// //     "employee engagement",
// //     "performance management",
// //     "onboarding",
// //     "HR operations",
// //     "HR analytics",
// //     "employment compliance",
// //     "workforce planning",
// //   ],

// //   responsibilities: [
// //     "manage recruitment processes",
// //     "source candidates",
// //     "conduct interviews",
// //     "manage onboarding",
// //     "support employee relations",
// //     "maintain HR operations",
// //     "analyze workforce data",
// //   ],

// //   keywords: [
// //     "HR",
// //     "human resources",
// //     "recruitment",
// //     "talent acquisition",
// //     "employee relations",
// //     "onboarding",
// //     "performance management",
// //     "HR analytics",
// //     "LinkedIn Recruiter",
// //   ],

// //   senioritySignals:
// //     createSenioritySignals({
// //       entry: [
// //         "coordinated",
// //         "supported recruitment",
// //         "scheduled interviews",
// //       ],
// //       mid: [
// //         "managed hiring",
// //         "owned recruitment",
// //         "led onboarding",
// //       ],
// //       senior: [
// //         "led HR strategy",
// //         "drove workforce planning",
// //         "established talent strategy",
// //       ],
// //     }),

// //   preferredSections: [
// //     "summary",
// //     "skills",
// //     "experience",
// //     "education",
// //     "certifications",
// //   ],

// //   projectSignals: [
// //     "recruitment campaign",
// //     "employee engagement",
// //     "HR analytics",
// //     "employer branding",
// //     "onboarding program",
// //   ],

// //   achievementSignals: [
// //     "time-to-hire reduction",
// //     "retention improvement",
// //     "employee engagement improvement",
// //     "hiring volume",
// //     "cost per hire reduction",
// //   ],

// //   benchmarkAvailable: true,
// // };

// // // ============================================================
// // // ROLE REGISTRY
// // // ============================================================

// // export const ROLE_INTELLIGENCE_PROFILES: RoleIntelligenceProfile[] = [
// //   FRONTEND_DEVELOPER,
// //   BACKEND_DEVELOPER,
// //   FULLSTACK_DEVELOPER,
// //   JAVA_DEVELOPER,
// //   PYTHON_DEVELOPER,
// //   AI_ML_ENGINEER,
// //   DATA_ANALYST,
// //   DEVOPS_ENGINEER,
// //   CLOUD_ENGINEER,
// //   QA_ENGINEER,
// //   MOBILE_DEVELOPER,
// //   UI_UX_DESIGNER,
// //   PRODUCT_MANAGER,
// //   DIGITAL_MARKETING,
// //   FINANCE_ANALYST,
// //   HR_PROFESSIONAL,
// // ];

// // // ============================================================
// // // TEXT NORMALIZATION
// // // ============================================================

// // export const normalizeRoleText = (
// //   value: string
// // ): string => {
// //   return value
// //     .toLowerCase()
// //     .trim()
// //     .replace(/&/g, " and ")
// //     .replace(/[./_-]/g, " ")
// //     .replace(/[^a-z0-9+# ]/g, " ")
// //     .replace(/\s+/g, " ")
// //     .trim();
// // };

// // // ============================================================
// // // TOKENIZATION
// // // ============================================================

// // const tokenizeRole = (
// //   value: string
// // ): string[] => {
// //   return Array.from(
// //     new Set(
// //       normalizeRoleText(value)
// //         .split(" ")
// //         .filter(Boolean)
// //     )
// //   );
// // };

// // // ============================================================
// // // TOKEN MATCH SCORE
// // // ============================================================
// // //
// // // Prevents naive substring matching.
// // //
// // // Example:
// // //
// // // "Full Stack Java Developer"
// // //
// // // Full Stack Developer
// // // → strong overlap
// // //
// // // Java Developer
// // // → weaker overlap
// // //
// // // Exact matches receive a large bonus.
// // // ============================================================

// // const scoreAliasMatch = (
// //   roleTokens: string[],
// //   aliasTokens: string[],
// //   normalizedRole: string,
// //   normalizedAlias: string
// // ): number => {
// //   if (
// //     !roleTokens.length ||
// //     !aliasTokens.length
// //   ) {
// //     return 0;
// //   }

// //   // Exact complete match
// //   if (
// //     normalizedRole ===
// //     normalizedAlias
// //   ) {
// //     return 1000;
// //   }

// //   const roleSet =
// //     new Set(roleTokens);

// //   const matchedTokens =
// //     aliasTokens.filter((token) =>
// //       roleSet.has(token)
// //     );

// //   if (!matchedTokens.length) {
// //     return 0;
// //   }

// //   const overlap =
// //     matchedTokens.length /
// //     aliasTokens.length;

// //   const coverage =
// //     matchedTokens.length /
// //     roleTokens.length;

// //   // Prefer aliases that explain more of the supplied title.
// //   let score =
// //     overlap * 70 +
// //     coverage * 30;

// //   // Small bonus when the alias appears
// //   // as a complete token sequence.
// //   const aliasPosition =
// //     roleTokens
// //       .join(" ")
// //       .indexOf(
// //         aliasTokens.join(" ")
// //       );

// //   if (aliasPosition >= 0) {
// //     score += 10;
// //   }

// //   return score;
// // };

// // // ============================================================
// // // PROFILE MATCH
// // // ============================================================

// // interface RoleMatchResult {
// //   profile: RoleIntelligenceProfile | null;

// //   score: number;

// //   matchedAlias: string | null;
// // }

// // export const matchRoleProfile = (
// //   targetRole: string
// // ): RoleMatchResult => {
// //   const normalizedRole =
// //     normalizeRoleText(
// //       targetRole
// //     );

// //   const roleTokens =
// //     tokenizeRole(
// //       targetRole
// //     );

// //   if (
// //     !normalizedRole ||
// //     !roleTokens.length
// //   ) {
// //     return {
// //       profile: null,
// //       score: 0,
// //       matchedAlias: null,
// //     };
// //   }

// //   let bestProfile:
// //     RoleIntelligenceProfile | null =
// //     null;

// //   let bestScore = 0;

// //   let bestAlias:
// //     string | null = null;

// //   for (
// //     const profile of
// //       ROLE_INTELLIGENCE_PROFILES
// //   ) {
// //     const aliases = unique([
// //       profile.name,
// //       ...profile.aliases,
// //     ]);

// //     for (
// //       const alias of aliases
// //     ) {
// //       const normalizedAlias =
// //         normalizeRoleText(
// //           alias
// //         );

// //       const aliasTokens =
// //         tokenizeRole(
// //           alias
// //         );

// //       const score =
// //         scoreAliasMatch(
// //           roleTokens,
// //           aliasTokens,
// //           normalizedRole,
// //           normalizedAlias
// //         );

// //       if (
// //         score > bestScore
// //       ) {
// //         bestScore = score;

// //         bestProfile =
// //           profile;

// //         bestAlias =
// //           alias;
// //       }
// //     }
// //   }

// //   return {
// //     profile: bestProfile,
// //     score: bestScore,
// //     matchedAlias: bestAlias,
// //   };
// // };

// // // ============================================================
// // // FIND ROLE PROFILE
// // // ============================================================

// // export const findRoleProfile = (
// //   targetRole: string
// // ): RoleIntelligenceProfile | null => {
// //   const result =
// //     matchRoleProfile(
// //       targetRole
// //     );

// //   // Conservative threshold.
// //   //
// //   // If there is not enough evidence that the
// //   // title belongs to a known role, return null.
// //   if (
// //     !result.profile ||
// //     result.score < 45
// //   ) {
// //     return null;
// //   }

// //   return result.profile;
// // };

// // // ============================================================
// // // CUSTOM ROLE PROFILE
// // // ============================================================
// // //
// // // IMPORTANT:
// // // Unknown roles DO NOT receive fake benchmark data.
// // //
// // // This prevents:
// // // matched / 0
// // // division-by-zero
// // // accidental 100% role fit
// // // misleading benchmark claims
// // // ============================================================

// // const createCustomRoleProfile = (
// //   targetRole: string
// // ): RoleIntelligenceProfile => {
// //   return {
// //     id: "custom",

// //     name:
// //       targetRole.trim(),

// //     family: "general",

// //     aliases: [],

// //     coreSkills: [],

// //     supportingSkills: [],

// //     tools: [],

// //     concepts: [],

// //     responsibilities: [],

// //     keywords: [],

// //     senioritySignals:
// //       createSenioritySignals(),

// //     preferredSections: [
// //       "summary",
// //       "skills",
// //       "experience",
// //       "projects",
// //       "education",
// //     ],

// //     projectSignals: [],

// //     achievementSignals: [],

// //     benchmarkAvailable: false,
// //   };
// // };

// // // ============================================================
// // // ROLE PROFILE RESOLUTION
// // // ============================================================

// // export const resolveRoleProfile = (
// //   targetRole: string
// // ): RoleIntelligenceProfile => {
// //   const profile =
// //     findRoleProfile(
// //       targetRole
// //     );

// //   if (profile) {
// //     return profile;
// //   }

// //   return createCustomRoleProfile(
// //     targetRole
// //   );
// // };

// // // ============================================================
// // // ROLE MATCH INFORMATION
// // // ============================================================

// // export const getRoleMatchInfo = (
// //   targetRole: string
// // ) => {
// //   const result =
// //     matchRoleProfile(
// //       targetRole
// //     );

// //   return {
// //     targetRole:
// //       targetRole.trim(),

// //     matchedProfile:
// //       result.profile?.name ??
// //       null,

// //     profileId:
// //       result.profile?.id ??
// //       "custom",

// //     family:
// //       result.profile?.family ??
// //       "general",

// //     matchedAlias:
// //       result.matchedAlias,

// //     matchScore:
// //       Math.round(
// //         result.score
// //       ),

// //     benchmarkAvailable:
// //       Boolean(
// //         result.profile
// //       ),
// //   };
// // };

// // // ============================================================
// // // ROLE SKILL POOL
// // // ============================================================

// // export const getRoleSkillPool = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   if (
// //     !profile.benchmarkAvailable
// //   ) {
// //     return [];
// //   }

// //   return unique([
// //     ...profile.coreSkills,
// //     ...profile.supportingSkills,
// //     ...profile.tools,
// //     ...profile.keywords,
// //   ]);
// // };

// // // ============================================================
// // // ROLE CORE SKILL POOL
// // // ============================================================

// // export const getRoleCoreSkillPool = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   if (
// //     !profile.benchmarkAvailable
// //   ) {
// //     return [];
// //   }

// //   return unique([
// //     ...profile.coreSkills,
// //   ]);
// // };

// // // ============================================================
// // // ROLE KEYWORD POOL
// // // ============================================================

// // export const getRoleKeywordPool = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   if (
// //     !profile.benchmarkAvailable
// //   ) {
// //     return [];
// //   }

// //   return unique([
// //     ...profile.keywords,
// //     ...profile.coreSkills,
// //     ...profile.supportingSkills,
// //     ...profile.concepts,
// //   ]);
// // };

// // // ============================================================
// // // ROLE RESPONSIBILITY POOL
// // // ============================================================

// // export const getRoleResponsibilityPool = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   if (
// //     !profile.benchmarkAvailable
// //   ) {
// //     return [];
// //   }

// //   return unique([
// //     ...profile.responsibilities,
// //   ]);
// // };

// // // ============================================================
// // // ROLE PROJECT SIGNALS
// // // ============================================================

// // export const getRoleProjectSignals = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   if (
// //     !profile.benchmarkAvailable
// //   ) {
// //     return [];
// //   }

// //   return unique([
// //     ...profile.projectSignals,
// //   ]);
// // };

// // // ============================================================
// // // ROLE ACHIEVEMENT SIGNALS
// // // ============================================================

// // export const getRoleAchievementSignals = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   if (
// //     !profile.benchmarkAvailable
// //   ) {
// //     return [];
// //   }

// //   return unique([
// //     ...profile.achievementSignals,
// //   ]);
// // };

// // // ============================================================
// // // ROLE SECTION SIGNALS
// // // ============================================================

// // export const getPreferredRoleSections = (
// //   targetRole: string
// // ): string[] => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   return unique([
// //     ...profile.preferredSections,
// //   ]);
// // };

// // // ============================================================
// // // BENCHMARK STATUS
// // // ============================================================

// // export const hasRoleBenchmark = (
// //   targetRole: string
// // ): boolean => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   return profile.benchmarkAvailable;
// // };

// // // ============================================================
// // // ROLE FAMILY
// // // ============================================================

// // export const getRoleFamily = (
// //   targetRole: string
// // ): RoleFamily => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   return profile.family;
// // };

// // // ============================================================
// // // ROLE SENIORITY SIGNALS
// // // ============================================================

// // export const getRoleSenioritySignals = (
// //   targetRole: string
// // ): RoleSenioritySignals => {
// //   const profile =
// //     resolveRoleProfile(
// //       targetRole
// //     );

// //   return profile.senioritySignals;
// // };




// import {
//   ATS_ACTION_VERBS,
//   ATS_SCORE_CATEGORIES,
//   ATS_STANDARD_SECTIONS,
//   ATS_WEAK_BULLET_PATTERNS,
//   ATS_METRIC_PATTERNS,
//   ATS_YEAR_PATTERN,
//   ATSBreakdown,
//   ATSCategoryResult,
//   ATSContactAnalysis,
//   ATSSectionAnalysis,
//   ATSSkillsAnalysis,
//   ATSKeywordAnalysis,
//   ATSExperienceAnalysis,
//   ATSActionVerbAnalysis,
//   ATSQuantifiedResultAnalysis,
//   ATSAchievementAnalysis,
//   ATSProjectAnalysis,
//   ATSEducationAnalysis,
//   ATSFormattingAnalysis,
//   ATSRuleAnalysis,
//   ATSRecommendation,
//   ATSCategoryStatus,
//   ATSScoreCategory,
//   clampATSScore,
//   calculateATSPercentage,
//   getATSCategoryStatus,
// } from "./ats.types";

// import {
//   getRoleMatchInfo,
//   getRoleSkillPool,
//   getRoleCoreSkillPool,
//   getRoleKeywordPool,
//   getRoleResponsibilityPool,
//   getRoleProjectSignals,
//   getRoleAchievementSignals,
//   getRoleSenioritySignals,
//   getPreferredRoleSections,
//   hasRoleBenchmark,
// } from "./role-intelligence";

// // ============================================================
// // RESUME SHAPE
// // ============================================================

// /**
//  * ATS does not mutate the Resume document.
//  *
//  * We intentionally use a lightweight internal shape here so
//  * the scorer remains independent from Mongoose.
//  */
// interface ATSResume {
//   targetRole?: string;

//   sections?: Array<{
//     id?: string;
//     type?: string;
//     title?: string;
//     enabled?: boolean;
//     order?: number;
//   }>;

//   personalInfo?: {
//     fullName?: string;
//     title?: string;
//     email?: string;
//     phone?: string;
//     address?: string;
//     linkedIn?: string;
//     github?: string;
//     portfolio?: string;
//   };

//   summary?: string;

//   skills?: Array<{
//     title?: string;
//     skills?: string[];
//   }>;

//   experience?: Array<{
//     company?: string;
//     position?: string;
//     startDate?: string;
//     endDate?: string;
//     currentlyWorking?: boolean;
//     responsibilities?: string[];
//     achievements?: string[];
//     location?: string;
//   }>;

//   internships?: Array<{
//     company?: string;
//     role?: string;
//     startDate?: string;
//     endDate?: string;
//     currentlyInterning?: boolean;
//     responsibilities?: string[];
//     achievements?: string[];
//   }>;

//   education?: Array<{
//     institution?: string;
//     degree?: string;
//     fieldOfStudy?: string;
//     startYear?: number;
//     endYear?: number;
//     cgpa?: string;
//   }>;

//   projects?: Array<{
//     title?: string;
//     role?: string;
//     description?: string;
//     technologies?: string[];
//     github?: string;
//     link?: string;
//   }>;

//   certifications?: string[];

//   languages?: Array<{
//     name?: string;
//     level?: string;
//   }>;

//   awards?: string[];

//   interests?: string[];

//   achievements?: string[];

//   strengths?: Array<{
//     title?: string;
//     description?: string;
//   }>;

//   customSections?: Array<{
//     id?: string;
//     type?: string;
//     title?: string;
//     enabled?: boolean;
//     order?: number;
//     items?: Array<{
//       title?: string;
//       subtitle?: string;
//       description?: string;
//     }>;
//   }>;
// }

// // ============================================================
// // INTERNAL HELPERS
// // ============================================================

// const cleanText = (value: unknown): string => {
//   if (typeof value !== "string") {
//     return "";
//   }

//   return value.trim();
// };

// const normalizeText = (value: unknown): string => {
//   return cleanText(value)
//     .toLowerCase()
//     .replace(/[^\p{L}\p{N}+#./-]+/gu, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// };

// const containsNormalizedPhrase = (
//   text: string,
//   phrase: string
// ): boolean => {
//   const normalizedText = ` ${normalizeText(text)} `;
//   const normalizedPhrase = normalizeText(phrase);

//   if (!normalizedPhrase) {
//     return false;
//   }

//   return (
//     normalizedText.includes(
//       ` ${normalizedPhrase} `
//     )
//   );
// };

// const countMatchingSignals = (
//   textValues: string[],
//   signals: string[]
// ): number => {
//   if (!textValues.length || !signals.length) {
//     return 0;
//   }

//   return signals.filter((signal) =>
//     textValues.some((text) =>
//       containsNormalizedPhrase(text, signal)
//     )
//   ).length;
// };

// const uniqueStrings = (
//   values: string[]
// ): string[] => {
//   const seen = new Set<string>();
//   const result: string[] = [];

//   for (const value of values) {
//     const cleaned = cleanText(value);

//     if (!cleaned) {
//       continue;
//     }

//     const key = normalizeText(cleaned);

//     if (!seen.has(key)) {
//       seen.add(key);
//       result.push(cleaned);
//     }
//   }

//   return result;
// };

// const flattenStrings = (
//   values: unknown[]
// ): string[] => {
//   return values
//     .flatMap((value) => {
//       if (Array.isArray(value)) {
//         return flattenStrings(value);
//       }

//       if (typeof value === "string") {
//         return [value];
//       }

//       return [];
//     })
//     .filter(Boolean);
// };

// const getCategory = (
//   id: string
// ) => {
//   return ATS_SCORE_CATEGORIES.find(
//     (category) => category.id === id
//   );
// };

// const getCategoryMaxScore = (
//   id: string
// ): number => {
//   return getCategory(id)?.maxScore ?? 0;
// };

// const makeCategoryResult = (
//   categoryId: string,
//   score: number,
//   summary: string,
//   issues: string[],
//   suggestions: string[]
// ): ATSCategoryResult => {
//   const category = getCategory(categoryId);

//   const maxScore = category?.maxScore ?? 0;

//   const safeScore = clampATSScore(
//     score,
//     0,
//     maxScore
//   );

//   const percentage =
//     calculateATSPercentage(
//       safeScore,
//       maxScore
//     );

//   const status: ATSCategoryStatus =
//     getATSCategoryStatus(percentage);

//   return {
//     category: categoryId as ATSScoreCategory,

//     title:
//       category?.title ?? categoryId,

//     score: safeScore,

//     maxScore,

//     percentage,

//     status,

//     summary,

//     issues: uniqueStrings(issues),

//     suggestions: uniqueStrings(
//       suggestions
//     ),
//   };
// };

// // ============================================================
// // CONTACT ANALYSIS
// // ============================================================

// export const analyzeContact = (
//   resume: ATSResume
// ): ATSContactAnalysis => {
//   const personalInfo =
//     resume.personalInfo ?? {};

//   const fullName =
//     cleanText(
//       personalInfo.fullName
//     ).length > 0;

//   const email =
//     cleanText(
//       personalInfo.email
//     ).length > 0;

//   const phone =
//     cleanText(
//       personalInfo.phone
//     ).length > 0;

//   const linkedIn =
//     cleanText(
//       personalInfo.linkedIn
//     ).length > 0;

//   const github =
//     cleanText(
//       personalInfo.github
//     ).length > 0;

//   const portfolio =
//     cleanText(
//       personalInfo.portfolio
//     ).length > 0;

//   /**
//    * Contact scoring:
//    *
//    * Name       2
//    * Email      2
//    * Phone      2
//    * LinkedIn   1.5
//    * GitHub     1.5
//    * Portfolio  1
//    *
//    * Total = 10
//    */
//   let score = 0;

//   if (fullName) score += 2;
//   if (email) score += 2;
//   if (phone) score += 2;
//   if (linkedIn) score += 1.5;
//   if (github) score += 1.5;
//   if (portfolio) score += 1;

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (!fullName) {
//     issues.push(
//       "Full name is missing."
//     );

//     suggestions.push(
//       "Add your full professional name."
//     );
//   }

//   if (!email) {
//     issues.push(
//       "Email address is missing."
//     );

//     suggestions.push(
//       "Add a professional email address."
//     );
//   }

//   if (!phone) {
//     issues.push(
//       "Phone number is missing."
//     );

//     suggestions.push(
//       "Add a reachable phone number."
//     );
//   }

//   if (!linkedIn) {
//     suggestions.push(
//       "Add a LinkedIn profile if available."
//     );
//   }

//   if (!github) {
//     suggestions.push(
//       "Add GitHub when applying for technical roles."
//     );
//   }

//   if (!portfolio) {
//     suggestions.push(
//       "Add a portfolio when it strengthens your application."
//     );
//   }

//   return {
//     fullName,
//     email,
//     phone,
//     linkedIn,
//     github,
//     portfolio,
//     score,
//     issues: uniqueStrings(issues),
//     suggestions: uniqueStrings(
//       suggestions
//     ),
//   };
// };

// // ============================================================
// // SECTION ANALYSIS
// // ============================================================

// export const analyzeSections = (
//   resume: ATSResume
// ): ATSSectionAnalysis => {
//   const sections =
//     resume.sections ?? [];

//   const enabledSections =
//     sections.filter(
//       (section) =>
//         section.enabled !== false
//     );

//   const present = uniqueStrings(
//     enabledSections.map(
//       (section) =>
//         section.type ||
//         section.id ||
//         ""
//     )
//   );

//   const disabled = uniqueStrings(
//     sections
//       .filter(
//         (section) =>
//           section.enabled === false
//       )
//       .map(
//         (section) =>
//           section.type ||
//           section.id ||
//           ""
//       )
//   );

//   const missing =
//     ATS_STANDARD_SECTIONS.filter(
//       (section) =>
//         !present.some(
//           (existing) =>
//             normalizeText(existing) ===
//             normalizeText(section)
//         )
//     );

//   const empty: string[] = [];

//   if (
//     present.includes("summary") &&
//     !cleanText(resume.summary)
//   ) {
//     empty.push("summary");
//   }

//   if (
//     present.includes("skills") &&
//     !(resume.skills ?? []).some(
//       (category) =>
//         (category.skills ?? []).length > 0
//     )
//   ) {
//     empty.push("skills");
//   }

//   if (
//     present.includes("experience") &&
//     (resume.experience ?? []).length === 0
//   ) {
//     empty.push("experience");
//   }

//   if (
//     present.includes("projects") &&
//     (resume.projects ?? []).length === 0
//   ) {
//     empty.push("projects");
//   }

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   const targetRole =
//     cleanText(
//       resume.targetRole
//     );

//   const preferredRoleSections =
//     targetRole
//       ? getPreferredRoleSections(
//           targetRole
//         )
//       : [];

//   const missingPreferredRoleSections =
//     preferredRoleSections.filter(
//       (section) =>
//         !present.some(
//           (existing) =>
//             normalizeText(existing) ===
//             normalizeText(section)
//         )
//     );

//   if (
//     hasRoleBenchmark(targetRole) &&
//     missingPreferredRoleSections.length > 0
//   ) {
//     suggestions.push(
//       `Consider adding role-relevant sections: ${missingPreferredRoleSections.slice(0, 3).join(", ")}.`
//     );
//   }

//   if (missing.includes("summary")) {
//     issues.push(
//       "Professional summary section is missing."
//     );
//   }

//   if (empty.length > 0) {
//     issues.push(
//       `Empty sections detected: ${empty.join(", ")}.`
//     );

//     suggestions.push(
//       "Remove empty sections or add meaningful content."
//     );
//   }

//   if (
//     !present.includes("experience") &&
//     !present.includes("internships")
//   ) {
//     suggestions.push(
//       "Add relevant professional or internship experience."
//     );
//   }

//   if (!present.includes("skills")) {
//     issues.push(
//       "Skills section is missing."
//     );

//     suggestions.push(
//       "Add a dedicated skills section."
//     );
//   }

//   if (!present.includes("education")) {
//     suggestions.push(
//       "Include education when relevant to the target role."
//     );
//   }

//   /**
//    * Base section score.
//    *
//    * 15 points distributed according to important
//    * section availability and completeness.
//    */
//   const importantSections = [
//     "summary",
//     "experience",
//     "education",
//     "skills",
//     "projects",
//   ];

//   const availableImportantSections =
//     importantSections.filter(
//       (section) =>
//         present.includes(section) &&
//         !empty.includes(section)
//     ).length;

//   let score =
//     (availableImportantSections /
//       importantSections.length) *
//     10;

//   if (present.length >= 5) {
//     score += 2;
//   }

//   if (
//     present.includes("certifications") ||
//     present.includes("achievements")
//   ) {
//     score += 1;
//   }

//   if (
//     present.includes("languages") ||
//     present.includes("awards")
//   ) {
//     score += 1;
//   }

//   if (empty.length === 0) {
//     score += 1;
//   }

//   return {
//     present,
//     missing,
//     disabled,
//     empty,
//     duplicate: [],
//     score: clampATSScore(
//       score,
//       0,
//       getCategoryMaxScore("sections")
//     ),
//     issues: uniqueStrings(issues),
//     suggestions: uniqueStrings(
//       suggestions
//     ),
//   };
// };

// // ============================================================
// // SKILLS ANALYSIS
// // ============================================================

// export const analyzeSkills = (
//   resume: ATSResume
// ): ATSSkillsAnalysis => {
//   const categories =
//     resume.skills ?? [];

//   const allSkills = flattenStrings(
//     categories.map(
//       (category) =>
//         category.skills ?? []
//     )
//   );

//   const normalizedMap =
//     new Map<string, string>();

//   const duplicateSkills: string[] = [];

//   for (const skill of allSkills) {
//     const normalized =
//       normalizeText(skill);

//     if (!normalized) {
//       continue;
//     }

//     if (
//       normalizedMap.has(normalized)
//     ) {
//       duplicateSkills.push(
//         skill
//       );
//     } else {
//       normalizedMap.set(
//         normalized,
//         skill
//       );
//     }
//   }

//   const skills = uniqueStrings(
//     allSkills
//   );

//   const targetRole =
//     cleanText(
//       resume.targetRole
//     );

//   const roleSkillPool =
//     targetRole
//       ? getRoleSkillPool(
//           targetRole
//         )
//       : [];

//   const roleCoreSkillPool =
//     targetRole
//       ? getRoleCoreSkillPool(
//           targetRole
//         )
//       : [];

//   const roleMatchedSkills =
//     roleSkillPool.filter(
//       (roleSkill) =>
//         skills.some((skill) =>
//           containsNormalizedPhrase(
//             skill,
//             roleSkill
//           )
//         )
//     );

//   const roleCoreMatchedSkills =
//     roleCoreSkillPool.filter(
//       (roleSkill) =>
//         skills.some((skill) =>
//           containsNormalizedPhrase(
//             skill,
//             roleSkill
//           )
//         )
//     );

//   const roleCoverage =
//     roleSkillPool.length === 0
//       ? 0
//       : (
//           roleMatchedSkills.length /
//           roleSkillPool.length
//         ) * 100;

//   const coreCoverage =
//     roleCoreSkillPool.length === 0
//       ? 0
//       : (
//           roleCoreMatchedSkills.length /
//           roleCoreSkillPool.length
//         ) * 100;

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (skills.length === 0) {
//     issues.push(
//       "No skills were detected."
//     );

//     suggestions.push(
//       "Add relevant technical or professional skills."
//     );
//   }

//   if (skills.length < 5) {
//     issues.push(
//       "Very few skills are listed."
//     );

//     suggestions.push(
//       "Add the most relevant skills for your target role."
//     );
//   }

//   if (duplicateSkills.length > 0) {
//     issues.push(
//       "Duplicate skills were detected."
//     );

//     suggestions.push(
//       "Remove duplicate skills and keep one clean occurrence."
//     );
//   }

//   if (categories.length === 0) {
//     suggestions.push(
//       "Organize skills into clear categories."
//     );
//   }

//   if (
//     hasRoleBenchmark(targetRole) &&
//     roleSkillPool.length > 0 &&
//     roleCoverage < 40
//   ) {
//     issues.push(
//       `Low alignment with the ${targetRole} role benchmark (${Number(roleCoverage.toFixed(1))}% skill coverage).`
//     );

//     suggestions.push(
//       `Add relevant ${targetRole} skills only when you genuinely have those skills.`
//     );
//   }

//   if (
//     hasRoleBenchmark(targetRole) &&
//     roleCoreSkillPool.length > 0 &&
//     coreCoverage < 50
//   ) {
//     suggestions.push(
//       "Prioritize core skills expected for the target role."
//     );
//   }

//   let score = 0;

//   if (skills.length >= 5) score += 4;
//   if (skills.length >= 10) score += 3;
//   if (skills.length >= 15) score += 2;

//   if (categories.length >= 2) {
//     score += 2;
//   }

//   if (categories.length >= 4) {
//     score += 2;
//   }

//   if (duplicateSkills.length === 0) {
//     score += 1;
//   }

//   if (skills.length >= 20) {
//     score -= 1;
//   }

//   // Role alignment contributes up to 3 points.
//   if (
//     hasRoleBenchmark(targetRole) &&
//     roleSkillPool.length > 0
//   ) {
//     score +=
//       (Math.min(
//         roleCoverage,
//         100
//       ) / 100) * 3;
//   }

//   return {
//     totalSkills: skills.length,

//     categories:
//       categories.length,

//     skills,

//     duplicateSkills:
//       uniqueStrings(
//         duplicateSkills
//       ),

//     suspiciousSkills: [],

//     score: clampATSScore(
//       score,
//       0,
//       getCategoryMaxScore("skills")
//     ),

//     issues: uniqueStrings(issues),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };


// // ============================================================
// // EXPERIENCE ANALYSIS
// // ============================================================

// const getExperienceBullets = (
//   resume: ATSResume
// ): string[] => {
//   const experienceBullets =
//     (resume.experience ?? []).flatMap(
//       (experience) => [
//         ...(experience.responsibilities ??
//           []),
//         ...(experience.achievements ??
//           []),
//       ]
//     );

//   const internshipBullets =
//     (resume.internships ?? []).flatMap(
//       (internship) => [
//         ...(internship.responsibilities ??
//           []),
//         ...(internship.achievements ??
//           []),
//       ]
//     );

//   return [
//     ...experienceBullets,
//     ...internshipBullets,
//   ].filter(
//     (bullet) =>
//       cleanText(bullet).length > 0
//   );
// };

// const isWeakBullet = (
//   bullet: string
// ): boolean => {
//   const text =
//     cleanText(bullet);

//   return ATS_WEAK_BULLET_PATTERNS.some(
//     (pattern) =>
//       pattern.test(text)
//   );
// };

// const containsMetric = (
//   bullet: string
// ): boolean => {
//   return (
//     bullet.match(
//       ATS_METRIC_PATTERNS.percentage
//     ) !== null ||
//     bullet.match(
//       ATS_METRIC_PATTERNS.currency
//     ) !== null ||
//     bullet.match(
//       ATS_METRIC_PATTERNS.time
//     ) !== null ||
//     bullet.match(
//       ATS_METRIC_PATTERNS.impactNumber
//     ) !== null
//   );
// };
// const containsActionVerb = (
//   bullet: string
// ): boolean => {
//   const normalized =
//     normalizeText(bullet);

//   if (!normalized) {
//     return false;
//   }

//   const firstWord =
//     normalized.split(" ")[0];

//   return ATS_ACTION_VERBS.some(
//     (verb) =>
//       verb === firstWord
//   );
// };

// export const analyzeExperience = (
//   resume: ATSResume
// ): ATSExperienceAnalysis => {
//   const experience =
//     resume.experience ?? [];

//   const internships =
//     resume.internships ?? [];

//   const bullets =
//     getExperienceBullets(
//       resume
//     );

//   const responsibilityBullets =
//     experience.reduce(
//       (count, item) =>
//         count +
//         (item.responsibilities
//           ?.length ?? 0),
//       0
//     ) +
//     internships.reduce(
//       (count, item) =>
//         count +
//         (item.responsibilities
//           ?.length ?? 0),
//       0
//     );

//   const achievementBullets =
//     experience.reduce(
//       (count, item) =>
//         count +
//         (item.achievements
//           ?.length ?? 0),
//       0
//     ) +
//     internships.reduce(
//       (count, item) =>
//         count +
//         (item.achievements
//           ?.length ?? 0),
//       0
//     );

//   const quantifiedBullets =
//     bullets.filter(
//       containsMetric
//     ).length;

//   const weakBullets =
//     bullets.filter(
//       isWeakBullet
//     );

//   const strongBullets =
//     bullets.filter(
//       (bullet) =>
//         containsActionVerb(
//           bullet
//         ) &&
//         containsMetric(
//           bullet
//         )
//     );

//   const repetitiveBullets: string[] =
//     [];

//   const seen = new Set<string>();

//   for (const bullet of bullets) {
//     const normalized =
//       normalizeText(bullet);

//     if (
//       seen.has(normalized)
//     ) {
//       repetitiveBullets.push(
//         bullet
//       );
//     }

//     seen.add(normalized);
//   }

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     experience.length === 0 &&
//     internships.length === 0
//   ) {
//     issues.push(
//       "No professional experience or internships were detected."
//     );

//     suggestions.push(
//       "Add relevant internships, projects or experience where appropriate."
//     );
//   }

//   if (
//     bullets.length > 0 &&
//     achievementBullets === 0
//   ) {
//     issues.push(
//       "Experience contains responsibilities but no explicit achievements."
//     );

//     suggestions.push(
//       "Convert important responsibilities into measurable achievements."
//     );
//   }

//   if (
//     quantifiedBullets === 0 &&
//     bullets.length > 0
//   ) {
//     issues.push(
//       "No measurable results were detected in experience bullets."
//     );

//     suggestions.push(
//       "Add numbers, percentages, scale or measurable outcomes."
//     );
//   }

//   if (weakBullets.length > 0) {
//     issues.push(
//       `${weakBullets.length} weakly phrased bullet(s) detected.`
//     );

//     suggestions.push(
//       "Replace weak openings with strong action verbs."
//     );
//   }

//   if (
//     repetitiveBullets.length > 0
//   ) {
//     issues.push(
//       "Repeated experience bullets were detected."
//     );

//     suggestions.push(
//       "Remove duplicate or highly repetitive statements."
//     );
//   }

//   const targetRole =
//     cleanText(
//       resume.targetRole
//     );

//   const roleResponsibilities =
//     targetRole
//       ? getRoleResponsibilityPool(
//           targetRole
//         )
//       : [];

//   const roleSenioritySignals =
//     targetRole
//       ? getRoleSenioritySignals(
//           targetRole
//         )
//       : {
//           entry: [],
//           mid: [],
//           senior: [],
//           lead: [],
//         };

//   const roleRelevantBullets =
//     roleResponsibilities.length > 0
//       ? bullets.filter((bullet) =>
//           roleResponsibilities.some(
//             (signal) =>
//               containsNormalizedPhrase(
//                 bullet,
//                 signal
//               )
//           )
//         )
//       : [];

//   const senioritySignalBullets =
//     bullets.filter((bullet) =>
//       [
//         ...roleSenioritySignals.entry,
//         ...roleSenioritySignals.mid,
//         ...roleSenioritySignals.senior,
//         ...roleSenioritySignals.lead,
//       ].some((signal) =>
//         containsNormalizedPhrase(
//           bullet,
//           signal
//         )
//       )
//     );

//   const roleRelevanceCoverage =
//     roleResponsibilities.length === 0 ||
//     bullets.length === 0
//       ? 0
//       : (
//           roleRelevantBullets.length /
//           bullets.length
//         ) * 100;

//   if (
//     hasRoleBenchmark(targetRole) &&
//     bullets.length > 0 &&
//     roleResponsibilities.length > 0 &&
//     roleRelevantBullets.length === 0
//   ) {
//     issues.push(
//       `Experience bullets show weak alignment with the ${targetRole} role benchmark.`
//     );

//     suggestions.push(
//       "Rewrite experience bullets to emphasize responsibilities that genuinely match the target role."
//     );
//   }

//   if (
//     hasRoleBenchmark(targetRole) &&
//     bullets.length > 0 &&
//     senioritySignalBullets.length === 0
//   ) {
//     suggestions.push(
//       "Use role-appropriate ownership and impact language that accurately reflects your seniority."
//     );
//   }

//   let score = 0;

//   if (experience.length > 0) {
//     score += 4;
//   } else if (
//     internships.length > 0
//   ) {
//     score += 3;
//   }

//   if (bullets.length >= 3) {
//     score += 2;
//   }

//   if (achievementBullets > 0) {
//     score += 3;
//   }

//   if (quantifiedBullets > 0) {
//     score += 2;
//   }

//   if (strongBullets.length > 0) {
//     score += 2;
//   }

//   // Role relevance contributes up to 2 points.
//   if (
//     hasRoleBenchmark(targetRole) &&
//     roleResponsibilities.length > 0 &&
//     bullets.length > 0
//   ) {
//     score +=
//       (Math.min(
//         roleRelevanceCoverage,
//         100
//       ) / 100) * 2;
//   }

//   if (
//     weakBullets.length === 0 &&
//     bullets.length > 0
//   ) {
//     score += 1;
//   }

//   if (
//     repetitiveBullets.length > 0
//   ) {
//     score -= 1;
//   }

//   return {
//     experienceCount:
//       experience.length,

//     internshipCount:
//       internships.length,

//     totalBullets:
//       bullets.length,

//     responsibilityBullets,

//     achievementBullets,

//     quantifiedBullets,

//     weakBullets:
//       uniqueStrings(
//         weakBullets
//       ),

//     strongBullets:
//       uniqueStrings(
//         strongBullets
//       ),

//     repetitiveBullets:
//       uniqueStrings(
//         repetitiveBullets
//       ),

//     relevanceIssues: [],

//     score: clampATSScore(
//       score,
//       0,
//       getCategoryMaxScore(
//         "experience"
//       )
//     ),

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // ACTION VERB ANALYSIS
// // ============================================================

// export const analyzeActionVerbs = (
//   resume: ATSResume
// ): ATSActionVerbAnalysis => {
//   const bullets =
//     getExperienceBullets(
//       resume
//     );

//   const bulletsWithActionVerbs =
//     bullets.filter(
//       containsActionVerb
//     );

//   const detectedVerbs =
//     bulletsWithActionVerbs.map(
//       (bullet) =>
//         normalizeText(
//           bullet
//         ).split(" ")[0]
//     );

//   const verbFrequency =
//     new Map<string, number>();

//   for (const verb of detectedVerbs) {
//     verbFrequency.set(
//       verb,
//       (verbFrequency.get(verb) ??
//         0) + 1
//     );
//   }

//   const repeatedVerbs =
//     Array.from(
//       verbFrequency.entries()
//     )
//       .filter(
//         ([, count]) =>
//           count >= 3
//       )
//       .map(
//         ([verb]) => verb
//       );

//   const weakOpenings =
//     bullets.filter(
//       (bullet) =>
//         !containsActionVerb(
//           bullet
//         )
//     );

//   const coverage =
//     bullets.length === 0
//       ? 0
//       : (bulletsWithActionVerbs.length /
//           bullets.length) *
//         100;

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     bullets.length > 0 &&
//     coverage < 50
//   ) {
//     issues.push(
//       "Many bullets do not begin with strong action verbs."
//     );

//     suggestions.push(
//       "Start achievement and responsibility bullets with precise action verbs."
//     );
//   }

//   if (
//     repeatedVerbs.length > 0
//   ) {
//     issues.push(
//       `Repeated action verbs detected: ${repeatedVerbs.join(", ")}.`
//     );

//     suggestions.push(
//       "Use varied action verbs where they accurately describe the work."
//     );
//   }

//   let score =
//     (coverage / 100) *
//     getCategoryMaxScore(
//       "actionVerbs"
//     );

//   if (
//     repeatedVerbs.length > 0
//   ) {
//     score -= 1;
//   }

//   return {
//     totalBullets:
//       bullets.length,

//     bulletsWithActionVerbs:
//       bulletsWithActionVerbs.length,

//     actionVerbCoverage:
//       Number(
//         coverage.toFixed(2)
//       ),

//     detectedVerbs:
//       uniqueStrings(
//         detectedVerbs
//       ),

//     weakOpenings:
//       uniqueStrings(
//         weakOpenings
//       ),

//     repeatedVerbs:
//       uniqueStrings(
//         repeatedVerbs
//       ),

//     score: clampATSScore(
//       score,
//       0,
//       getCategoryMaxScore(
//         "actionVerbs"
//       )
//     ),

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // QUANTIFIED RESULT ANALYSIS
// // ============================================================

// const extractMatches = (
//   regex: RegExp,
//   text: string
// ): string[] => {
//   /**
//    * String.match() avoids manually managing lastIndex
//    * for global regexes.
//    */
//   return text.match(regex) ?? [];
// };

// export const analyzeQuantifiedResults = (
//   resume: ATSResume
// ): ATSQuantifiedResultAnalysis => {
//   const bullets =
//     getExperienceBullets(
//       resume
//     );

//   const allText =
//     bullets.join(" ");

//   const percentages =
//     extractMatches(
//       ATS_METRIC_PATTERNS.percentage,
//       allText
//     );

//   const currencies =
//     extractMatches(
//       ATS_METRIC_PATTERNS.currency,
//       allText
//     );

//   const timeMetrics =
//     extractMatches(
//       ATS_METRIC_PATTERNS.time,
//       allText
//     );

//   const numbers =
//     extractMatches(
//       ATS_METRIC_PATTERNS.impactNumber,
//       allText
//     );

//   const quantifiedBullets =
//     bullets.filter(
//       (bullet) =>
//         extractMatches(
//           ATS_METRIC_PATTERNS.percentage,
//           bullet
//         ).length > 0 ||
//         extractMatches(
//           ATS_METRIC_PATTERNS.currency,
//           bullet
//         ).length > 0 ||
//         extractMatches(
//           ATS_METRIC_PATTERNS.time,
//           bullet
//         ).length > 0 ||
//         extractMatches(
//           ATS_METRIC_PATTERNS.impactNumber,
//           bullet
//         ).length > 0
//     ).length;

//   const metricCoverage =
//     bullets.length === 0
//       ? 0
//       : (quantifiedBullets /
//           bullets.length) *
//         100;

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     bullets.length > 0 &&
//     quantifiedBullets === 0
//   ) {
//     issues.push(
//       "No measurable impact was detected."
//     );

//     suggestions.push(
//       "Add measurable outcomes such as growth, speed, scale, users, revenue or efficiency."
//     );
//   } else if (
//     metricCoverage < 30
//   ) {
//     suggestions.push(
//       "Add measurable outcomes to more experience bullets."
//     );
//   }

//   const score =
//     (metricCoverage / 100) *
//     getCategoryMaxScore(
//       "quantifiedResults"
//     );

//   return {
//     totalBullets:
//       bullets.length,

//     quantifiedBullets,

//     percentages:
//       uniqueStrings(
//         percentages
//       ),

//     numbers:
//       uniqueStrings(
//         numbers
//       ),

//     currencies:
//       uniqueStrings(
//         currencies
//       ),

//     timeMetrics:
//       uniqueStrings(
//         timeMetrics
//       ),

//     performanceMetrics:
//       uniqueStrings([
//         ...percentages,
//         ...numbers,
//       ]),

//     metricCoverage:
//       Number(
//         metricCoverage.toFixed(2)
//       ),

//     score: clampATSScore(
//       score,
//       0,
//       getCategoryMaxScore(
//         "quantifiedResults"
//       )
//     ),

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // ACHIEVEMENT ANALYSIS
// // ============================================================

// export const analyzeAchievements = (
//   resume: ATSResume
// ): ATSAchievementAnalysis => {
//   const achievements = [
//     ...(resume.achievements ?? []),
//     ...(resume.experience ?? []).flatMap(
//       (item) =>
//         item.achievements ?? []
//     ),
//     ...(resume.internships ?? []).flatMap(
//       (item) =>
//         item.achievements ?? []
//     ),
//   ].filter(Boolean);

//   const quantifiedAchievements =
//     achievements.filter(
//       containsMetric
//     );

//   const impactStatements =
//     achievements.filter(
//       (achievement) =>
//         containsActionVerb(
//           achievement
//         ) ||
//         containsMetric(
//           achievement
//         )
//     );

//   const weakAchievements =
//     achievements.filter(
//       isWeakBullet
//     );

//   const strongAchievements =
//     achievements.filter(
//       (achievement) =>
//         containsActionVerb(
//           achievement
//         ) &&
//         containsMetric(
//           achievement
//         )
//     );

//   const targetRole =
//     cleanText(
//       resume.targetRole
//     );

//   const roleAchievementSignals =
//     targetRole
//       ? getRoleAchievementSignals(
//           targetRole
//         )
//       : [];

//   const roleRelevantAchievements =
//     roleAchievementSignals.length > 0
//       ? achievements.filter(
//           (achievement) =>
//             roleAchievementSignals.some(
//               (signal) =>
//                 containsNormalizedPhrase(
//                   achievement,
//                   signal
//                 )
//             )
//         )
//       : [];

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     achievements.length === 0
//   ) {
//     suggestions.push(
//       "Add meaningful achievements where you have measurable results."
//     );
//   }

//   if (
//     achievements.length > 0 &&
//     quantifiedAchievements.length === 0
//   ) {
//     suggestions.push(
//       "Quantify important achievements with measurable outcomes."
//     );
//   }

//   if (
//     hasRoleBenchmark(targetRole) &&
//     achievements.length > 0 &&
//     roleAchievementSignals.length > 0 &&
//     roleRelevantAchievements.length === 0
//   ) {
//     suggestions.push(
//       `Emphasize measurable achievements relevant to ${targetRole}, such as ${roleAchievementSignals.slice(0, 3).join(", ")}.`
//     );
//   }

//   return {
//     totalAchievements:
//       achievements.length,

//     quantifiedAchievements:
//       quantifiedAchievements.length,

//     impactStatements:
//       impactStatements.length,

//     weakAchievements:
//       uniqueStrings(
//         weakAchievements
//       ),

//     strongAchievements:
//       uniqueStrings(
//         strongAchievements
//       ),

//     score: 0,

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // PROJECT ANALYSIS
// // ============================================================

// export const analyzeProjects = (
//   resume: ATSResume
// ): ATSProjectAnalysis => {
//   const projects =
//     resume.projects ?? [];

//   const projectsWithTechnologies =
//     projects.filter(
//       (project) =>
//         (project.technologies ??
//           []).length > 0
//     ).length;

//   const projectsWithDescription =
//     projects.filter(
//       (project) =>
//         cleanText(
//           project.description
//         ).length > 0
//     ).length;

//   const projectsWithLinks =
//     projects.filter(
//       (project) =>
//         Boolean(
//           cleanText(
//             project.github
//           )
//         ) ||
//         Boolean(
//           cleanText(
//             project.link
//           )
//         )
//     ).length;

//   const projectsWithImpact =
//     projects.filter(
//       (project) =>
//         containsMetric(
//           cleanText(
//             project.description
//           )
//         )
//     ).length;

//   const projectsWithMetrics =
//     projectsWithImpact;

//   const weakProjects =
//     projects
//       .filter(
//         (project) =>
//           !cleanText(
//             project.description
//           )
//       )
//       .map(
//         (project) =>
//           cleanText(
//             project.title
//           )
//       );

//   const strongProjects =
//     projects
//       .filter(
//         (project) =>
//           cleanText(
//             project.description
//           ) &&
//           (project.technologies ??
//             []).length > 0 &&
//           containsMetric(
//             cleanText(
//               project.description
//             )
//           )
//       )
//       .map(
//         (project) =>
//           cleanText(
//             project.title
//           )
//       );

//   const targetRole =
//     cleanText(
//       resume.targetRole
//     );

//   const roleProjectSignals =
//     targetRole
//       ? getRoleProjectSignals(
//           targetRole
//         )
//       : [];

//   const roleRelevantProjects =
//     roleProjectSignals.length > 0
//       ? projects.filter(
//           (project) =>
//             roleProjectSignals.some(
//               (signal) =>
//                 containsNormalizedPhrase(
//                   [
//                     project.title,
//                     project.role,
//                     project.description,
//                     ...(project.technologies ?? []),
//                   ]
//                     .filter(Boolean)
//                     .join(" "),
//                   signal
//                 )
//             )
//         )
//       : [];

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     projects.length > 0 &&
//     projectsWithDescription <
//       projects.length
//   ) {
//     issues.push(
//       "Some projects do not have descriptions."
//     );
//   }

//   if (
//     projects.length > 0 &&
//     projectsWithTechnologies <
//       projects.length
//   ) {
//     suggestions.push(
//       "Add relevant technologies to projects."
//     );
//   }

//   if (
//     projects.length > 0 &&
//     projectsWithImpact === 0
//   ) {
//     suggestions.push(
//       "Describe project outcomes or measurable impact where possible."
//     );
//   }

//   if (
//     hasRoleBenchmark(targetRole) &&
//     projects.length > 0 &&
//     roleProjectSignals.length > 0 &&
//     roleRelevantProjects.length === 0
//   ) {
//     suggestions.push(
//       `Highlight projects that genuinely demonstrate ${targetRole}-relevant work such as ${roleProjectSignals.slice(0, 3).join(", ")}.`
//     );
//   }

//   return {
//     projectCount:
//       projects.length,

//     projectsWithTechnologies,

//     projectsWithDescription,

//     projectsWithLinks,

//     projectsWithImpact,

//     projectsWithMetrics,

//     weakProjects:
//       uniqueStrings(
//         weakProjects
//       ),

//     strongProjects:
//       uniqueStrings(
//         strongProjects
//       ),

//     score: 0,

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // EDUCATION ANALYSIS
// // ============================================================

// export const analyzeEducation = (
//   resume: ATSResume
// ): ATSEducationAnalysis => {
//   const education =
//     resume.education ?? [];

//   const completeEntries =
//     education.filter(
//       (entry) =>
//         Boolean(
//           cleanText(
//             entry.institution
//           )
//         ) &&
//         Boolean(
//           cleanText(
//             entry.degree
//           )
//         ) &&
//         Boolean(
//           cleanText(
//             entry.fieldOfStudy
//           )
//         )
//     ).length;

//   const incompleteEntries =
//     education.length -
//     completeEntries;

//   const hasDegree =
//     education.some(
//       (entry) =>
//         Boolean(
//           cleanText(
//             entry.degree
//           )
//         )
//     );

//   const hasInstitution =
//     education.some(
//       (entry) =>
//         Boolean(
//           cleanText(
//             entry.institution
//           )
//         )
//     );

//   const hasFieldOfStudy =
//     education.some(
//       (entry) =>
//         Boolean(
//           cleanText(
//             entry.fieldOfStudy
//           )
//         )
//     );

//   const hasDates =
//     education.some(
//       (entry) =>
//         Boolean(
//           entry.startYear
//         ) ||
//         Boolean(
//           entry.endYear
//         )
//     );

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (education.length === 0) {
//     suggestions.push(
//       "Add education details when relevant to the role."
//     );
//   }

//   if (incompleteEntries > 0) {
//     issues.push(
//       "Some education entries are incomplete."
//     );
//   }

//   return {
//     educationCount:
//       education.length,

//     completeEntries,

//     incompleteEntries,

//     hasDegree,

//     hasInstitution,

//     hasFieldOfStudy,

//     hasDates,

//     score: 0,

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // FORMATTING ANALYSIS
// // ============================================================

// export const analyzeFormatting = (
//   resume: ATSResume
// ): ATSFormattingAnalysis => {
//   const sections =
//     resume.sections ?? [];

//   const hasContactInfo =
//     Boolean(
//       resume.personalInfo
//     );

//   const hasStandardSections =
//   sections.some((section) => {
//     const sectionName =
//       normalizeText(
//         section.type ??
//           section.id ??
//           ""
//       );

//     return ATS_STANDARD_SECTIONS.some(
//       (standardSection) =>
//         normalizeText(
//           standardSection
//         ) === sectionName
//     );
//   });

//   const hasUnusualSectionNames =
//     sections.some(
//       (section) => {
//         const type =
//           normalizeText(
//             section.type ??
//               section.id ??
//               ""
//           );

//         return (
//           Boolean(type) &&
//           !ATS_STANDARD_SECTIONS.some(
//             (standard) =>
//               normalizeText(
//                 standard
//               ) === type
//           ) &&
//           type !== "personalinfo" &&
//           type !== "custom"
//         );
//       }
//     );

//   const hasEmptySections =
//     sections.some(
//       (section) =>
//         section.enabled !== false &&
//         (
//           !section.type &&
//           !section.id
//         )
//     );

//   const hasExcessiveLinks =
//     [
//       resume.personalInfo?.linkedIn,
//       resume.personalInfo?.github,
//       resume.personalInfo?.portfolio,
//       ...(resume.projects ?? []).flatMap(
//         (project) => [
//           project.github,
//           project.link,
//         ]
//       ),
//     ].filter(Boolean).length >
//     10;

//   const allText =
//     JSON.stringify(resume);

//   const suspiciousCharacters =
//     /[�]/.test(allText);

//   const hasPotentialParserIssues =
//     suspiciousCharacters ||
//     hasUnusualSectionNames;

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     hasUnusualSectionNames
//   ) {
//     issues.push(
//       "Some non-standard section names may reduce parser consistency."
//     );

//     suggestions.push(
//       "Prefer conventional section headings where possible."
//     );
//   }

//   if (
//     hasExcessiveLinks
//   ) {
//     issues.push(
//       "An unusually high number of links was detected."
//     );

//     suggestions.push(
//       "Keep only relevant professional links."
//     );
//   }

//   if (suspiciousCharacters) {
//     issues.push(
//       "Suspicious replacement characters were detected."
//     );

//     suggestions.push(
//       "Remove corrupted or unsupported characters."
//     );
//   }

//   let score =
//     getCategoryMaxScore(
//       "formatting"
//     );

//   if (
//     hasUnusualSectionNames
//   ) {
//     score -= 3;
//   }

//   if (
//     hasExcessiveLinks
//   ) {
//     score -= 2;
//   }

//   if (
//     suspiciousCharacters
//   ) {
//     score -= 3;
//   }

//   return {
//     hasContactInfo,

//     hasStandardSections,

//     hasUnusualSectionNames,

//     hasEmptySections,

//     hasExcessiveLinks,

// hasSuspiciousCharacters:
//   suspiciousCharacters,

//     hasPotentialParserIssues,

//     hasPotentialColumnRisk: false,

//     hasPotentialTableRisk: false,

//     score: clampATSScore(
//       score,
//       0,
//       getCategoryMaxScore(
//         "formatting"
//       )
//     ),

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };

// // ============================================================
// // CATEGORY RESULT BUILDING
// // ============================================================

// const buildCategoryResults = (
//   analysis: {
//     contact: ATSContactAnalysis;
//     sections: ATSSectionAnalysis;
//     skills: ATSSkillsAnalysis;
//     keywords: ATSKeywordAnalysis;
//     experience: ATSExperienceAnalysis;
//     actionVerbs: ATSActionVerbAnalysis;
//     quantifiedResults: ATSQuantifiedResultAnalysis;
//     formatting: ATSFormattingAnalysis;
//   }
// ): ATSCategoryResult[] => {
//   return [
//     makeCategoryResult(
//       "contact",
//       analysis.contact.score,
//       "Evaluates essential professional contact information.",
//       analysis.contact.issues,
//       analysis.contact.suggestions
//     ),

//     makeCategoryResult(
//       "sections",
//       analysis.sections.score,
//       "Evaluates the completeness and organization of important resume sections.",
//       analysis.sections.issues,
//       analysis.sections.suggestions
//     ),

//     makeCategoryResult(
//       "skills",
//       analysis.skills.score,
//       "Evaluates the breadth and organization of listed skills.",
//       analysis.skills.issues,
//       analysis.skills.suggestions
//     ),

//     makeCategoryResult(
//       "keywords",
//       analysis.keywords.score,
//       "Evaluates keyword coverage and relevance.",
//       analysis.keywords.issues,
//       analysis.keywords.suggestions
//     ),

//     makeCategoryResult(
//       "experience",
//       analysis.experience.score,
//       "Evaluates experience content and achievement quality.",
//       analysis.experience.issues,
//       analysis.experience.suggestions
//     ),

//     makeCategoryResult(
//       "actionVerbs",
//       analysis.actionVerbs.score,
//       "Evaluates strong and varied action verbs.",
//       analysis.actionVerbs.issues,
//       analysis.actionVerbs.suggestions
//     ),

//     makeCategoryResult(
//       "quantifiedResults",
//       analysis.quantifiedResults.score,
//       "Evaluates measurable professional impact.",
//       analysis.quantifiedResults.issues,
//       analysis.quantifiedResults.suggestions
//     ),

//     makeCategoryResult(
//       "formatting",
//       analysis.formatting.score,
//       "Evaluates potential ATS parsing and formatting risks.",
//       analysis.formatting.issues,
//       analysis.formatting.suggestions
//     ),
//   ].filter((result) => {
//     const category =
//       getCategory(
//         result.category
//       );

//     return (
//       category?.enabled === true
//     );
//   });
// };

// // ============================================================
// // GENERIC SCORE CALCULATION
// // ============================================================

// const calculateOverallScore = (
//   categories: ATSCategoryResult[]
// ): number => {
//   const totalMax =
//     categories.reduce(
//       (sum, category) =>
//         sum + category.maxScore,
//       0
//     );

//   const totalScore =
//     categories.reduce(
//       (sum, category) =>
//         sum + category.score,
//       0
//     );

//   if (totalMax <= 0) {
//     return 0;
//   }

//   return Number(
//     (
//       (totalScore / totalMax) *
//       100
//     ).toFixed(2)
//   );
// };

// // ============================================================
// // RECOMMENDATIONS
// // ============================================================

// const buildRecommendations = (
//   categories: ATSCategoryResult[]
// ): ATSRecommendation[] => {
//   const recommendations: ATSRecommendation[] =
//     [];

//   for (const category of categories) {
//     if (
//       category.status ===
//       "excellent"
//     ) {
//       continue;
//     }

//     const priority =
//       category.percentage < 40
//         ? "high"
//         : category.percentage < 60
//           ? "medium"
//           : "low";

//     for (const issue of category.issues) {
//       recommendations.push({
//         title:
//           `${category.title} needs improvement`,

//         description:
//           issue,

//         priority,

//         category:
//           category.category,

//         impact: Math.max(
//           0,
//           category.maxScore -
//             category.score
//         ),

//         actionable: true,

//         suggestedFix:
//           category.suggestions[0],
//       });
//     }
//   }

//   return recommendations
//     .slice(0, 10);
// };

// // ============================================================
// // STRENGTHS
// // ============================================================

// const buildStrengths = (
//   categories: ATSCategoryResult[]
// ): string[] => {
//   return categories
//     .filter(
//       (category) =>
//         category.status ===
//           "excellent" ||
//         category.status ===
//           "good"
//     )
//     .map(
//       (category) =>
//         `${category.title}: ${category.summary}`
//     )
//     .slice(0, 8);
// };

// // ============================================================
// // WEAKNESSES
// // ============================================================

// const buildWeaknesses = (
//   categories: ATSCategoryResult[]
// ): string[] => {
//   return categories
//     .filter(
//       (category) =>
//         category.status ===
//           "poor" ||
//         category.status ===
//           "needs-improvement"
//     )
//     .flatMap(
//       (category) =>
//         category.issues.map(
//           (issue) =>
//             `${category.title}: ${issue}`
//         )
//     )
//     .slice(0, 10);
// };

// // ============================================================
// // MAIN ATS SCORER
// // ============================================================

// /**
//  * Main rule-based ATS analysis.
//  *
//  * IMPORTANT:
//  *
//  * This function does NOT call Gemini.
//  * It does NOT access MongoDB.
//  * It does NOT modify the resume.
//  *
//  * It only performs deterministic analysis.
//  */
// export const analyzeResumeATS = (
//   resume: ATSResume
// ): ATSRuleAnalysis => {
//   const contact =
//     analyzeContact(
//       resume
//     );

//   const sections =
//     analyzeSections(
//       resume
//     );

//   const skills =
//     analyzeSkills(
//       resume
//     );

//   /**
//    * General ATS v1 does not have a JD yet.
//    *
//    * Keyword analysis therefore uses resume-internal
//    * terminology for now.
//    *
//    * JD-specific keyword matching will be implemented
//    * separately in the Job Matcher layer.
//    */
//   const keywordAnalysis =
//     analyzeResumeKeywords(
//       resume
//     );

//   const experience =
//     analyzeExperience(
//       resume
//     );

//   const actionVerbs =
//     analyzeActionVerbs(
//       resume
//     );

//   const quantifiedResults =
//     analyzeQuantifiedResults(
//       resume
//     );

//   const achievements =
//     analyzeAchievements(
//       resume
//     );

//   const projects =
//     analyzeProjects(
//       resume
//     );

//   const education =
//     analyzeEducation(
//       resume
//     );

//   const formatting =
//     analyzeFormatting(
//       resume
//     );

//   /**
//    * Optional detailed analyses are calculated here,
//    * but they are not yet independent scoring categories.
//    *
//    * We will add their category configuration only when
//    * we intentionally expand the scoring model.
//    */

//   const categories =
//     buildCategoryResults({
//       contact,
//       sections,
//       skills,
//       keywords:
//         keywordAnalysis,
//       experience,
//       actionVerbs,
//       quantifiedResults,
//       formatting,
//     });

//   const overallScore =
//     calculateOverallScore(
//       categories
//     );

//   const recommendations =
//     buildRecommendations(
//       categories
//     );

//   const strengths =
//     buildStrengths(
//       categories
//     );

//   const weaknesses =
//     buildWeaknesses(
//       categories
//     );

//   const breakdown: ATSBreakdown =
//     {};

//   for (const category of categories) {
//     breakdown[
//       category.category
//     ] = category.score;
//   }

//   return {
//     overallScore,

//     breakdown,

//     categories,

//     contact,

//     sections,

//     skills,

//     keywords:
//       keywordAnalysis,

//     experience,

//     actionVerbs,

//     quantifiedResults,

//     achievements,

//     projects,

//     education,

//     formatting,

//     strengths,

//     weaknesses,

//     recommendations,
//   };
// };

// // ============================================================
// // GENERAL RESUME KEYWORD ANALYSIS
// // ============================================================

// /**
//  * General ATS keyword analysis.
//  *
//  * IMPORTANT:
//  *
//  * This is NOT the final JD keyword matcher.
//  *
//  * Without a Job Description, we cannot honestly say that a
//  * keyword is "missing from the job".
//  *
//  * Therefore this layer checks:
//  * - important technical terms already present
//  * - repeated terminology
//  * - skill coverage
//  *
//  * JD-specific matching comes later.
//  */
// const analyzeResumeKeywords = (
//   resume: ATSResume
// ): ATSKeywordAnalysis => {
//   const targetRole =
//     cleanText(
//       resume.targetRole
//     );

//   const roleMatchInfo =
//     targetRole
//       ? getRoleMatchInfo(
//           targetRole
//         )
//       : null;

//   const skillNames =
//     flattenStrings(
//       (resume.skills ?? []).map(
//         (category) =>
//           category.skills ?? []
//       )
//     );

//   const technologies =
//     (resume.projects ?? []).flatMap(
//       (project) =>
//         project.technologies ?? []
//     );

//   const experienceText =
//     getExperienceBullets(
//       resume
//     );

//   const projectDescriptions =
//     (resume.projects ?? []).map(
//       (project) =>
//         project.description ?? ""
//     );

//   const textSources = [
//     targetRole,
//     resume.summary ?? "",
//     ...skillNames,
//     ...technologies,
//     ...experienceText,
//     ...projectDescriptions,
//   ];

//   const combinedText =
//     textSources.join(" ");

//   const normalized =
//     normalizeText(
//       combinedText
//     );

//   const roleBenchmarkAvailable =
//     hasRoleBenchmark(
//       targetRole
//     );

//   const roleKeywordPool =
//     roleBenchmarkAvailable
//       ? getRoleKeywordPool(
//           targetRole
//         )
//       : [];

//   const keywordCandidates =
//     uniqueStrings([
//       ...skillNames,
//       ...technologies,
//       ...roleKeywordPool,
//     ]);

//   const keywordFrequency:
//     Record<string, number> =
//     {};

//   const matchedKeywords:
//     string[] = [];

//   for (const keyword of keywordCandidates) {
//     const normalizedKeyword =
//       normalizeText(
//         keyword
//       );

//     if (!normalizedKeyword) {
//       continue;
//     }

//     const escaped =
//       normalizedKeyword.replace(
//         /[.*+?^${}()|[\]\\]/g,
//         "\\$&"
//       );

//     const regex =
//       new RegExp(
//         `\\b${escaped}\\b`,
//         "gi"
//       );

//     const matches =
//       normalized.match(regex) ??
//       [];

//     const frequency =
//       matches.length;

//     keywordFrequency[
//       keyword
//     ] = frequency;

//     if (frequency > 0) {
//       matchedKeywords.push(
//         keyword
//       );
//     }
//   }

//   const roleMatchedKeywords =
//     roleKeywordPool.filter(
//       (keyword) =>
//         containsNormalizedPhrase(
//           combinedText,
//           keyword
//         )
//     );

//   const roleMissingKeywords =
//     roleKeywordPool.filter(
//       (keyword) =>
//         !containsNormalizedPhrase(
//           combinedText,
//           keyword
//         )
//     );

//   const missingKeywords: string[] =
//     [];

//   // Role benchmark is the primary source of
//   // missing keywords when a known role is supplied.
//   if (
//     roleBenchmarkAvailable
//   ) {
//     missingKeywords.push(
//       ...roleMissingKeywords
//     );
//   }

//   // Also identify skills that are listed in
//   // the structured skill section but absent
//   // from the actual resume text.
//   const skillsPresentInText =
//     uniqueStrings(
//       skillNames
//     ).filter(
//       (skill) =>
//         containsNormalizedPhrase(
//           combinedText,
//           skill
//         )
//     );

//   for (const skill of skillNames) {
//     if (
//       !skillsPresentInText.some(
//         (existing) =>
//           normalizeText(
//             existing
//           ) ===
//           normalizeText(
//             skill
//           )
//       )
//     ) {
//       missingKeywords.push(
//         skill
//       );
//     }
//   }

//   const roleCoverage =
//     roleKeywordPool.length === 0
//       ? 0
//       : (
//           roleMatchedKeywords.length /
//           roleKeywordPool.length
//         ) * 100;

//   const keywordCoverage =
//     keywordCandidates.length === 0
//       ? 0
//       : (
//           matchedKeywords.length /
//           keywordCandidates.length
//         ) * 100;

//   const issues: string[] = [];
//   const suggestions: string[] = [];

//   if (
//     keywordCandidates.length === 0
//   ) {
//     issues.push(
//       "Very few role-related keywords were detected."
//     );

//     suggestions.push(
//       "Add relevant skills and technologies that genuinely match your target role."
//     );
//   }

//   if (
//     roleBenchmarkAvailable &&
//     roleMatchInfo?.matchedProfile
//   ) {
//     suggestions.push(
//       `Role benchmark matched: ${roleMatchInfo.matchedProfile} (${roleMatchInfo.matchScore}% title match).`
//     );
//   }

//   if (
//     roleBenchmarkAvailable &&
//     roleKeywordPool.length > 0 &&
//     roleCoverage < 50
//   ) {
//     issues.push(
//       `Only ${Number(roleCoverage.toFixed(1))}% of benchmark keywords for ${targetRole} are present.`
//     );

//     suggestions.push(
//       `Review missing ${targetRole} keywords and add only those that accurately reflect your experience.`
//     );
//   }

//   if (
//     roleBenchmarkAvailable &&
//     roleMissingKeywords.length > 0
//   ) {
//     suggestions.push(
//       `Prioritize relevant missing role terms such as: ${roleMissingKeywords.slice(0, 5).join(", ")}.`
//     );
//   }

//   const baseMaxScore =
//     getCategoryMaxScore(
//       "keywords"
//     );

//   let score = 0;

//   if (
//     roleBenchmarkAvailable &&
//     roleKeywordPool.length > 0
//   ) {
//     // Role benchmark is the primary signal.
//     // General keyword coverage provides a smaller
//     // secondary signal.
//     score =
//       (
//         (Math.min(
//           roleCoverage,
//           100
//         ) / 100) * 0.7 +
//         (Math.min(
//           keywordCoverage,
//           100
//         ) / 100) * 0.3
//       ) * baseMaxScore;
//   } else {
//     score =
//       (keywordCoverage / 100) *
//       baseMaxScore;
//   }

//   return {
//     keywords:
//       uniqueStrings(
//         keywordCandidates
//       ),

//     matchedKeywords:
//       uniqueStrings(
//         matchedKeywords
//       ),

//     missingKeywords:
//       uniqueStrings(
//         missingKeywords
//       ),

//     keywordFrequency,

//     keywordCoverage:
//       Number(
//         keywordCoverage.toFixed(2)
//       ),

//     keywordDensity: undefined,

//     stuffingDetected: false,

//     score: clampATSScore(
//       score,
//       0,
//       baseMaxScore
//     ),

//     issues: uniqueStrings(
//       issues
//     ),

//     suggestions:
//       uniqueStrings(
//         suggestions
//       ),
//   };
// };



// ============================================================
// ROLE INTELLIGENCE ENGINE
// ============================================================
//
// Purpose:
// - Maintain role-specific ATS benchmarks
// - Resolve free-text target roles safely
// - Support compound role titles
// - Support known + custom roles
// - Keep scoring configuration-driven
// - Avoid substring-based role misclassification
//
// IMPORTANT:
// targetRole supplied by the ATS request is the source of truth
// for the CURRENT analysis.
// This file does not modify the Resume document.
// ============================================================

export type RoleFamily =
  | "frontend"
  | "backend"
  | "fullstack"
  | "java"
  | "python"
  | "ai-ml"
  | "data"
  | "devops"
  | "cloud"
  | "qa"
  | "mobile"
  | "ui-ux"
  | "product"
  | "marketing"
  | "finance"
  | "hr"
  | "general";

// ============================================================
// SENIORITY
// ============================================================

export interface RoleSenioritySignals {
  entry: string[];
  mid: string[];
  senior: string[];
  lead: string[];
}

const DEFAULT_SENIORITY_SIGNALS: RoleSenioritySignals = {
  entry: [
    "built",
    "developed",
    "implemented",
    "created",
    "integrated",
  ],

  mid: [
    "designed",
    "optimized",
    "refactored",
    "owned",
    "automated",
  ],

  senior: [
    "architected",
    "scaled",
    "led",
    "drove",
    "established",
  ],

  lead: [
    "technical leadership",
    "engineering strategy",
    "architecture",
    "mentored engineers",
    "cross-functional leadership",
  ],
};

// ============================================================
// ROLE PROFILE
// ============================================================

export interface RoleIntelligenceProfile {
  id: string;

  name: string;

  family: RoleFamily;

  aliases: string[];

  coreSkills: string[];

  supportingSkills: string[];

  tools: string[];

  concepts: string[];

  responsibilities: string[];

  keywords: string[];

  senioritySignals: RoleSenioritySignals;

  preferredSections: string[];

  projectSignals: string[];

  achievementSignals: string[];

  benchmarkAvailable: boolean;
}

// ============================================================
// HELPERS
// ============================================================

const unique = (
  values: string[]
): string[] => {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
};

const createSenioritySignals = (
  overrides: Partial<RoleSenioritySignals> = {}
): RoleSenioritySignals => {
  return {
    entry: unique([
      ...DEFAULT_SENIORITY_SIGNALS.entry,
      ...(overrides.entry ?? []),
    ]),

    mid: unique([
      ...DEFAULT_SENIORITY_SIGNALS.mid,
      ...(overrides.mid ?? []),
    ]),

    senior: unique([
      ...DEFAULT_SENIORITY_SIGNALS.senior,
      ...(overrides.senior ?? []),
    ]),

    lead: unique([
      ...DEFAULT_SENIORITY_SIGNALS.lead,
      ...(overrides.lead ?? []),
    ]),
  };
};

// ============================================================
// FRONTEND DEVELOPER
// ============================================================

const FRONTEND_DEVELOPER: RoleIntelligenceProfile = {
  id: "frontend-developer",

  name: "Frontend Developer",

  family: "frontend",

  aliases: [
    "frontend developer",
    "front end developer",
    "frontend engineer",
    "front end engineer",
    "react developer",
    "react engineer",
    "ui developer",
    "web developer",
  ],

  coreSkills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
  ],

  supportingSkills: [
    "Next.js",
    "Redux",
    "Redux Toolkit",
    "Tailwind CSS",
    "Responsive Design",
    "REST API",
    "Accessibility",
    "Web Performance",
    "Testing",
    "Git",
  ],

  tools: [
    "Vite",
    "Webpack",
    "Babel",
    "Jest",
    "Vitest",
    "Cypress",
    "Playwright",
    "npm",
    "Yarn",
    "Git",
    "GitHub",
  ],

  concepts: [
    "component architecture",
    "state management",
    "responsive design",
    "accessibility",
    "performance optimization",
    "browser compatibility",
    "api integration",
    "authentication",
    "authorization",
    "web security",
  ],

  responsibilities: [
    "build user interfaces",
    "develop reusable components",
    "integrate APIs",
    "implement responsive layouts",
    "optimize frontend performance",
    "fix UI bugs",
    "write maintainable frontend code",
    "collaborate with backend developers",
  ],

  keywords: [
    "frontend",
    "web application",
    "user interface",
    "ui",
    "react",
    "javascript",
    "typescript",
    "html",
    "css",
    "rest api",
    "responsive",
    "performance",
    "accessibility",
    "git",
    "testing",
  ],

  senioritySignals:
    createSenioritySignals(),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "web application",
    "dashboard",
    "e-commerce",
    "saas",
    "responsive",
    "react application",
    "api integration",
    "authentication",
    "performance",
  ],

  achievementSignals: [
    "performance improvement",
    "load time reduction",
    "conversion improvement",
    "user growth",
    "latency reduction",
    "accessibility improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// BACKEND DEVELOPER
// ============================================================

const BACKEND_DEVELOPER: RoleIntelligenceProfile = {
  id: "backend-developer",

  name: "Backend Developer",

  family: "backend",

  aliases: [
    "backend developer",
    "back end developer",
    "backend engineer",
    "back end engineer",
    "server side developer",
    "node.js developer",
    "node developer",
  ],

  coreSkills: [
    "Node.js",
    "Express",
    "REST API",
    "Databases",
    "Authentication",
  ],

  supportingSkills: [
    "TypeScript",
    "JavaScript",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Testing",
    "Git",
    "API Design",
  ],

  tools: [
    "Postman",
    "Docker",
    "Git",
    "GitHub",
    "npm",
    "Jest",
    "Redis",
    "MongoDB Atlas",
  ],

  concepts: [
    "REST",
    "API architecture",
    "authentication",
    "authorization",
    "JWT",
    "RBAC",
    "database design",
    "caching",
    "error handling",
    "logging",
    "security",
    "scalability",
    "performance",
  ],

  responsibilities: [
    "design backend services",
    "build APIs",
    "design database schemas",
    "implement authentication",
    "implement authorization",
    "integrate third-party services",
    "optimize backend performance",
    "write automated tests",
    "debug production issues",
  ],

  keywords: [
    "backend",
    "server",
    "api",
    "rest",
    "node.js",
    "express",
    "database",
    "mongodb",
    "postgresql",
    "authentication",
    "authorization",
    "jwt",
    "docker",
    "redis",
    "git",
  ],

  senioritySignals:
    createSenioritySignals(),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "rest api",
    "authentication",
    "database",
    "microservices",
    "backend service",
    "payment integration",
    "real-time application",
    "scalable system",
  ],

  achievementSignals: [
    "latency reduction",
    "throughput improvement",
    "response time reduction",
    "cost reduction",
    "uptime improvement",
    "scalability improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// FULL STACK DEVELOPER
// ============================================================

const FULLSTACK_DEVELOPER: RoleIntelligenceProfile = {
  id: "fullstack-developer",

  name: "Full Stack Developer",

  family: "fullstack",

  aliases: [
    "full stack developer",
    "full-stack developer",
    "fullstack developer",
    "full stack engineer",
    "full-stack engineer",
    "mern developer",
    "mean developer",
  ],

  coreSkills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "REST API",
    "Database",
  ],

  supportingSkills: [
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Next.js",
    "HTML",
    "CSS",
    "Git",
    "Docker",
    "Authentication",
    "Testing",
  ],

  tools: [
    "Vite",
    "npm",
    "Git",
    "GitHub",
    "Docker",
    "Postman",
    "Jest",
    "MongoDB Atlas",
  ],

  concepts: [
    "frontend development",
    "backend development",
    "api integration",
    "database design",
    "authentication",
    "authorization",
    "deployment",
    "web security",
    "performance",
    "scalability",
  ],

  responsibilities: [
    "develop frontend applications",
    "develop backend services",
    "integrate APIs",
    "design databases",
    "implement authentication",
    "deploy applications",
    "debug end-to-end issues",
    "build complete web applications",
  ],

  keywords: [
    "full stack",
    "react",
    "node.js",
    "express",
    "javascript",
    "typescript",
    "mongodb",
    "rest api",
    "html",
    "css",
    "git",
    "docker",
    "authentication",
  ],

  senioritySignals:
    createSenioritySignals(),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
  ],

  projectSignals: [
    "full stack application",
    "saas",
    "e-commerce",
    "dashboard",
    "authentication",
    "payment integration",
    "rest api",
  ],

  achievementSignals: [
    "performance improvement",
    "user growth",
    "conversion improvement",
    "latency reduction",
    "cost reduction",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// JAVA DEVELOPER
// ============================================================

const JAVA_DEVELOPER: RoleIntelligenceProfile = {
  id: "java-developer",

  name: "Java Developer",

  family: "java",

  aliases: [
    "java developer",
    "java engineer",
    "java backend developer",
    "java backend engineer",
    "spring boot developer",
  ],

  coreSkills: [
    "Java",
    "Spring Boot",
    "REST API",
    "SQL",
    "Object-Oriented Programming",
  ],

  supportingSkills: [
    "Spring",
    "Hibernate",
    "JPA",
    "Maven",
    "Gradle",
    "JUnit",
    "Git",
    "Microservices",
    "Docker",
  ],

  tools: [
    "IntelliJ IDEA",
    "Eclipse",
    "Maven",
    "Gradle",
    "Git",
    "GitHub",
    "Postman",
    "Docker",
  ],

  concepts: [
    "OOP",
    "data structures",
    "design patterns",
    "REST",
    "microservices",
    "database design",
    "concurrency",
    "exception handling",
    "security",
    "scalability",
  ],

  responsibilities: [
    "develop Java applications",
    "build REST APIs",
    "implement business logic",
    "design database integrations",
    "write automated tests",
    "debug applications",
    "optimize application performance",
  ],

  keywords: [
    "java",
    "spring boot",
    "spring",
    "rest",
    "sql",
    "hibernate",
    "jpa",
    "maven",
    "junit",
    "microservices",
    "docker",
    "git",
  ],

  senioritySignals:
    createSenioritySignals(),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "spring boot",
    "rest api",
    "microservices",
    "database",
    "enterprise application",
  ],

  achievementSignals: [
    "latency reduction",
    "throughput improvement",
    "performance improvement",
    "cost reduction",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// PYTHON DEVELOPER
// ============================================================

const PYTHON_DEVELOPER: RoleIntelligenceProfile = {
  id: "python-developer",

  name: "Python Developer",

  family: "python",

  aliases: [
    "python developer",
    "python engineer",
    "python backend developer",
    "python backend engineer",
  ],

  coreSkills: [
    "Python",
    "REST API",
    "SQL",
    "Object-Oriented Programming",
  ],

  supportingSkills: [
    "FastAPI",
    "Django",
    "Flask",
    "PostgreSQL",
    "MongoDB",
    "Pytest",
    "Docker",
    "Git",
    "Redis",
  ],

  tools: [
    "PyCharm",
    "VS Code",
    "pip",
    "Poetry",
    "Docker",
    "Git",
    "Postman",
    "Pytest",
  ],

  concepts: [
    "OOP",
    "API development",
    "database design",
    "authentication",
    "testing",
    "async programming",
    "caching",
    "security",
    "scalability",
  ],

  responsibilities: [
    "develop Python applications",
    "build APIs",
    "implement business logic",
    "integrate databases",
    "write tests",
    "debug applications",
    "optimize performance",
  ],

  keywords: [
    "python",
    "fastapi",
    "django",
    "flask",
    "rest api",
    "sql",
    "postgresql",
    "mongodb",
    "pytest",
    "docker",
    "git",
  ],

  senioritySignals:
    createSenioritySignals(),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
  ],

  projectSignals: [
    "api",
    "backend",
    "automation",
    "web application",
    "data processing",
  ],

  achievementSignals: [
    "automation time reduction",
    "performance improvement",
    "latency reduction",
    "cost reduction",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// AI / ML ENGINEER
// ============================================================

const AI_ML_ENGINEER: RoleIntelligenceProfile = {
  id: "ai-ml-engineer",

  name: "AI/ML Engineer",

  family: "ai-ml",

  aliases: [
    "ai engineer",
    "ml engineer",
    "machine learning engineer",
    "artificial intelligence engineer",
    "ai ml engineer",
    "ai/ml engineer",
  ],

  coreSkills: [
    "Python",
    "Machine Learning",
    "Data Structures",
    "Statistics",
    "Model Development",
  ],

  supportingSkills: [
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "SQL",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Git",
  ],

  tools: [
    "Jupyter",
    "MLflow",
    "Docker",
    "Git",
    "GitHub",
    "Google Colab",
    "AWS",
    "Azure",
  ],

  concepts: [
    "supervised learning",
    "unsupervised learning",
    "deep learning",
    "model evaluation",
    "feature engineering",
    "model deployment",
    "data preprocessing",
    "statistics",
    "NLP",
    "computer vision",
    "MLOps",
  ],

  responsibilities: [
    "develop machine learning models",
    "prepare datasets",
    "engineer features",
    "evaluate models",
    "deploy models",
    "monitor model performance",
    "build AI solutions",
    "optimize model performance",
  ],

  keywords: [
    "AI",
    "machine learning",
    "Python",
    "deep learning",
    "NLP",
    "computer vision",
    "TensorFlow",
    "PyTorch",
    "scikit-learn",
    "Pandas",
    "NumPy",
    "MLOps",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "trained",
        "evaluated",
        "preprocessed",
      ],
      mid: [
        "deployed",
        "fine-tuned",
        "experimented",
      ],
      senior: [
        "designed ML architecture",
        "productionized",
        "scaled ML systems",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "publications",
  ],

  projectSignals: [
    "machine learning model",
    "deep learning",
    "NLP",
    "computer vision",
    "prediction",
    "classification",
    "recommendation system",
    "model deployment",
  ],

  achievementSignals: [
    "accuracy improvement",
    "precision improvement",
    "recall improvement",
    "latency reduction",
    "model performance",
    "cost reduction",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// DATA ANALYST
// ============================================================

const DATA_ANALYST: RoleIntelligenceProfile = {
  id: "data-analyst",

  name: "Data Analyst",

  family: "data",

  aliases: [
    "data analyst",
    "business data analyst",
    "reporting analyst",
    "analytics analyst",
    "business analyst data",
  ],

  coreSkills: [
    "SQL",
    "Excel",
    "Data Analysis",
    "Statistics",
    "Data Visualization",
  ],

  supportingSkills: [
    "Python",
    "Pandas",
    "Power BI",
    "Tableau",
    "NumPy",
    "Google Sheets",
  ],

  tools: [
    "Excel",
    "Power BI",
    "Tableau",
    "Jupyter",
    "SQL",
    "Python",
  ],

  concepts: [
    "data cleaning",
    "data transformation",
    "statistical analysis",
    "business intelligence",
    "reporting",
    "dashboarding",
    "data visualization",
    "KPI analysis",
  ],

  responsibilities: [
    "analyze business data",
    "build dashboards",
    "generate reports",
    "identify trends",
    "clean datasets",
    "present insights",
    "support business decisions",
  ],

  keywords: [
    "SQL",
    "Excel",
    "Power BI",
    "Tableau",
    "Python",
    "Pandas",
    "data analysis",
    "data visualization",
    "statistics",
    "dashboard",
    "reporting",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "analyzed",
        "prepared",
        "reported",
      ],
      mid: [
        "automated",
        "presented",
        "owned analytics",
      ],
      senior: [
        "drove insights",
        "established reporting",
        "led analytics",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "dashboard",
    "business intelligence",
    "data analysis",
    "SQL analysis",
    "data visualization",
    "KPI reporting",
  ],

  achievementSignals: [
    "revenue increase",
    "cost reduction",
    "time saved",
    "process improvement",
    "forecast accuracy",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// DEVOPS ENGINEER
// ============================================================

const DEVOPS_ENGINEER: RoleIntelligenceProfile = {
  id: "devops-engineer",

  name: "DevOps Engineer",

  family: "devops",

  aliases: [
    "devops engineer",
    "devops developer",
    "site reliability engineer",
    "platform engineer",
    "sre",
  ],

  coreSkills: [
    "Linux",
    "Git",
    "CI/CD",
    "Docker",
    "Cloud",
  ],

  supportingSkills: [
    "Kubernetes",
    "AWS",
    "Azure",
    "Terraform",
    "Jenkins",
    "GitHub Actions",
    "Monitoring",
    "Networking",
    "Bash",
  ],

  tools: [
    "Docker",
    "Kubernetes",
    "Terraform",
    "Jenkins",
    "GitHub Actions",
    "AWS",
    "Azure",
    "Linux",
    "Prometheus",
    "Grafana",
  ],

  concepts: [
    "CI/CD",
    "infrastructure as code",
    "containerization",
    "orchestration",
    "monitoring",
    "logging",
    "cloud infrastructure",
    "networking",
    "security",
    "high availability",
  ],

  responsibilities: [
    "build deployment pipelines",
    "manage cloud infrastructure",
    "automate deployments",
    "monitor applications",
    "manage containers",
    "maintain production systems",
    "improve reliability",
    "automate infrastructure",
  ],

  keywords: [
    "devops",
    "ci/cd",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "terraform",
    "jenkins",
    "linux",
    "git",
    "monitoring",
    "infrastructure",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "configured",
        "deployed",
      ],
      mid: [
        "managed infrastructure",
        "automated deployments",
      ],
      senior: [
        "architected infrastructure",
        "designed platform",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "CI/CD pipeline",
    "Docker",
    "Kubernetes",
    "cloud deployment",
    "infrastructure",
    "monitoring",
  ],

  achievementSignals: [
    "deployment time reduction",
    "downtime reduction",
    "uptime improvement",
    "infrastructure cost reduction",
    "deployment frequency",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// CLOUD ENGINEER
// ============================================================

const CLOUD_ENGINEER: RoleIntelligenceProfile = {
  id: "cloud-engineer",

  name: "Cloud Engineer",

  family: "cloud",

  aliases: [
    "cloud engineer",
    "cloud developer",
    "cloud architect",
    "aws engineer",
    "azure engineer",
    "gcp engineer",
  ],

  coreSkills: [
    "Cloud Computing",
    "AWS",
    "Azure",
    "GCP",
    "Linux",
  ],

  supportingSkills: [
    "Docker",
    "Kubernetes",
    "Terraform",
    "Networking",
    "Security",
    "CI/CD",
    "Infrastructure as Code",
  ],

  tools: [
    "AWS",
    "Azure",
    "GCP",
    "Terraform",
    "Docker",
    "Kubernetes",
    "CloudFormation",
    "Git",
    "Jenkins",
  ],

  concepts: [
    "cloud architecture",
    "networking",
    "infrastructure as code",
    "high availability",
    "scalability",
    "cloud security",
    "monitoring",
    "disaster recovery",
    "load balancing",
  ],

  responsibilities: [
    "design cloud infrastructure",
    "deploy cloud applications",
    "manage cloud resources",
    "automate infrastructure",
    "monitor cloud systems",
    "implement cloud security",
    "optimize cloud costs",
  ],

  keywords: [
    "cloud",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Linux",
    "networking",
    "infrastructure",
    "CI/CD",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "configured cloud resources",
        "deployed",
      ],
      mid: [
        "managed cloud infrastructure",
        "optimized cloud costs",
      ],
      senior: [
        "architected cloud infrastructure",
        "designed cloud architecture",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "certifications",
    "education",
  ],

  projectSignals: [
    "cloud migration",
    "cloud deployment",
    "AWS",
    "Azure",
    "GCP",
    "infrastructure as code",
  ],

  achievementSignals: [
    "cloud cost reduction",
    "uptime improvement",
    "deployment improvement",
    "performance improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// QA ENGINEER
// ============================================================

const QA_ENGINEER: RoleIntelligenceProfile = {
  id: "qa-engineer",

  name: "QA Engineer",

  family: "qa",

  aliases: [
    "qa engineer",
    "quality assurance engineer",
    "software tester",
    "test engineer",
    "qa tester",
    "automation tester",
  ],

  coreSkills: [
    "Software Testing",
    "Test Automation",
    "Manual Testing",
    "API Testing",
    "Test Cases",
  ],

  supportingSkills: [
    "Selenium",
    "Cypress",
    "Playwright",
    "Jest",
    "Postman",
    "SQL",
    "Java",
    "JavaScript",
    "Python",
  ],

  tools: [
    "Selenium",
    "Cypress",
    "Playwright",
    "Postman",
    "Jira",
    "Jenkins",
    "Jest",
    "TestRail",
  ],

  concepts: [
    "test planning",
    "regression testing",
    "integration testing",
    "unit testing",
    "API testing",
    "test automation",
    "bug tracking",
    "quality assurance",
    "CI/CD",
  ],

  responsibilities: [
    "design test cases",
    "execute test plans",
    "automate test scenarios",
    "identify defects",
    "perform regression testing",
    "test APIs",
    "report bugs",
    "improve software quality",
  ],

  keywords: [
    "QA",
    "quality assurance",
    "testing",
    "test automation",
    "selenium",
    "cypress",
    "playwright",
    "API testing",
    "manual testing",
    "regression testing",
    "Jira",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "tested",
        "executed test cases",
        "reported defects",
      ],
      mid: [
        "automated",
        "designed test suites",
        "owned testing",
      ],
      senior: [
        "architected test automation",
        "led QA strategy",
        "established quality processes",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "certifications",
    "education",
  ],

  projectSignals: [
    "test automation",
    "API testing",
    "end-to-end testing",
    "regression testing",
    "CI/CD",
  ],

  achievementSignals: [
    "test coverage improvement",
    "defect reduction",
    "testing time reduction",
    "automation improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// MOBILE DEVELOPER
// ============================================================

const MOBILE_DEVELOPER: RoleIntelligenceProfile = {
  id: "mobile-developer",

  name: "Mobile Developer",

  family: "mobile",

  aliases: [
    "mobile developer",
    "mobile engineer",
    "android developer",
    "ios developer",
    "flutter developer",
    "react native developer",
  ],

  coreSkills: [
    "Mobile Development",
    "Android",
    "iOS",
    "Mobile UI",
  ],

  supportingSkills: [
    "Flutter",
    "React Native",
    "Kotlin",
    "Java",
    "Swift",
    "Dart",
    "REST API",
    "Git",
  ],

  tools: [
    "Android Studio",
    "Xcode",
    "Flutter",
    "React Native",
    "Firebase",
    "Git",
    "GitHub",
  ],

  concepts: [
    "mobile architecture",
    "state management",
    "offline storage",
    "API integration",
    "push notifications",
    "mobile security",
    "performance",
    "app lifecycle",
  ],

  responsibilities: [
    "develop mobile applications",
    "build reusable mobile components",
    "integrate APIs",
    "implement mobile UI",
    "optimize application performance",
    "fix mobile bugs",
    "publish applications",
  ],

  keywords: [
    "mobile",
    "android",
    "ios",
    "flutter",
    "react native",
    "kotlin",
    "swift",
    "dart",
    "firebase",
    "REST API",
  ],

  senioritySignals:
    createSenioritySignals(),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
  ],

  projectSignals: [
    "mobile application",
    "android app",
    "ios app",
    "flutter app",
    "react native app",
  ],

  achievementSignals: [
    "app performance improvement",
    "crash reduction",
    "user growth",
    "app rating improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// UI / UX DESIGNER
// ============================================================

const UI_UX_DESIGNER: RoleIntelligenceProfile = {
  id: "ui-ux-designer",

  name: "UI/UX Designer",

  family: "ui-ux",

  aliases: [
    "ui ux designer",
    "ui/ux designer",
    "ux designer",
    "ui designer",
    "product designer",
    "user experience designer",
    "user interface designer",
  ],

  coreSkills: [
    "UI Design",
    "UX Design",
    "User Research",
    "Wireframing",
    "Prototyping",
  ],

  supportingSkills: [
    "Figma",
    "Adobe XD",
    "Sketch",
    "Design Systems",
    "Usability Testing",
    "Interaction Design",
    "Visual Design",
  ],

  tools: [
    "Figma",
    "Adobe XD",
    "Sketch",
    "FigJam",
    "Miro",
  ],

  concepts: [
    "user experience",
    "user research",
    "information architecture",
    "interaction design",
    "design systems",
    "usability",
    "accessibility",
    "visual hierarchy",
  ],

  responsibilities: [
    "design user interfaces",
    "conduct user research",
    "create wireframes",
    "build prototypes",
    "conduct usability testing",
    "maintain design systems",
    "collaborate with engineers",
  ],

  keywords: [
    "UI",
    "UX",
    "Figma",
    "wireframes",
    "prototypes",
    "user research",
    "usability",
    "design systems",
    "interaction design",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "designed",
        "prototyped",
        "created wireframes",
      ],
      mid: [
        "owned design",
        "conducted research",
        "established design systems",
      ],
      senior: [
        "led design strategy",
        "defined design systems",
        "drove user experience",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "mobile app design",
    "web application design",
    "design system",
    "prototype",
    "user research",
  ],

  achievementSignals: [
    "conversion improvement",
    "usability improvement",
    "user satisfaction",
    "engagement improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// PRODUCT MANAGER
// ============================================================

const PRODUCT_MANAGER: RoleIntelligenceProfile = {
  id: "product-manager",

  name: "Product Manager",

  family: "product",

  aliases: [
    "product manager",
    "product management",
    "associate product manager",
    "apm",
    "senior product manager",
  ],

  coreSkills: [
    "Product Management",
    "Product Strategy",
    "Roadmapping",
    "Stakeholder Management",
    "Requirements",
  ],

  supportingSkills: [
    "Agile",
    "Scrum",
    "User Research",
    "Analytics",
    "SQL",
    "A/B Testing",
    "Product Metrics",
  ],

  tools: [
    "Jira",
    "Confluence",
    "Notion",
    "Amplitude",
    "Mixpanel",
    "Google Analytics",
  ],

  concepts: [
    "product strategy",
    "roadmap",
    "product discovery",
    "user research",
    "prioritization",
    "product metrics",
    "experimentation",
    "stakeholder management",
    "agile",
  ],

  responsibilities: [
    "define product requirements",
    "manage product roadmap",
    "prioritize features",
    "conduct product discovery",
    "analyze product metrics",
    "coordinate stakeholders",
    "work with engineering teams",
    "measure product outcomes",
  ],

  keywords: [
    "product management",
    "product strategy",
    "roadmap",
    "requirements",
    "agile",
    "scrum",
    "user research",
    "analytics",
    "stakeholder management",
    "product metrics",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "supported",
        "analyzed",
        "coordinated",
      ],
      mid: [
        "owned roadmap",
        "prioritized",
        "launched",
      ],
      senior: [
        "defined product strategy",
        "drove product vision",
        "led cross-functional teams",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "product launch",
    "feature launch",
    "product strategy",
    "user research",
    "A/B testing",
  ],

  achievementSignals: [
    "user growth",
    "retention improvement",
    "conversion improvement",
    "revenue growth",
    "engagement improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// DIGITAL MARKETING
// ============================================================

const DIGITAL_MARKETING: RoleIntelligenceProfile = {
  id: "digital-marketing",

  name: "Digital Marketing",

  family: "marketing",

  aliases: [
    "digital marketing",
    "digital marketer",
    "digital marketing executive",
    "marketing specialist",
    "performance marketer",
    "growth marketer",
  ],

  coreSkills: [
    "Digital Marketing",
    "SEO",
    "SEM",
    "Content Marketing",
    "Social Media Marketing",
  ],

  supportingSkills: [
    "Google Ads",
    "Meta Ads",
    "Google Analytics",
    "Email Marketing",
    "Copywriting",
    "Marketing Analytics",
    "Lead Generation",
  ],

  tools: [
    "Google Analytics",
    "Google Ads",
    "Meta Ads Manager",
    "Search Console",
    "HubSpot",
    "Mailchimp",
    "SEMrush",
    "Ahrefs",
  ],

  concepts: [
    "SEO",
    "SEM",
    "conversion optimization",
    "lead generation",
    "marketing funnel",
    "content strategy",
    "campaign optimization",
    "analytics",
  ],

  responsibilities: [
    "plan marketing campaigns",
    "manage digital channels",
    "optimize campaigns",
    "analyze marketing performance",
    "generate leads",
    "improve conversion rates",
    "manage SEO initiatives",
  ],

  keywords: [
    "digital marketing",
    "SEO",
    "SEM",
    "Google Ads",
    "Meta Ads",
    "content marketing",
    "social media",
    "lead generation",
    "Google Analytics",
    "conversion",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "executed campaigns",
        "created content",
        "analyzed campaigns",
      ],
      mid: [
        "optimized campaigns",
        "managed budgets",
        "owned channels",
      ],
      senior: [
        "led marketing strategy",
        "drove growth",
        "established acquisition strategy",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
  ],

  projectSignals: [
    "marketing campaign",
    "SEO campaign",
    "paid advertising",
    "lead generation",
    "content campaign",
  ],

  achievementSignals: [
    "ROAS improvement",
    "conversion improvement",
    "lead growth",
    "traffic growth",
    "cost per acquisition reduction",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// FINANCE
// ============================================================

const FINANCE_ANALYST: RoleIntelligenceProfile = {
  id: "finance-analyst",

  name: "Finance Analyst",

  family: "finance",

  aliases: [
    "finance analyst",
    "financial analyst",
    "financial analyst associate",
    "fp&a analyst",
    "investment analyst",
  ],

  coreSkills: [
    "Financial Analysis",
    "Excel",
    "Financial Modeling",
    "Accounting",
    "Financial Reporting",
  ],

  supportingSkills: [
    "Power BI",
    "SQL",
    "Forecasting",
    "Budgeting",
    "Valuation",
    "Data Analysis",
  ],

  tools: [
    "Microsoft Excel",
    "Power BI",
    "Tableau",
    "SAP",
    "Oracle",
    "Bloomberg",
  ],

  concepts: [
    "financial modeling",
    "forecasting",
    "budgeting",
    "variance analysis",
    "financial reporting",
    "valuation",
    "risk analysis",
    "accounting",
  ],

  responsibilities: [
    "prepare financial analysis",
    "build financial models",
    "analyze financial performance",
    "prepare reports",
    "support budgeting",
    "perform variance analysis",
    "support business decisions",
  ],

  keywords: [
    "financial analysis",
    "Excel",
    "financial modeling",
    "accounting",
    "forecasting",
    "budgeting",
    "valuation",
    "financial reporting",
    "Power BI",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "analyzed",
        "prepared reports",
        "supported",
      ],
      mid: [
        "owned analysis",
        "built financial models",
        "managed forecasts",
      ],
      senior: [
        "led financial planning",
        "drove financial strategy",
        "established forecasting",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "education",
    "certifications",
  ],

  projectSignals: [
    "financial model",
    "forecasting",
    "budget analysis",
    "valuation",
    "financial dashboard",
  ],

  achievementSignals: [
    "cost reduction",
    "forecast accuracy",
    "revenue growth",
    "budget optimization",
    "process improvement",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// HR
// ============================================================

const HR_PROFESSIONAL: RoleIntelligenceProfile = {
  id: "hr-professional",

  name: "HR Professional",

  family: "hr",

  aliases: [
    "hr",
    "hr professional",
    "human resources",
    "hr executive",
    "hr manager",
    "talent acquisition",
    "recruiter",
    "technical recruiter",
  ],

  coreSkills: [
    "Human Resources",
    "Recruitment",
    "Talent Acquisition",
    "Employee Relations",
    "HR Operations",
  ],

  supportingSkills: [
    "Onboarding",
    "Performance Management",
    "HR Analytics",
    "Payroll",
    "Compliance",
    "Training",
    "Employer Branding",
  ],

  tools: [
    "Workday",
    "SAP SuccessFactors",
    "LinkedIn Recruiter",
    "Greenhouse",
    "BambooHR",
    "Excel",
  ],

  concepts: [
    "talent acquisition",
    "employee engagement",
    "performance management",
    "onboarding",
    "HR operations",
    "HR analytics",
    "employment compliance",
    "workforce planning",
  ],

  responsibilities: [
    "manage recruitment processes",
    "source candidates",
    "conduct interviews",
    "manage onboarding",
    "support employee relations",
    "maintain HR operations",
    "analyze workforce data",
  ],

  keywords: [
    "HR",
    "human resources",
    "recruitment",
    "talent acquisition",
    "employee relations",
    "onboarding",
    "performance management",
    "HR analytics",
    "LinkedIn Recruiter",
  ],

  senioritySignals:
    createSenioritySignals({
      entry: [
        "coordinated",
        "supported recruitment",
        "scheduled interviews",
      ],
      mid: [
        "managed hiring",
        "owned recruitment",
        "led onboarding",
      ],
      senior: [
        "led HR strategy",
        "drove workforce planning",
        "established talent strategy",
      ],
    }),

  preferredSections: [
    "summary",
    "skills",
    "experience",
    "education",
    "certifications",
  ],

  projectSignals: [
    "recruitment campaign",
    "employee engagement",
    "HR analytics",
    "employer branding",
    "onboarding program",
  ],

  achievementSignals: [
    "time-to-hire reduction",
    "retention improvement",
    "employee engagement improvement",
    "hiring volume",
    "cost per hire reduction",
  ],

  benchmarkAvailable: true,
};

// ============================================================
// ROLE REGISTRY
// ============================================================

export const ROLE_INTELLIGENCE_PROFILES: RoleIntelligenceProfile[] = [
  FRONTEND_DEVELOPER,
  BACKEND_DEVELOPER,
  FULLSTACK_DEVELOPER,
  JAVA_DEVELOPER,
  PYTHON_DEVELOPER,
  AI_ML_ENGINEER,
  DATA_ANALYST,
  DEVOPS_ENGINEER,
  CLOUD_ENGINEER,
  QA_ENGINEER,
  MOBILE_DEVELOPER,
  UI_UX_DESIGNER,
  PRODUCT_MANAGER,
  DIGITAL_MARKETING,
  FINANCE_ANALYST,
  HR_PROFESSIONAL,
];

// ============================================================
// TEXT NORMALIZATION
// ============================================================

export const normalizeRoleText = (
  value: string
): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[./_-]/g, " ")
    .replace(/[^a-z0-9+# ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ============================================================
// TOKENIZATION
// ============================================================

const tokenizeRole = (
  value: string
): string[] => {
  return Array.from(
    new Set(
      normalizeRoleText(value)
        .split(" ")
        .filter(Boolean)
    )
  );
};

// ============================================================
// TOKEN MATCH SCORE
// ============================================================
//
// Prevents naive substring matching.
//
// Example:
//
// "Full Stack Java Developer"
//
// Full Stack Developer
// → strong overlap
//
// Java Developer
// → weaker overlap
//
// Exact matches receive a large bonus.
// ============================================================

const scoreAliasMatch = (
  roleTokens: string[],
  aliasTokens: string[],
  normalizedRole: string,
  normalizedAlias: string
): number => {
  if (
    !roleTokens.length ||
    !aliasTokens.length
  ) {
    return 0;
  }

  // Exact complete match
  if (
    normalizedRole ===
    normalizedAlias
  ) {
    return 1000;
  }

  const roleSet =
    new Set(roleTokens);

  const matchedTokens =
    aliasTokens.filter((token) =>
      roleSet.has(token)
    );

  if (!matchedTokens.length) {
    return 0;
  }

  const overlap =
    matchedTokens.length /
    aliasTokens.length;

  const coverage =
    matchedTokens.length /
    roleTokens.length;

  // Prefer aliases that explain more of the supplied title.
  let score =
    overlap * 70 +
    coverage * 30;

  // Small bonus when the alias appears
  // as a complete token sequence.
  const aliasPosition =
    roleTokens
      .join(" ")
      .indexOf(
        aliasTokens.join(" ")
      );

  if (aliasPosition >= 0) {
    score += 10;
  }

  return score;
};

// ============================================================
// PROFILE MATCH
// ============================================================

interface RoleMatchResult {
  profile: RoleIntelligenceProfile | null;

  score: number;

  matchedAlias: string | null;
}

export const matchRoleProfile = (
  targetRole: string
): RoleMatchResult => {
  const normalizedRole =
    normalizeRoleText(
      targetRole
    );

  const roleTokens =
    tokenizeRole(
      targetRole
    );

  if (
    !normalizedRole ||
    !roleTokens.length
  ) {
    return {
      profile: null,
      score: 0,
      matchedAlias: null,
    };
  }

  let bestProfile:
    RoleIntelligenceProfile | null =
    null;

  let bestScore = 0;

  let bestAlias:
    string | null = null;

  for (
    const profile of
      ROLE_INTELLIGENCE_PROFILES
  ) {
    const aliases = unique([
      profile.name,
      ...profile.aliases,
    ]);

    for (
      const alias of aliases
    ) {
      const normalizedAlias =
        normalizeRoleText(
          alias
        );

      const aliasTokens =
        tokenizeRole(
          alias
        );

      const score =
        scoreAliasMatch(
          roleTokens,
          aliasTokens,
          normalizedRole,
          normalizedAlias
        );

      if (
        score > bestScore
      ) {
        bestScore = score;

        bestProfile =
          profile;

        bestAlias =
          alias;
      }
    }
  }

  return {
    profile: bestProfile,
    score: bestScore,
    matchedAlias: bestAlias,
  };
};

// ============================================================
// FIND ROLE PROFILE
// ============================================================

export const findRoleProfile = (
  targetRole: string
): RoleIntelligenceProfile | null => {
  const result =
    matchRoleProfile(
      targetRole
    );

  // Conservative threshold.
  //
  // If there is not enough evidence that the
  // title belongs to a known role, return null.
  if (
    !result.profile ||
    result.score < 45
  ) {
    return null;
  }

  return result.profile;
};

// ============================================================
// CUSTOM ROLE PROFILE
// ============================================================
//
// IMPORTANT:
// Unknown roles DO NOT receive fake benchmark data.
//
// This prevents:
// matched / 0
// division-by-zero
// accidental 100% role fit
// misleading benchmark claims
// ============================================================

const createCustomRoleProfile = (
  targetRole: string
): RoleIntelligenceProfile => {
  return {
    id: "custom",

    name:
      targetRole.trim(),

    family: "general",

    aliases: [],

    coreSkills: [],

    supportingSkills: [],

    tools: [],

    concepts: [],

    responsibilities: [],

    keywords: [],

    senioritySignals:
      createSenioritySignals(),

    preferredSections: [
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
    ],

    projectSignals: [],

    achievementSignals: [],

    benchmarkAvailable: false,
  };
};

// ============================================================
// ROLE PROFILE RESOLUTION
// ============================================================

export const resolveRoleProfile = (
  targetRole: string
): RoleIntelligenceProfile => {
  const profile =
    findRoleProfile(
      targetRole
    );

  if (profile) {
    return profile;
  }

  return createCustomRoleProfile(
    targetRole
  );
};

// ============================================================
// ROLE MATCH INFORMATION
// ============================================================

export const getRoleMatchInfo = (
  targetRole: string
) => {
  const result =
    matchRoleProfile(
      targetRole
    );

  return {
    targetRole:
      targetRole.trim(),

    matchedProfile:
      result.profile?.name ??
      null,

    profileId:
      result.profile?.id ??
      "custom",

    family:
      result.profile?.family ??
      "general",

    matchedAlias:
      result.matchedAlias,

    matchScore:
      Math.round(
        result.score
      ),

    benchmarkAvailable:
      Boolean(
        result.profile
      ),
  };
};

// ============================================================
// ROLE SKILL POOL
// ============================================================

export const getRoleSkillPool = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  if (
    !profile.benchmarkAvailable
  ) {
    return [];
  }

  return unique([
    ...profile.coreSkills,
    ...profile.supportingSkills,
    ...profile.tools,
    ...profile.keywords,
  ]);
};

// ============================================================
// ROLE CORE SKILL POOL
// ============================================================

export const getRoleCoreSkillPool = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  if (
    !profile.benchmarkAvailable
  ) {
    return [];
  }

  return unique([
    ...profile.coreSkills,
  ]);
};

// ============================================================
// ROLE KEYWORD POOL
// ============================================================

export const getRoleKeywordPool = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  if (
    !profile.benchmarkAvailable
  ) {
    return [];
  }

  return unique([
    ...profile.keywords,
    ...profile.coreSkills,
    ...profile.supportingSkills,
    ...profile.concepts,
  ]);
};

// ============================================================
// ROLE RESPONSIBILITY POOL
// ============================================================

export const getRoleResponsibilityPool = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  if (
    !profile.benchmarkAvailable
  ) {
    return [];
  }

  return unique([
    ...profile.responsibilities,
  ]);
};

// ============================================================
// ROLE PROJECT SIGNALS
// ============================================================

export const getRoleProjectSignals = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  if (
    !profile.benchmarkAvailable
  ) {
    return [];
  }

  return unique([
    ...profile.projectSignals,
  ]);
};

// ============================================================
// ROLE ACHIEVEMENT SIGNALS
// ============================================================

export const getRoleAchievementSignals = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  if (
    !profile.benchmarkAvailable
  ) {
    return [];
  }

  return unique([
    ...profile.achievementSignals,
  ]);
};

// ============================================================
// ROLE SECTION SIGNALS
// ============================================================

export const getPreferredRoleSections = (
  targetRole: string
): string[] => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  return unique([
    ...profile.preferredSections,
  ]);
};

// ============================================================
// BENCHMARK STATUS
// ============================================================

export const hasRoleBenchmark = (
  targetRole: string
): boolean => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  return profile.benchmarkAvailable;
};

// ============================================================
// ROLE FAMILY
// ============================================================

export const getRoleFamily = (
  targetRole: string
): RoleFamily => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  return profile.family;
};

// ============================================================
// ROLE SENIORITY SIGNALS
// ============================================================

export const getRoleSenioritySignals = (
  targetRole: string
): RoleSenioritySignals => {
  const profile =
    resolveRoleProfile(
      targetRole
    );

  return profile.senioritySignals;
};