import React from "react";
import schemaLogo from "../assets/schema.svg";
import engLogo from "../assets/engineering.svg";
import fileLogo from "../assets/file.svg";
import validationLogo from "../assets/validation.svg";

const FeaturesSection = () => {
  return (
    <section id="features">
      <div className="container mx-auto my-10 mb-20 px-8 text-center">
        {/* Heading */}
        <h2 className="text-center text-4xl font-medium">What's Different</h2>
        {/* Features Container */}
        <div className="mt-20 flex space-x-6">
          {/* Features 1 */}
          <div className="bg-veryLightGray flex w-1/4 flex-col items-center space-y-6 rounded-lg p-6">
            <img src={schemaLogo} className="-mt-14 mb-2 w-16" />
            <h5 className="max-w-sm text-lg font-medium">
              Custom Schema Support
            </h5>
            <p className="text-grayish text-md max-w-md">
              Easily upload your own schema files to generate synthetic data
              that matches your specific data structure and requirements
            </p>
          </div>

          {/* Features 2 */}
          <div className="bg-veryLightGray flex w-1/4 flex-col items-center space-y-6 rounded-lg p-6">
            <img src={engLogo} className="-mt-14 mb-2 w-16" />
            <h5 className="max-w-sm text-lg font-medium">Condition Handling</h5>
            <p className="text-grayish text-md max-w-md">
              Define custom conditions and constraints to ensure that the
              generated data accurately reflects real-world scenarios
            </p>
          </div>

          {/* Features 3 */}
          <div className="bg-veryLightGray flex w-1/4 flex-col items-center space-y-6 rounded-lg p-6">
            <img src={validationLogo} className="-mt-14 mb-2 w-16" />
            <h5 className="max-w-sm text-lg font-medium">
              Real-Time Data Validation
            </h5>
            <p className="text-grayish text-md max-w-md">
              Instantly validate uploaded schemas and data with real-time
              feedback to ensure accuracy
            </p>
          </div>

          {/* Features 4 */}
          <div className="bg-veryLightGray flex w-1/4 flex-col items-center space-y-6 rounded-lg p-6">
            <img src={fileLogo} className="-mt-14 mb-2 w-16" />
            <h5 className="max-w-sm text-lg font-medium">
              Multi-Format Support
            </h5>
            <p className="text-grayish text-md max-w-md">
              Download your generated synthetic data in various formats, such as
              CSV, JSON, and Excel, for maximum compatibility
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
