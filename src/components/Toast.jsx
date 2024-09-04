import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-600";

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex items-start justify-center pt-4">
      <div
        className={`${bgColor} max-w-md rounded-lg px-6 py-3 text-center text-white shadow-lg`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
