import React from "react";
import templateSchema from "../assets/template_schema.json";

const HeroSection = () => {
  const downloadTemplateSchema = () => {
    const jsonString = JSON.stringify(templateSchema, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "template_schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="hero">
      <div className="container mx-auto my-10 mb-20 flex items-center px-8">
        {/* Heading and Subheading and button */}
        <div className="flex w-1/2 flex-col space-y-7">
          <h1 className="max-w-lg text-left text-5xl font-semibold">
            DataSynthAI : Effortless Data Generation for Seamless Integration
          </h1>
          <p className="max-w-sm text-left text-grayish">
            Upload your schema or customize our template to generate realistic
            synthetic data in minutes—perfect for testing, development, and
            beyond
          </p>
          <button
            onClick={downloadTemplateSchema}
            className="self-start rounded-full bg-brightRed p-3 px-6 text-white hover:bg-brightRedLight"
          >
            Download Template Schema
          </button>
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
