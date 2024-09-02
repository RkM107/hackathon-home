import React from "react";

const HeroSection = () => {
  return (
    <section id="hero">
      <div className="container mx-auto my-10 mb-20 flex items-center px-8">
        {/* Heading and Subheading and button */}
        <div className="flex w-1/2 flex-col space-y-7">
          <h1 className="max-w-lg text-left text-5xl font-semibold">
            DataSynthAI : Effortless Data Generation for Seamless Integration
          </h1>
          <p className="text-grayish max-w-sm text-left">
            Upload your schema or customize our template to generate realistic
            synthetic data in minutes—perfect for testing, development, and
            beyond
          </p>
          <a
            href="#"
            className="bg-brightRed hover:bg-brightRedLight self-start rounded-full p-3 px-6 text-white"
          >
            Download Template Schema
          </a>
        </div>
        {/* Image */}
        <div className="w-1/2">
          <h2 className="text-center font-semibold"> Image Goes Here</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
