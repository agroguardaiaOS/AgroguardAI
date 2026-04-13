/**
 * AgroGuardAI Constants
 * CDN URLs, API endpoints, and application configuration
 */

// ========== CDN Assets ==========
export const ASSETS = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/mylogo_440373dd.png",
  africaImpactLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/african-impact-logo_1769331f.png",
  intelligenceCore: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/intelligence-ai-core_f4b644e5.png",
  intelligenceBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/intelligence-bg_3d2b08c7.png",
  agromindBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/agromind-bg_c85ee736.jpg",
  agromindMockup: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/agromind-mockup_2349c849.jpg",
  agroroboticsBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/agrorobotics-bg_982fd770.jpg",
  droneHeroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663543215933/mStF7PrYMTe36WoUeJk9t9/drone-hero-bg_25682964.jpg",
};

// ========== API Endpoints ==========
export const API_ENDPOINTS = {
  diagnose: "https://api.agroguardai.com/v1/diagnose",
  predict: "https://api.agroguardai.com/v1/predict",
  treatmentPlan: "https://api.agroguardai.com/v1/treatment-plan",
  crops: "https://api.agroguardai.com/v1/crops",
  regions: "https://api.agroguardai.com/v1/regions",
  stream: "wss://api.agroguardai.com/v1/stream",
  agromindChat: "https://api.agromind.chat/v1/chat",
  agroroboticsOps: "https://api.agrorobotics.io/v1/operations",
};

// ========== Navigation ==========
export const NAVIGATION = [
  { label: "Intelligence", href: "/intelligence" },
  { label: "AgroMind", href: "/agromind" },
  { label: "AgroRobotics", href: "/agrorobotics" },
  { label: "API", href: "/api" },
  { label: "Pricing", href: "/pricing" },
];

// ========== Pricing Tiers ==========
export const PRICING_TIERS = [
  {
    name: "Starter",
    monthlyPrice: 99,
    annualPrice: 990,
    description: "Perfect for small farms and developers",
    features: [
      "Up to 100 diagnoses/month",
      "Basic weather integration",
      "Email support",
      "Community access",
    ],
  },
  {
    name: "Professional",
    monthlyPrice: 499,
    annualPrice: 4990,
    description: "For growing operations and enterprises",
    features: [
      "Unlimited diagnoses",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "Custom solutions for large-scale operations",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise deployment",
      "Custom model training",
    ],
  },
];

// ========== Hardware Specs ==========
export const HARDWARE = [
  {
    name: "Scout Drone",
    specs: {
      flightTime: "45 min",
      coverage: "100 hectares/hour",
      payload: "2kg",
      resolution: "4K multispectral",
    },
    description: "Autonomous aerial scout for field monitoring. Captures high-resolution multispectral imagery.",
  },
  {
    name: "Spray Drone",
    specs: {
      flightTime: "30 min",
      coverage: "50 hectares/hour",
      payload: "5L tank",
      accuracy: "±5cm",
    },
    description: "Precision spraying drone for targeted crop treatment. Reduces chemical usage by 70%.",
  },
  {
    name: "Soil Rover",
    specs: {
      range: "10km",
      speed: "5 km/h",
      sensors: "12 soil parameters",
      battery: "8 hours",
    },
    description: "Autonomous ground rover for soil analysis. Maps soil health across entire fields.",
  },
];

// ========== Features ==========
export const FEATURES = {
  intelligence: [
    {
      title: "Satellite-Based Crop Health Mapping",
      description: "Real-time monitoring of crop health using satellite and drone imagery",
    },
    {
      title: "Multi-Modal Data Processing",
      description: "Combines satellite, drone, weather, and soil data for comprehensive analysis",
    },
    {
      title: "Global Agricultural Knowledge Base",
      description: "Trained on decades of agricultural research and real-world farming data",
    },
  ],
  agromind: [
    {
      title: "Voice-First Interface",
      description: "Ask questions by voice in your local language. Get answers in seconds.",
    },
    {
      title: "Multilingual Support",
      description: "Communicate in Hausa, Yoruba, Igbo, Swahili, English, and more.",
    },
    {
      title: "Offline Capability",
      description: "Works without internet. Download crop knowledge locally. Sync when connected.",
    },
  ],
  agrorobotics: [
    {
      title: "Autonomous Scout & Spray Drones",
      description: "Precision field monitoring and targeted crop treatment",
    },
    {
      title: "Precision Agricultural Rovers",
      description: "Soil analysis and field mapping with centimeter-level accuracy",
    },
    {
      title: "Real-Time Hardware-AI Integration",
      description: "Hardware executes AI-driven treatment plans autonomously",
    },
  ],
};

// ========== Social Links ==========
export const SOCIAL_LINKS = [
  { platform: "Twitter", url: "https://twitter.com/AgroguardAI", icon: "twitter" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/agroguardai", icon: "linkedin" },
  { platform: "GitHub", url: "https://github.com/agroguardaiaOS", icon: "github" },
  { platform: "Instagram", url: "https://instagram.com/agroguardai", icon: "instagram" },
];

// ========== Contact ==========
export const CONTACT_INFO = {
  email: "hello@agroguardai.com",
  phone: "+1 (555) 123-4567",
  address: "123 Agriculture Way, Silicon Valley, CA 94025",
  responseTime: "24 hours",
};

// ========== SEO ==========
export const SEO = {
  title: "AgroGuardAI - The Intelligence Layer for Global Agriculture",
  description: "Enterprise AI platform for precision agriculture, autonomous field operations, and data-driven farming decisions worldwide.",
  keywords: ["agriculture", "AI", "precision farming", "crop health", "autonomous drones", "farming intelligence"],
};
