// Utility helpers for visual styling, category themes, reading time, and clean photo images

export const CATEGORY_IMAGES = {
  Technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  Programming:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "Web Development":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "Artificial Intelligence":
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "Machine Learning":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "Data Science":
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  "Cyber Security":
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  "Cloud Computing":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "Mobile Development":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  "Software Engineering":
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  Career:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  Education:
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  Business:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  Finance:
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
  Travel:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
  Food:
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
  "Health & Fitness":
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  Lifestyle:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  Photography:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  Entertainment:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  Books:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  "Personal Development":
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  Gaming:
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
  Sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  News:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
  Others:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
};

export const CATEGORY_THEMES = {
  Technology: {
    gradient: "from-blue-600 via-cyan-600 to-teal-500",
    lightBg: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    icon: "💻",
    accent: "#0ea5e9",
  },
  "Artificial Intelligence": {
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    lightBg: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    icon: "🤖",
    accent: "#8b5cf6",
  },
  "Machine Learning": {
    gradient: "from-violet-600 via-purple-600 to-pink-500",
    lightBg: "bg-violet-50",
    textColor: "text-violet-700",
    borderColor: "border-violet-200",
    icon: "🧠",
    accent: "#a855f7",
  },
  "Data Science": {
    gradient: "from-teal-600 via-emerald-600 to-green-500",
    lightBg: "bg-teal-50",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    icon: "📊",
    accent: "#14b8a6",
  },
  "Cyber Security": {
    gradient: "from-red-600 via-rose-600 to-orange-500",
    lightBg: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
    icon: "🛡️",
    accent: "#f43f5e",
  },
  "Cloud Computing": {
    gradient: "from-sky-600 via-blue-600 to-indigo-500",
    lightBg: "bg-sky-50",
    textColor: "text-sky-700",
    borderColor: "border-sky-200",
    icon: "☁️",
    accent: "#0284c7",
  },
  "Mobile Development": {
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    icon: "📱",
    accent: "#10b981",
  },
  "Software Engineering": {
    gradient: "from-indigo-600 via-blue-600 to-cyan-500",
    lightBg: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    icon: "⚙️",
    accent: "#6366f1",
  },
  Career: {
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    lightBg: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
    icon: "🚀",
    accent: "#f59e0b",
  },
  Education: {
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    lightBg: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    icon: "🎓",
    accent: "#3b82f6",
  },
  Business: {
    gradient: "from-slate-700 via-zinc-700 to-neutral-800",
    lightBg: "bg-slate-50",
    textColor: "text-slate-800",
    borderColor: "border-slate-200",
    icon: "💼",
    accent: "#475569",
  },
  Finance: {
    gradient: "from-emerald-600 via-green-600 to-teal-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-200",
    icon: "💰",
    accent: "#059669",
  },
  Travel: {
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    lightBg: "bg-cyan-50",
    textColor: "text-cyan-800",
    borderColor: "border-cyan-200",
    icon: "✈️",
    accent: "#06b6d4",
  },
  Food: {
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    lightBg: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-200",
    icon: "🍳",
    accent: "#f97316",
  },
  "Health & Fitness": {
    gradient: "from-lime-600 via-emerald-600 to-teal-500",
    lightBg: "bg-lime-50",
    textColor: "text-lime-800",
    borderColor: "border-lime-200",
    icon: "💪",
    accent: "#84cc16",
  },
  Lifestyle: {
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    lightBg: "bg-pink-50",
    textColor: "text-pink-800",
    borderColor: "border-pink-200",
    icon: "🌿",
    accent: "#ec4899",
  },
  Photography: {
    gradient: "from-zinc-800 via-stone-800 to-neutral-900",
    lightBg: "bg-zinc-100",
    textColor: "text-zinc-800",
    borderColor: "border-zinc-300",
    icon: "📷",
    accent: "#27272a",
  },
  Entertainment: {
    gradient: "from-fuchsia-600 via-pink-600 to-rose-500",
    lightBg: "bg-fuchsia-50",
    textColor: "text-fuchsia-800",
    borderColor: "border-fuchsia-200",
    icon: "🎬",
    accent: "#c026d3",
  },
  Books: {
    gradient: "from-amber-600 via-yellow-600 to-orange-500",
    lightBg: "bg-amber-50",
    textColor: "text-amber-900",
    borderColor: "border-amber-200",
    icon: "📚",
    accent: "#d97706",
  },
  "Personal Development": {
    gradient: "from-violet-600 via-indigo-600 to-purple-600",
    lightBg: "bg-violet-50",
    textColor: "text-violet-800",
    borderColor: "border-violet-200",
    icon: "✨",
    accent: "#7c3aed",
  },
  Gaming: {
    gradient: "from-purple-700 via-indigo-700 to-violet-900",
    lightBg: "bg-purple-50",
    textColor: "text-purple-800",
    borderColor: "border-purple-200",
    icon: "🎮",
    accent: "#9333ea",
  },
  Sports: {
    gradient: "from-blue-600 via-cyan-600 to-emerald-500",
    lightBg: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
    icon: "⚽",
    accent: "#2563eb",
  },
  News: {
    gradient: "from-red-600 via-rose-600 to-zinc-700",
    lightBg: "bg-red-50",
    textColor: "text-red-800",
    borderColor: "border-red-200",
    icon: "📰",
    accent: "#dc2626",
  },
  Others: {
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    lightBg: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-200",
    icon: "💡",
    accent: "#f97316",
  },
};

