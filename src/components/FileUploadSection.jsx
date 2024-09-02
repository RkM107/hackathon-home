import React, { useState } from "react";

const FileUploadSection = () => {
  const [file, setFile] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    // Validate the file (e.g., check extension, size)
    if (uploadedFile && uploadedFile.type === "application/json") {
      setValidationMessage("✔ File is valid.");
    } else {
      setValidationMessage("✖ Invalid file type. Please upload a JSON file.");
    }
  };

  const handleSubmit = () => {
    if (file) {
      // Handle file submission
      console.log("File submitted:", file);
    }
  };

  const handleClear = () => {
    setFile(null);
    setValidationMessage("");
  };

  let buttonColorClass = !file ? "bg-brightRedSupLight" : "bg-brightRed";

  return (
    <section className="my-10 mb-20 px-8">
      <div className="container mx-auto max-w-lg text-center">
        <h2 className="mb-4 text-2xl font-semibold">Upload Your Schema</h2>
        <p className="mb-6 text-gray-500">
          Drag & drop your schema file here, or click to browse from your
          device.
        </p>

        {/* File Upload Area */}
        <div
          className="mb-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-gray-500">
            {file
              ? `Selected File: ${file.name}`
              : "Drag & drop a file, or click to choose"}
          </p>
        </div>

        {/* Validation Feedback */}
        {validationMessage && (
          <div
            className={`text-sm ${validationMessage.includes("✔") ? "text-green-600" : "text-red-600"} mb-4`}
          >
            {validationMessage}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className={
              "rounded-lg px-6 py-2 text-white shadow-lg transition duration-300 " +
              buttonColorClass
            }
            onClick={handleSubmit}
            disabled={!file}
          >
            Submit
          </button>
          <button
            className="rounded-lg bg-gray-200 px-6 py-2 text-gray-800 transition duration-300 hover:bg-gray-300"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
};

export default FileUploadSection;
