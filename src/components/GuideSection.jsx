import React from "react";

const GuideSection = () => {
  return (
    <section id="guide">
      <div className="container mx-auto my-10 mb-20 flex items-baseline px-8">
        {/* Guide Heading and SubHeading */}
        <div className="flex w-1/2 flex-col space-y-7">
          <h2 className="max-w-md text-left text-3xl font-medium">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-grayish max-w-sm text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            repellendus!
          </p>
        </div>
        {/* Guide Numbered List Container*/}
        <div className="flex w-1/2 flex-col space-y-8">
          {/* List Item 1 Container */}
          <div className="flex items-baseline space-x-6">
            {/* Number */}
            <div className="bg-brightRed self-start rounded-full px-4 py-1 text-white">
              01
            </div>
            {/* Description */}
            <div>
              <h3 className="max-w-md text-left text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
                corrupti!
              </h3>
            </div>
          </div>

          {/* List Item 2 Container */}
          <div className="flex items-baseline space-x-6">
            {/* Number */}
            <div className="bg-brightRed self-start rounded-full px-4 py-1 text-white">
              02
            </div>
            {/* Description */}
            <div>
              <h3 className="max-w-md text-left text-lg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur, aut.
              </h3>
            </div>
          </div>

          {/* List Item 3 Container*/}
          <div className="flex items-baseline space-x-6">
            {/* Number */}
            <div className="bg-brightRed self-start rounded-full px-4 py-1 text-white">
              03
            </div>
            {/* Description */}
            <div>
              <h3 className="max-w-md text-left text-lg">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facere, consectetur.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
