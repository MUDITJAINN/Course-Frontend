// export const BACKEND_URL = "https://course-backend-xwu2.onrender.com/api/v1";
export const BACKEND_URL = "http://localhost:4001/api/v1";

export const EMAILJS_SERVICE_ID = "service_tqxz5z7";
export const EMAILJS_TEMPLATE_ID = "template_rt1f0ha";
export const EMAILJS_PUBLIC_KEY = "dOIG8F0m1DOefyRFp";

/** Telegram channel or @username link */
export const TELEGRAM_URL =
  import.meta.env.VITE_TELEGRAM_URL || "https://t.me/programmingwithmudit";

/**
 * WhatsApp click-to-chat. Override with VITE_WHATSAPP_URL in frontend/.env if needed.
 * Default matches Terms contact phone (91 + 9149099945).
 */
export const WHATSAPP_URL =
  (import.meta.env.VITE_WHATSAPP_URL || "").trim() ||
  "https://wa.me/919149099945";

// Backlinks / social profiles (override via VITE_* in frontend/.env)
export const GITHUB_URL =
  (import.meta.env.VITE_GITHUB_URL || "").trim() || "https://github.com/programmingwithmudit";
export const LINKEDIN_URL =
  (import.meta.env.VITE_LINKEDIN_URL || "").trim() || "https://www.linkedin.com/";
export const DEVTO_URL =
  (import.meta.env.VITE_DEVTO_URL || "").trim() || "https://dev.to/";
export const MEDIUM_URL =
  (import.meta.env.VITE_MEDIUM_URL || "").trim() || "https://medium.com/";
export const TWITTER_URL =
  (import.meta.env.VITE_TWITTER_URL || "").trim() || "https://x.com/";
export const INSTAGRAM_URL =
  (import.meta.env.VITE_INSTAGRAM_URL || "").trim() || "https://www.instagram.com/";
export const FACEBOOK_URL =
  (import.meta.env.VITE_FACEBOOK_URL || "").trim() || "https://www.facebook.com/";