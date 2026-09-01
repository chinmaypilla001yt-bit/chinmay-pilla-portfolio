import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The deliverable is a standalone static site (HTML/CSS/vanilla JS) served
// from /portfolio/. This route only forwards the preview root to it.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chinmay Pilla | Computer Science Engineering Student" },
      {
        name: "description",
        content:
          "First-year CSE student (AI/ML & Data Science) at NIAT x S-VYASA. Learning C++, DSA and machine learning by building projects and joining hackathons.",
      },
      { property: "og:title", content: "Chinmay Pilla | Computer Science Engineering Student" },
      {
        property: "og:description",
        content:
          "Early-stage developer building foundations in C++, DSA, AI/ML and Data Science through projects and hackathons.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/portfolio/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a className="text-foreground underline" href="/portfolio/index.html">
        Open portfolio
      </a>
    </div>
  );
}
