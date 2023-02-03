/* eslint-disable @next/next/no-img-element */
import { useApolloClient } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { ReactSVG } from "react-svg";
import { CriteriaState, criteriaVar } from "../../graphql/Infograph";
import { GET_SUMMARY } from "../../graphql/Query";

const Summary = (props: CriteriaState) => {
  const { year, variant, param, paramImage, disease, state } = props;
  const criteriaRmvHandler = (key: keyof CriteriaState) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      [key]: "",
    });
  };

  const client = useApolloClient();
  const infoData = client.readQuery({
    query: GET_SUMMARY,
    variables: {
      year,
      state,
      disease,
      age: variant === "AGE" ? param : "",
      sex: variant === "SEX" ? param : "",
      race: variant === "RACE" ? param : "",
    },
  });

  const prevalence = useMemo(() => {
    const chronic = infoData?.showInfoData?.diseases?.find(
      (sick: any) => sick._id === disease,
    );
    // console.log(disease, chronic);
    return chronic ? Math.round((chronic.percentage * 1000) / 100) : 0;
  }, [disease, infoData?.showInfoData?.diseases]);

  return (
    <section id="prevalence">
      <div className="container-fluid w-90">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-md-8 col-12 d-flex">
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
                  </li>
                )}
                {param && (
                  <li>
                    <a href="">
                      <ReactSVG
                        src={paramImage || "/images/fa_heartbeat.svg"}
                      />
                      {param}
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
          <div className="col-md-4 col-12 d-flex">
            <div className="main_div">
              <div className="first_text">
                <h3>
                  {prevalence} <sub>IN</sub> 1000
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
