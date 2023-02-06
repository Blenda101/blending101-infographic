import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer>
      <a id="props-basic"> ◕‿‿◕ </a>

      {isMounted && <Tooltip anchorId="props-basic" content="hello world!" />}

      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className=" footer-logo ">
              <img src="/images/footer-logo.svg " alt=" " />
            </div>
            <div className="social-icon ">
              <ul>
                <li>
                  <a href=" ">
                    <img src="/images/facebook-logo.svg " alt=" " />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img src="/images/instagram.svg " alt=" " />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img src="/images/twitter.svg " alt=" " />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img src="/images/youtube.svg " alt=" " />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img src="/images/Pinterest_black.svg " alt=" " />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img src="/images/tiktok.svg " alt=" " />
                  </a>
                </li>
              </ul>
            </div>
            <div className="copy-right ">
              <p>© 2022 Blending101 - 2022</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