export const DEFAULT_THEME = {
  gradient: "from-orange-500 via-amber-500 to-orange-600",
  lightBg: "bg-orange-50",
  textColor: "text-orange-700",
  borderColor: "border-orange-200",
  icon: "📝",
  accent: "#f97316",
};

export function getCategoryTheme(category) {
  return CATEGORY_THEMES[category] || DEFAULT_THEME;
}

// Extract first markdown image if available
export function extractCoverImage(markdown) {
  if (!markdown || typeof markdown !== "string") return null;
  const mdMatch = markdown.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  if (mdMatch && mdMatch[1]) return mdMatch[1];
  const htmlMatch = markdown.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlMatch && htmlMatch[1]) return htmlMatch[1];
  return null;
}

export const FALLBACK_COVER_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80";

export const SVG_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ea580c'/%3E%3Cstop offset='100%25' stop-color='%23f59e0b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23g)'/%3E%3Ccircle cx='400' cy='225' r='60' fill='white' fill-opacity='0.2'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='22' font-weight='700' fill='white'%3ETinyBlog%3C/text%3E%3C/svg%3E";

export const TOPIC_RULES = [
  {
    topic: "Artificial Intelligence",
    category: "Artificial Intelligence",
    icon: "🤖",
    description: "Neural networks, generative intelligence & smart algorithms",
    keywords: [
      "artificial intelligence",
      "ai in everyday",
      "ai in daily",
      "everyday life",
      "everyday",
      "chatgpt",
      "openai",
      "neural network",
      "deep learning",
      "machine intelligence",
      "voice assistant",
      "smart assistant",
      "robotics",
      "robot",
      "llm",
      "generative ai",
      "ai",
    ],
    images: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Cyber Security",
    category: "Cyber Security",
    icon: "🛡️",
    description: "Digital defense, network privacy & cybersecurity systems",
    keywords: [
      "cybersecurity",
      "cyber security",
      "digital world",
      "protecting our digital",
      "hacker",
      "hacking",
      "firewall",
      "encryption",
      "malware",
      "phishing",
      "infosec",
      "security",
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Healthy Food & Nutrition",
    category: "Food",
    icon: "🥗",
    description: "Gourmet dishes, diet, culinary craft & nutrition",
    keywords: [
      "healthy food",
      "food",
      "diet",
      "nutrition",
      "recipe",
      "cooking",
      "meal",
      "kitchen",
      "vegetables",
      "fruit",
      "delicious",
      "eating",
      "culinary",
      "baking",
    ],
    images: [
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Books & Literature",
    category: "Books",
    icon: "📚",
    description: "Literature, knowledge, novels & lifelong reading",
    keywords: [
      "reading books",
      "importance of reading",
      "books",
      "book",
      "reading",
      "literature",
      "novel",
      "author",
      "library",
      "pages",
      "read",
    ],
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Machine Learning",
    category: "Machine Learning",
    icon: "🧠",
    description: "Predictive models, algorithms & dataset intelligence",
    keywords: [
      "machine learning",
      "supervised learning",
      "unsupervised",
      "model training",
      "dataset",
      "classification",
      "regression",
      "algorithm",
    ],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Productivity & Work",
    category: "Lifestyle",
    icon: "⚡",
    description: "Deep work, focus, efficiency & daily habits",
    keywords: [
      "productive at work",
      "stay productive",
      "productivity",
      "productive",
      "time management",
      "work ethic",
      "habits",
      "focus",
      "workflow",
      "discipline",
    ],
    images: [
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Technology & Everyday Life",
    category: "Technology",
    icon: "💻",
    description: "Modern innovations, consumer tech & digital transformation",
    keywords: [
      "technology in our",
      "importance of technology",
      "technology",
      "tech",
      "gadget",
      "devices",
      "digital",
      "hardware",
      "software",
      "innovation",
      "internet",
    ],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Web Development",
    category: "Web Development",
    icon: "🌐",
    description: "Frontend, backend, React, Node and UI/UX design",
    keywords: [
      "web development",
      "javascript",
      "react",
      "html",
      "css",
      "nodejs",
      "node.js",
      "frontend",
      "backend",
      "fullstack",
      "tailwind",
      "website",
    ],
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Mobile Development",
    category: "Mobile Development",
    icon: "📱",
    description: "iOS, Android, React Native & mobile app architecture",
    keywords: [
      "mobile development",
      "mobile app",
      "android",
      "ios",
      "react native",
      "flutter",
      "swift",
      "kotlin",
      "smartphone",
    ],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Cloud Computing",
    category: "Cloud Computing",
    icon: "☁️",
    description: "Distributed infrastructure, AWS, cloud architecture & DevOps",
    keywords: [
      "cloud computing",
      "cloud",
      "aws",
      "azure",
      "gcp",
      "devops",
      "docker",
      "kubernetes",
      "serverless",
    ],
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Programming & Code",
    category: "Programming",
    icon: "⚙️",
    description: "Code craft, architectures, algorithms & engineering",
    keywords: [
      "programming",
      "software engineering",
      "coding",
      "developer",
      "algorithm",
      "python",
      "java",
      "c++",
      "golang",
      "rust",
    ],
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Data Science & Analytics",
    category: "Data Science",
    icon: "📊",
    description: "Statistical insights, data pipelines & visualization",
    keywords: [
      "data science",
      "data analysis",
      "big data",
      "analytics",
      "visualization",
      "pandas",
      "statistics",
    ],
    images: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Health & Fitness",
    category: "Health & Fitness",
    icon: "💪",
    description: "Workouts, endurance, strength & body vitality",
    keywords: [
      "health & fitness",
      "fitness",
      "workout",
      "gym",
      "exercise",
      "running",
      "yoga",
      "training",
      "cardio",
      "health",
    ],
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Travel & Adventure",
    category: "Travel",
    icon: "✈️",
    description: "Wanderlust, scenic destinations & global journeys",
    keywords: [
      "travel",
      "trip",
      "vacation",
      "journey",
      "explore",
      "adventure",
      "destination",
      "tourism",
      "flight",
      "beach",
      "mountains",
    ],
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Finance & Wealth",
    category: "Finance",
    icon: "💰",
    description: "Markets, investment, wealth building & economy",
    keywords: [
      "finance",
      "money",
      "investing",
      "investment",
      "stock",
      "crypto",
      "bitcoin",
      "budget",
      "wealth",
      "economy",
    ],
    images: [
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Business & Leadership",
    category: "Business",
    icon: "💼",
    description: "Enterprise growth, entrepreneurship & strategy",
    keywords: [
      "business",
      "startup",
      "entrepreneur",
      "company",
      "marketing",
      "leadership",
      "management",
      "sales",
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Career & Growth",
    category: "Career",
    icon: "🚀",
    description: "Professional paths, resume advice & promotions",
    keywords: [
      "career",
      "interview",
      "resume",
      "job",
      "hiring",
      "promotion",
      "workplace",
      "internship",
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Education & Academics",
    category: "Education",
    icon: "🎓",
    description: "Higher education, research & academic excellence",
    keywords: [
      "education",
      "study",
      "learning",
      "student",
      "college",
      "university",
      "school",
      "exam",
      "degree",
    ],
    images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Gaming & Esports",
    category: "Gaming",
    icon: "🎮",
    description: "Interactive gaming, game development & esports",
    keywords: [
      "gaming",
      "game",
      "games",
      "esports",
      "playstation",
      "xbox",
      "nintendo",
      "gameplay",
    ],
    images: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Sports & Athletics",
    category: "Sports",
    icon: "⚽",
    description: "Matches, athletic training & sporting culture",
    keywords: [
      "sports",
      "football",
      "soccer",
      "cricket",
      "basketball",
      "tennis",
      "athlete",
      "championship",
    ],
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Photography & Visual Arts",
    category: "Photography",
    icon: "📷",
    description: "Composition, lighting, lenses & captured memories",
    keywords: [
      "photography",
      "photo",
      "camera",
      "portrait",
      "lens",
      "photographer",
      "shots",
    ],
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Entertainment & Media",
    category: "Entertainment",
    icon: "🎬",
    description: "Cinema, music, streaming & creative arts",
    keywords: [
      "entertainment",
      "movie",
      "cinema",
      "film",
      "music",
      "songs",
      "concert",
      "netflix",
    ],
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "News & Current Affairs",
    category: "News",
    icon: "📰",
    description: "Global headlines, journalism & breaking stories",
    keywords: [
      "news",
      "breaking news",
      "politics",
      "world",
      "journalism",
      "newspaper",
      "headline",
    ],
    images: [
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Personal Development",
    category: "Personal Development",
    icon: "✨",
    description: "Self-growth, motivation, mindset & achievement",
    keywords: [
      "personal development",
      "self improvement",
      "motivation",
      "growth",
      "mindset",
      "success",
      "confidence",
    ],
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    topic: "Everyday Life & Lifestyle",
    category: "Lifestyle",
    icon: "🌿",
    description: "Daily routines, balance, mindfulness & modern living",
    keywords: [
      "everyday life",
      "daily life",
      "everyday",
      "daily routine",
      "lifestyle",
      "living",
      "mindfulness",
    ],
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// Intelligently guess the topic from title, content snippet, and category
export function guessTopic(title = "", content = "", fallbackCategory = "") {
  const text = `${title || ""} ${(content || "").substring(0, 600)} ${
    fallbackCategory || ""
  }`.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  for (const rule of TOPIC_RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (text.includes(kw)) {
        score += kw.includes(" ") ? 4 : 1.5;
      }
    }
    if (
      fallbackCategory &&
      rule.category.toLowerCase() === fallbackCategory.toLowerCase()
    ) {
      score += 2;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch;
  }

  const defaultImages = [
    CATEGORY_IMAGES[fallbackCategory] || FALLBACK_COVER_IMAGE,
    FALLBACK_COVER_IMAGE,
  ];

  return {
    topic: fallbackCategory || "General Story",
    category: fallbackCategory || "Others",
    icon: "💡",
    description: "General thoughts, stories and perspectives",
    images: defaultImages,
  };
}

// Get clean, simple photo cover image for blog card (custom from markdown or guessed topic)
export function getBlogCoverImage(content, category, title = "") {
  const customImage = extractCoverImage(content);
  if (customImage) return customImage;

  const guessed = guessTopic(title, content, category);
  if (guessed && guessed.images && guessed.images.length > 0) {
    return guessed.images[0];
  }

  return (
    CATEGORY_IMAGES[category] ||
    CATEGORY_IMAGES.Others ||
    FALLBACK_COVER_IMAGE
  );
}

// Strip markdown characters to generate a clean preview excerpt
export function getCleanExcerpt(markdown, maxLength = 120) {
  if (!markdown || typeof markdown !== "string") return "";
  const cleaned = markdown
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`{1,3}[^`\n]*`{1,3}/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/>\s+/g, "")
    .replace(/[-*+]\s+/g, "")
    .replace(/\d+\.\s+/g, "")
    .replace(/\n+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).trim() + "...";
}

// Calculate estimated read time in minutes
export function calculateReadTime(content) {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
