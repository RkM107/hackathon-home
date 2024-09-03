import React from "react";

const NavBar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="container mx-auto p-4 px-8">
        {/* Flex Container */}
        <div className="flex items-baseline space-x-8">
          <div className="w-1/2">
            <a href="#" className="mr-auto font-bold">
              DataSynthAI
            </a>
          </div>
          <div className="flex w-1/2 justify-center space-x-8">
            <a href="#" className="font-medium hover:text-highlightRed">
              Upload Schema
            </a>
            <a href="#" className="font-medium hover:text-highlightRed">
              Generate Data
            </a>
            <a href="#" className="font-medium hover:text-highlightRed">
              Guide
            </a>
            <a href="#" className="font-medium hover:text-highlightRed">
              About
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
