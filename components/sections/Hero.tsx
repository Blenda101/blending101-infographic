import React from "react";

const Hero = () => {
  return (
    <section id="banner-sec">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="banner-main text-center">
              <div className="banner-heading">
                <img src="/images/cloud.png" className="img-fluid" alt="" />
                <h1>
                  US <span className="clr-orange"> Chronic Disease</span> <br />
                  <span className="clr-green">Interactive Data Story</span>
                </h1>
              </div>
              <div className="banner-desc">
                <p>
                  Join us on our mission to save billions of dollars and
                  millions of lives by empowering healthcare consumers,
                  providers, and ecosystem partners to exploit the culinary and
                  medicinal value of food
                </p>
                <img src="/images/cloud.png" className="img-fluid" alt="" />

                <div className="learn_btn">
                  <a href="#">Learn More</a>
                </div>
              </div>
            </div>
            <div className="banner-img">
              <img src="/images/banner-img.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
