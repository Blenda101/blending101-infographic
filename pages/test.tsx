import React from "react";
const test = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <svg className="svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(255,255,0)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255,0,0)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle
            className="circle"
            r="60"
            cx="65"
            cy="65"
            stroke="url(#grad1)"
          />
          {/* <circle r="60" cx="130" cy="65" />
          <circle r="60" cx="105" cy="130" /> */}
        </svg>
      </div>
    </div>
  );
};

export default test;
