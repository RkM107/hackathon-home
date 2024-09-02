import React from "react";

const NavBar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="container mx-auto p-4 px-8">
        {/* Flex Container */}
        <div className="flex items-baseline space-x-8">
          <a href="#" className="mr-auto font-bold">
            DataSynthAI
          </a>
          <a href="#" className="hover:text-highlightRed font-medium">
            Upload Schema
          </a>
          <a href="#" className="hover:text-highlightRed font-medium">
            Generate Data
          </a>
          <a href="#" className="hover:text-highlightRed font-medium">
            Guide
          </a>
          <a href="#" className="hover:text-highlightRed font-medium">
            About
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
