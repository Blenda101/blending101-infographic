/* eslint-disable @next/next/no-img-element */
import { useApolloClient } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { CriteriaState, criteriaVar } from "../../graphql/Infograph";
import { GET_SUMMARY } from "../../graphql/Query";
import Dropdown from "../shared/Dropdown";

const Summary = (props: CriteriaState) => {
  const { year, variant, param, paramImage, disease, diseaseImage, state } =
    props;
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
                  <Dropdown image={"/images/calender.svg"} value={year} />
                )}
                {disease && (
                  <Dropdown image={`/filters${diseaseImage}`} value={disease} />
                )}
                {param && (
                  <Dropdown
                    image={paramImage}
                    value={param}
                    onRemove={() => criteriaRmvHandler("param")}
                  />
                )}
                {state && (
                  <Dropdown
                    image={"/images/location.svg"}
                    value={state}
                    onRemove={() => criteriaRmvHandler("state")}
                  />
                )}
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-12 d-flex">
            <div className="main_div">
              <div className="first_text">
                <h3>
                  {prevalence}
                  <span>
                    <sub>IN</sub> 1000
                  </span>
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
