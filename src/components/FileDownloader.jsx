import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FileDownloader = ({ generationId, onDownloadComplete }) => {
  const [fileStatus, setFileStatus] = useState("checking");
  const [progress, setProgress] = useState(0);
  const pollingIntervalRef = useRef(null);
  const downloadedRef = useRef(false);

  useEffect(() => {
    if (generationId) {
      startPolling();
    }
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
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
    pollingIntervalRef.current = setInterval(checkFile, 10000); // Check every 10 seconds
  };

  const checkFile = async () => {
    if (downloadedRef.current) return;

    try {
      const response = await axios.get(
        `http://your-server-url/file/${generationId}`,
        {
          responseType: "blob",
        },
      );

      const contentType = response.headers["content-type"];
      const blob = response.data;

      if (contentType === "application/json") {
        const jsonText = await blob.text();
        const jsonData = JSON.parse(jsonText);

        if (jsonData.status === "ready") {
          setFileStatus("ready");
          clearInterval(pollingIntervalRef.current);
          downloadFile(blob, contentType, "json");
          downloadedRef.current = true;
          onDownloadComplete();
        } else {
          setFileStatus("processing");
        }
      } else if (contentType === "text/csv") {
        setFileStatus("ready");
        clearInterval(pollingIntervalRef.current);
        downloadFile(blob, contentType, "csv");
        downloadedRef.current = true;
        onDownloadComplete();
      } else {
        throw new Error("Unexpected content type");
      }
    } catch (error) {
      console.error("File check/download error:", error);
      setFileStatus("error");
      clearInterval(pollingIntervalRef.current);
    }
  };

  const downloadFile = (blob, contentType, fileExtension) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `data_${generationId}.${fileExtension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
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
