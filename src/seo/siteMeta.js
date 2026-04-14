export const SITE_URL =
  (import.meta.env.VITE_SITE_URL || "").trim() || "https://programmingwithmudit.com";

export const SITE_NAME = "Programming With Mudit";

export const DEFAULT_TITLE = `${SITE_NAME} — Courses, Notes & Mock Interviews`;

export const DEFAULT_DESCRIPTION =
  "Learn coding with structured courses and notes. Preview, pay securely, and access purchases anytime. Also available: mock interviews and freelance services.";

export function toAbsoluteUrl(pathname = "/") {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL.replace(/\/+$/, "")}${p}`;
}

