export const BLOG_POSTS = [
  {
    slug: "learn-mern-stack-roadmap-2026",
    title: "Learn MERN Stack (2026 Roadmap): From Zero to Job-Ready",
    description:
      "A practical roadmap to learn MERN stack fast: React fundamentals, Node/Express APIs, MongoDB modeling, projects, and interview prep.",
    date: "2026-04-14",
    category: "Tutorial",
    keywords: ["learn MERN stack", "React projects", "MERN roadmap"],
    content: [
      "If you want to **learn MERN stack** without getting stuck in random tutorials, follow this roadmap and build projects that recruiters actually understand.",
      "## 1) Start with JavaScript + DOM (1–2 weeks)",
      "- Closures, promises, async/await\n- Array methods (map/filter/reduce)\n- Fetch + basic DOM events",
      "## 2) React fundamentals (2–3 weeks)",
      "- Components + props/state\n- React Router\n- Forms + validation\n- API integration (axios/fetch)",
      "## 3) Node + Express REST APIs (2 weeks)",
      "- Routing + middleware\n- JWT auth basics\n- Input validation\n- Error handling",
      "## 4) MongoDB modeling (1–2 weeks)",
      "- Collections/documents\n- Indexes\n- Relationships (embed vs reference)\n- Aggregations (basic)",
      "## 5) Build 2–3 projects (most important)",
      "Build:\n- A course selling app (payments + auth)\n- A notes marketplace (download + purchases)\n- A portfolio + blog (SEO + content)",
      "## 6) Interview prep (ongoing)",
      "Do DSA basics + system design fundamentals. Keep your projects deployable and documented.",
      "If you want, check the Courses/Notes sections on this site for structured learning resources.",
    ],
  },
  {
    slug: "react-projects-for-resume-beginners",
    title: "7 React Projects for Your Resume (Beginner to Intermediate)",
    description:
      "Simple but impressive React projects that show real skills: CRUD, auth, API integration, performance, and deployment.",
    date: "2026-04-14",
    category: "Problem Solving",
    keywords: ["React projects", "React portfolio projects"],
    content: [
      "Want **React projects** that make your resume stronger? Pick 2–3 from this list and ship them with clean UI + deployment + README.",
      "## Project ideas",
      "1) Notes app with tags + search\n2) Expense tracker with charts\n3) Job tracker with Kanban\n4) Auth + protected routes demo\n5) Course catalog (filter/sort/favorites)\n6) Mini e-commerce cart + checkout UI\n7) Performance demo (memoization + virtualization)",
      "## What makes them rank on Google + impress recruiters",
      "- One page per project\n- Good screenshots\n- Clear features list\n- Deployed link + GitHub link",
      "Publish your learnings as blog posts and link your GitHub profile everywhere (LinkedIn, Dev.to, Medium).",
    ],
  },
  {
    slug: "hire-freelance-mern-developer",
    title: "Hire a Freelance MERN Developer: What to Ask + Typical Cost",
    description:
      "A quick guide to hiring a freelance MERN/React developer: questions, pricing ranges, timelines, and what deliverables you should expect.",
    date: "2026-04-14",
    category: "Money Keyword",
    keywords: ["hire freelance developer", "hire MERN developer", "React freelancer"],
    content: [
      "If you’re looking to **hire a freelance developer** for a React/MERN project, this checklist saves time and avoids bad handoffs.",
      "## What to ask before hiring",
      "- Similar project links (live + GitHub)\n- Stack confirmation (React, Node, MongoDB)\n- Timeline + milestones\n- Hosting/deployment plan\n- Post-launch support",
      "## Deliverables you should expect",
      "- Source code + repo access\n- Deployment (Netlify/Vercel/Render)\n- Basic documentation\n- Bug-fix window after delivery",
      "## Pricing (high level)",
      "Small fixes are usually hourly. Full projects are milestone-based. The real number depends on scope and integrations (payments, auth, admin panel).",
      "If you want to discuss a project, go to the Services page and submit your requirement.",
    ],
  },
];

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}

