import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import Toast from "./Toast";
import FileDownloader from "./FileDownloader";

const FileUploadSection = () => {
  const [file, setFile] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [isFileValid, setIsFileValid] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [isCSV, setIsCSV] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [generationId, setGenerationId] = useState(null);
  const [showDownloader, setShowDownloader] = useState(false);

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const validTypes = ["application/json", "text/csv"];
      if (!validTypes.includes(uploadedFile.type)) {
        setValidationMessage(
          "✖ Invalid file type. Please upload a JSON or CSV file.",
        );
        setIsFileValid(false);
        setIsCSV(false);
      } else if (uploadedFile.size > 1048576) {
        // 1MB = 1048576 bytes
        setValidationMessage(
          "✖ File size exceeds 1MB. Please upload a smaller file.",
        );
        setIsFileValid(false);
        setIsCSV(false);
      } else if (uploadedFile.size === 0) {
        setValidationMessage(
          "✖ The file is empty. Please upload a non-empty file.",
        );
        setIsFileValid(false);
        setIsCSV(false);
      } else {
        try {
          const fileContent = await readFileContent(uploadedFile);
          if (Array.isArray(fileContent) && fileContent.length === 0) {
            setValidationMessage(
              "✖ The file is empty. Please upload a non-empty file.",
            );
            setIsFileValid(false);
          } else if (
            typeof fileContent === "object" &&
            Object.keys(fileContent).length === 0
          ) {
            setValidationMessage(
              "✖ The file is empty. Please upload a non-empty file.",
            );
            setIsFileValid(false);
          } else {
            setValidationMessage("✔ File is valid.");
            setIsFileValid(true);
            setIsCSV(uploadedFile.type === "text/csv");
            if (uploadedFile.type === "text/csv") {
              setSelectedModel("Gaussian");
            } else {
              setSelectedModel("");
            }
          }
        } catch (error) {
          setValidationMessage(`✖ Error reading file: ${error.message}`);
          setIsFileValid(false);
          setIsCSV(false);
        }
      }
    } else {
      setValidationMessage("");
      setIsFileValid(false);
      setIsCSV(false);
    }
  };

  const handleSubmit = async () => {
    if (file && isFileValid && selectedModel && selectedFormat) {
      setIsLoading(true);
      try {
        // Read the file content
        const fileContent = await readFileContent(file);

        // Convert fileContent to string
        let fileDataString;
        if (typeof fileContent === "object") {
          fileDataString = JSON.stringify(fileContent);
        } else if (Array.isArray(fileContent)) {
          // For CSV files, convert array to JSON string
          fileDataString = JSON.stringify(fileContent);
        } else {
          fileDataString = String(fileContent);
        }

        // Generate a unique ID for this generation
        const uniqueId = uuidv4();

        // Store the uniqueId in localStorage
        localStorage.setItem("lastGenerationId", uniqueId);

        // Prepare the request payload
        const payload = {
          fileData: fileDataString,
          selectedModel: selectedModel,
          selectedFormat: selectedFormat,
          fileName: file.name,
          generationId: uniqueId,
        };

        console.log("Payload: ", payload);

        // Send POST request to dummy endpoint
        const response = await axios.post(
          "https://dummy-endpoint.com/generate-data",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("Response:", response.data);
        setToast({
          message:
            "Schema Validated Successfully! Please wait while we generate your data",
          type: "success",
        });

        // Start the download process
        setGenerationId(uniqueId);
        setShowDownloader(true);
      } catch (error) {
        console.error("Error generating data:", error);
        // Show error message to user
        let errorMessage =
          "There was an error in your schema. Please try again.";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage =
            error.response.data.message || error.response.data || errorMessage;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage =
            "No response received from server. Please try again later.";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message || errorMessage;
        }
        setToast({
          message: errorMessage,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper function to read file content as JSON or CSV
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        if (file.type === "application/json") {
          try {
            const json = JSON.parse(content);
            resolve(json);
          } catch (error) {
            reject(new Error("Failed to parse file as JSON"));
          }
        } else if (file.type === "text/csv") {
          Papa.parse(content, {
            complete: (results) => {
              resolve(results.data);
            },
            error: (error) => {
              reject(new Error("Failed to parse file as CSV"));
            },
            header: true, // Assume CSV has headers
          });
        } else {
          reject(new Error("Unsupported file type"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleClear = () => {
    setFile(null);
    setValidationMessage("");
    setIsFileValid(false);
    setSelectedModel("");
    setSelectedFormat("");
  };

  const handleDownloadComplete = () => {
    setShowDownloader(false);
    setGenerationId(null);
    // Additional actions after download if needed
  };

  let buttonColorClass =
    !file || !isFileValid || !selectedModel || !selectedFormat
      ? "bg-brightRedSupLight"
      : "bg-brightRed";

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
            onClick={(e) => {
              // Reset the input value to allow selecting the same file again
              e.target.value = null;
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const files = e.dataTransfer.files;
              if (files.length) {
                handleFileChange({ target: { files: [files[0]] } });
              }
            }}
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

        {/* Dropdowns */}
        {isFileValid && (
          <div className="mt-6 flex flex-col items-center">
            <div className="flex justify-center space-x-4">
              <div className="w-64">
                <label
                  htmlFor="aiModel"
                  className="mb-2 block text-left text-sm font-medium text-gray-900"
                >
                  Select AI Model
                </label>
                <select
                  id="aiModel"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isCSV}
                >
                  <option value="">Choose a model</option>
                  <option value="Gaussian">GAUSSIAN</option>
                  {!isCSV && <option value="Ctgan">CTGAN</option>}
                </select>
              </div>
              <div className="w-64">
                <label
                  htmlFor="downloadFormat"
                  className="mb-2 block text-left text-sm font-medium text-gray-900"
                >
                  Preferred Download Format
                </label>
                <select
                  id="downloadFormat"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option value="">Choose a format</option>
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className={
              "rounded-lg px-6 py-2 text-white shadow-lg transition duration-300 " +
              (isLoading ? "cursor-not-allowed bg-gray-400" : buttonColorClass)
            }
            onClick={handleSubmit}
            disabled={
              !file ||
              !isFileValid ||
              !selectedModel ||
              !selectedFormat ||
              isLoading
            }
          >
            {isLoading ? (
              <>
                <span className="mr-2 inline-block animate-spin">&#9696;</span>
                Generating...
              </>
            ) : (
              "Generate Data"
            )}
          </button>
          <button
            className="rounded-lg bg-gray-200 px-6 py-2 text-gray-800 transition duration-300 hover:bg-gray-300"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </div>

      {/* FileDownloader component */}
      {showDownloader && (
        <FileDownloader
          generationId={generationId}
          onDownloadComplete={handleDownloadComplete}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default FileUploadSection;
