import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import { BLOG_POSTS } from "../blog/posts";
import { SITE_NAME, toAbsoluteUrl } from "../seo/siteMeta";

export default function Blog() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => {
      const hay = `${p.title} ${p.description} ${(p.keywords || []).join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Seo
        path="/blog"
        title="Blog — MERN, React, Freelancing | Programming With Mudit"
        description="Read tutorials, problem-solving guides, and freelancing insights: learn MERN stack, build React projects, and grow as a developer."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog`,
          url: toAbsoluteUrl("/blog"),
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            url: toAbsoluteUrl(`/blog/${p.slug}`),
          })),
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
            <p className="text-gray-600 mt-1">
              Tutorials, problem solving, and money keywords (freelancing).
            </p>
          </div>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back home
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search posts..."
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 bg-white"
            aria-label="Search blog posts"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <p className="text-xs text-gray-500">
                {p.category} • {p.date}
              </p>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                <Link to={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="text-gray-600 mt-3">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.keywords || []).slice(0, 3).map((k) => (
                  <span
                    key={k}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <Link
                  to={`/blog/${p.slug}`}
                  className="inline-block text-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

