"use client";

import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import FeaturedProjects from "./components/FeaturedProjects";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}>
      <Hero />
      <div id="work">
        <FeaturedProjects />
      </div>
      <div id="experience">
        <Timeline />
      </div>
      <div id="stack">
        <TechStack />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
