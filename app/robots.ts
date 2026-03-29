import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard crawlers — allow everything except build artifacts
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "YandexBot"],
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        // AI training crawlers — allow access for discoverability
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web"],
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: "https://opensyntax-academy.vercel.app/sitemap.xml",
    host: "https://opensyntax-academy.vercel.app",
  }
}
