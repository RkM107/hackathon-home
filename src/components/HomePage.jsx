import React from "react";
import FileUploadSection from "./FileUploadSection";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";
import GuideSection from "./GuideSection";
import FeaturesSection from "./FeaturesSection";
import FooterSection from "./FooterSection";
const HomePage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <GuideSection />
      <FeaturesSection />
      <FileUploadSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
