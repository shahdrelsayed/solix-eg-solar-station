import { createFileRoute } from "@tanstack/react-router";
import { SolixLanding } from "@/components/solix/SolixLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLIX — Powered by Sun, Cooled by Nature" },
      {
        name: "description",
        content:
          "Smart solar-powered shading pods for public spaces. SOLIX generates clean energy, cools outdoor areas, and powers the cities of tomorrow.",
      },
      { property: "og:title", content: "SOLIX — Smart Solar Shading" },
      {
        property: "og:description",
        content:
          "Solar-powered smart shading pods for smart cities, schools, parks and public spaces.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: SolixLanding,
});