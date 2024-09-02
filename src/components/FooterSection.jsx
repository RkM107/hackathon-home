import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-veryDarkBlue">
      {/* <!-- Flex Container --> */}
      <div class="container mx-auto flex px-8 py-6">
        {/* <!-- Logo and Copyright container --> */}
        <div className="w-1/2 self-center">
          <h2 className="text-center text-2xl font-semibold text-white">
            Team HackBlitz
          </h2>
          <p className="my-6 text-center text-white">
            Copyright &copy; UBS Hackathon@2024, All Rights Reserved
          </p>
        </div>
        <div className="flex w-1/2 text-center">
          <div className="flex w-1/2 flex-col space-y-3">
            <h4 className="text-md text-white">Member 1</h4>
            <h4 className="text-md text-white">Member 2</h4>
            <h4 className="text-md text-white">Member 3</h4>
            <h4 className="text-md text-white">Member 4</h4>
            <h4 className="text-md text-white">Member 5</h4>
          </div>
          <div className="flex w-1/2 flex-col space-y-3">
            <h4 className="text-md text-white">Member 6</h4>
            <h4 className="text-md text-white">Member 7</h4>
            <h4 className="text-md text-white">Member 8</h4>
            <h4 className="text-md text-white">Member 9</h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
