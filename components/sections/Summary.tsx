/* eslint-disable @next/next/no-img-element */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CriteriaState, criteriaVar } from "../../graphql/Infograph";

const Summary = (props: CriteriaState) => {
  const { year, param, disease, state } = props;
  const criteriaRmvHandler = (key: keyof CriteriaState) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      [key]: "",
    });
  };
  return (
    <section id="prevalence">
      <div className="container-fluid w-90">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-8 d-flex">
            <div className="small-button">
              <ul>
                {year && (
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> {year}
                    </a>
                  </li>
                )}
                {disease && (
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> {disease}
                    </a>
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => criteriaRmvHandler("disease")}
                    />
                  </li>
                )}
                {param && (
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> {param}
                    </a>
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => criteriaRmvHandler("param")}
                    />
                  </li>
                )}
                {state && (
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> {state}
                    </a>
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => criteriaRmvHandler("state")}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-4 d-flex">
            <div className="main_div">
              <div className="first_text">
                <h3>
                  1 <sub>IN</sub> 30
                </h3>
              </div>
              <div className="inner_bg">
                <h4>Prevalence</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
