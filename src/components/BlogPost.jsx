import React from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../seo/Seo";
import { getPostBySlug } from "../blog/posts";
import { SITE_NAME, toAbsoluteUrl } from "../seo/siteMeta";

function renderBlock(text, idx) {
  if (text.startsWith("## ")) {
    return (
      <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-3">
        {text.replace(/^##\s+/, "")}
      </h2>
    );
  }

  const lines = text.split("\n");
  const isList = lines.every((l) => l.trim().startsWith("- "));
  if (isList) {
    return (
      <ul key={idx} className="list-disc pl-6 text-gray-700 space-y-2">
        {lines.map((l) => (
          <li key={l}>{l.replace(/^\s*-\s+/, "")}</li>
        ))}
      </ul>
    );
  }

  // very small markdown: **bold**
  const parts = text.split("**");
  const nodes = parts.map((p, i) =>
    i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
  );

  return (
    <p key={idx} className="text-gray-700 leading-7 mt-4">
      {nodes}
    </p>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700">Post not found.</p>
          <Link to="/blog" className="text-blue-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Seo
        path={`/blog/${post.slug}`}
        title={`${post.title} — Programming With Mudit`}
        description={post.description}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: { "@type": "WebPage", "@id": toAbsoluteUrl(`/blog/${post.slug}`) },
        }}
      />

      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        <p className="text-xs text-gray-500">
          {post.category} • {post.date}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
          {post.title}
        </h1>
        <p className="text-gray-600 mt-4">{post.description}</p>

        <div className="mt-8">
          {(post.content || []).map((b, idx) => renderBlock(String(b), idx))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link to="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
          <Link to="/services" className="text-gray-900 font-semibold hover:underline">
            Hire a freelance developer →
          </Link>
        </div>
      </div>
    </div>
  );
}

