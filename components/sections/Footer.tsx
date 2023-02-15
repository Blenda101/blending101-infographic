/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useVariant } from "../context/VariantProvider";

const Footer = () => {
  const isDeath = useVariant();
  return (
    <footer
      style={{
        backgroundImage: isDeath
          ? "url(/images/footer-dark-bg.svg)"
          : "url(/images/footer-bg.svg)",
      }}
    >
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
                    <img
                      src={
                        isDeath
                          ? "/images/facebook-logo-dark.svg"
                          : "/images/facebook-logo.svg"
                      }
                      alt=" "
                    />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img
                      src={
                        isDeath
                          ? "/images/instagram-dark.svg"
                          : "/images/instagram.svg"
                      }
                      alt=" "
                    />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img
                      src={
                        isDeath
                          ? "/images/twitter-dark.svg"
                          : "/images/twitter.svg"
                      }
                      alt=" "
                    />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img
                      src={
                        isDeath
                          ? "/images/youtube-dark.svg"
                          : "/images/youtube.svg"
                      }
                      alt=" "
                    />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img
                      src={
                        isDeath
                          ? "/images/Pinterest_black-dark.svg"
                          : "/images/Pinterest_black.svg"
                      }
                      alt=" "
                    />
                  </a>
                </li>
                <li>
                  <a href=" ">
                    <img
                      src={
                        isDeath
                          ? "/images/tiktok-dark.svg"
                          : "/images/tiktok.svg"
                      }
                      alt=" "
                    />
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
