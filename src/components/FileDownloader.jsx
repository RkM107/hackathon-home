import React, { useState, useEffect } from "react";
import axios from "axios";

const FileDownloader = ({ generationId, onDownloadComplete }) => {
  const [fileStatus, setFileStatus] = useState("checking");
  const [progress, setProgress] = useState(0);
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    if (generationId) {
      startPolling();
    }
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [generationId]);

  useEffect(() => {
    // Update progress based on fileStatus
    switch (fileStatus) {
      case "checking":
        setProgress(10);
        break;
      case "processing":
        setProgress(50);
        break;
      case "ready":
        setProgress(100);
        break;
      case "error":
        setProgress(0);
        break;
      default:
        setProgress(0);
    }
  }, [fileStatus]);

  const startPolling = () => {
    const interval = setInterval(checkFile, 10000); // Check every 10 seconds
    setPollingInterval(interval);
  };

  const checkFile = async () => {
    try {
      const response = await axios.get(
        `http://your-server-url/file/${generationId}`,
        {
          responseType: "blob",
        },
      );

      const contentType = response.headers["content-type"];
      if (contentType === "application/json") {
        // File is not ready yet
        const jsonResponse = JSON.parse(await response.data.text());
        setFileStatus("processing");
      } else {
        // File is ready, download it
        setFileStatus("ready");
        clearInterval(pollingInterval);
        downloadFile(response.data);
      }
    } catch (error) {
      console.error("File check/download error:", error);
      setFileStatus("error");
    }
  };

  const downloadFile = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `data_${generationId}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    onDownloadComplete();
  };

  return (
    <div className="mt-4">
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2.5 rounded-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 text-center text-sm">
        {fileStatus === "checking" && "Checking file status..."}
        {fileStatus === "processing" &&
          "File is still being generated. Please wait."}
        {fileStatus === "ready" && "File has been downloaded."}
        {fileStatus === "error" && "An error occurred. Please try again later."}
      </div>
    </div>
  );
};

export default FileDownloader;
