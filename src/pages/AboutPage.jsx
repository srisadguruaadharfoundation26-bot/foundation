import React from "react";
import AboutSection from "../components/AboutSection";
import MissionVisionSection from "../components/MissionVisionSection";
import StorySection from "../components/StorySection";
import GuidesSection from "../components/GuidesSection";
import PartOfCareSection from "../components/PartOfCareSection";
import CommunityCareSection from "../components/CommunityCareSection";
import DonationSection from "../components/DonationSection";

export default function AboutPage({ onOpenImage }) {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="eyebrow">OUR STORY</span>
        <h1>
          Rooted in care.
          <br />
          <em>United by kindness.</em>
        </h1>
        <p>
          A charity trust, a caring home, and a community that believes our
          elders deserve dignity.
        </p>
      </section>
      <AboutSection
        linkHref="#mission-vision"
        linkText="Our mission and vision"
      />
      <MissionVisionSection />
      <StorySection />
      <GuidesSection />
      <PartOfCareSection />
      <CommunityCareSection />
      <DonationSection />
    </main>
  );
}
