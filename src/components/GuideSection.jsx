import React from "react";

const GuideSection = () => {
  return (
    <section id="guide">
      <div className="container mx-auto my-10 mb-20 flex items-baseline px-8">
        {/* Guide Heading and SubHeading */}
        <div className="flex w-1/2 flex-col space-y-7">
          <h2 className="max-w-md text-left text-3xl font-medium">
            Get Started with Ease
          </h2>
          <p className="max-w-sm text-left text-grayish">
            Follow these simple steps to create and download your synthetic data
            effortlessly
          </p>
        </div>
        {/* Guide Numbered List Container*/}
        <div className="flex w-1/2 flex-col space-y-8">
          {/* List Item 1 Container */}
          <div className="flex items-baseline space-x-6">
            {/* Number */}
            <div className="self-start rounded-full bg-brightRed px-4 py-1 text-white">
              01
            </div>
            {/* Description */}
            <div>
              <h3 className="mb-3 max-w-md text-left text-lg">
                Download the Template
              </h3>
              <p className="max-w-md text-left text-grayish">
                Click on the "Download Template Schema" button to get a sample
                schema file. Modify it as per your needs.
              </p>
            </div>
          </div>

          {/* List Item 2 Container */}
          <div className="flex items-baseline space-x-6">
            {/* Number */}
            <div className="self-start rounded-full bg-brightRed px-4 py-1 text-white">
              02
            </div>
            {/* Description */}
            <div>
              <h3 className="mb-3 max-w-md text-left text-lg">
                Upload Your Schema
              </h3>
              <p className="max-w-md text-left text-grayish">
                Use the "Upload Your Schema" button to upload your customized
                schema file for validation.
              </p>
            </div>
          </div>

          {/* List Item 3 Container*/}
          <div className="flex items-baseline space-x-6">
            {/* Number */}
            <div className="self-start rounded-full bg-brightRed px-4 py-1 text-white">
              03
            </div>
            {/* Description */}
            <div>
              <h3 className="mb-3 max-w-md text-left text-lg">
                Generate and Download
              </h3>
              <p className="max-w-md text-left text-grayish">
                Click on the "Generate Data" button to create synthetic data
                based on your schema. Once done, click on the "Download Data"
                button to get your synthetic data file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
