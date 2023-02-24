/* eslint-disable @next/next/no-img-element */
import { useApolloClient } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import {
  AGE_DICTIONARY,
  DEATH_DISEASES_DICTIONARY,
  DEATH_YEAR_DICTIONARY,
  DISEASES_DICTIONARY,
  RACES_DICTIONARY,
  SEX_DICTIONARY,
  STATE_DICTIONARIES,
  YEAR_DICTIONARY,
} from "../../data/Category";
import {
  CriteriaState,
  criteriaVar,
  VariantState,
} from "../../graphql/Infograph";
import { GET_SUMMARY } from "../../graphql/Incidence";
import Dropdown from "../shared/Dropdown";
import { useDataset, useVariant } from "../context/VariantProvider";

const Summary = (props: VariantState) => {
  const {
    year,
    variant,
    param,
    paramImage,
    age,
    sex,
    race,
    disease,
    diseaseImage,
    state,
    compare,
  } = props;
  const isDeath = useVariant();
  const dataSet = useDataset();
  const [showDropdown, setShowDropdown] = useState("");

  const client = useApolloClient();
  const infoData = client.readQuery({
    query: GET_SUMMARY,
    variables: {
      year,
      state,
      disease,
      age,
      sex,
      race,
      dataSet,
    },
  });

  useEffect(() => {
    setShowDropdown("");
  }, [isDeath]);

  const prevalence = useMemo(() => {
    const chronic = infoData?.showInfoData?.diseases?.find(
      (sick: any) => sick._id === disease,
    );
    return chronic ? Math.round((chronic.percentage * 1000) / 100) : 0;
  }, [disease, infoData?.showInfoData?.diseases]);

  const criteriaRmvHandler = (key: keyof VariantState) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      [key]: "",
    });
  };

  let PARAM_DICTIONARY = {};
  if (variant === "RACE") {
    PARAM_DICTIONARY = RACES_DICTIONARY;
  } else if (variant === "SEX") {
    PARAM_DICTIONARY = SEX_DICTIONARY;
  } else if (variant === "AGE") {
    PARAM_DICTIONARY = AGE_DICTIONARY;
  }

  return (
    <section id="prevalence">
      <div className="container-fluid w-90">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-md-8 col-12 d-flex">
            <div className="small-button">
              <ul>
                {year && (
                  <Dropdown
                    image={"/images/calender.svg"}
                    value={year}
                    isEffectingChart={false}
                    items={isDeath ? DEATH_YEAR_DICTIONARY : YEAR_DICTIONARY}
                    keyName="year"
                    keyImage="icon"
                    showDropdownState={[showDropdown, setShowDropdown]}
                  />
                )}
                {disease && (
                  <Dropdown
                    image={diseaseImage}
                    value={disease}
                    isEffectingChart={compare !== "disease"}
                    items={
                      isDeath ? DEATH_DISEASES_DICTIONARY : DISEASES_DICTIONARY
                    }
                    keyName="disease"
                    keyImage="diseaseImage"
                    showDropdownState={[showDropdown, setShowDropdown]}
                  />
                )}
                {/* {param && (
                  <Dropdown
                    value={param}
                    image={paramImage}
                    onRemove={() => criteriaRmvHandler("param")}
                    isEffectingChart={compare === "disease" || compare === ""}
                    items={PARAM_DICTIONARY}
                    keyName="param"
                    keyImage="paramImage"
                    showDropdownState={[showDropdown, setShowDropdown]}
                  />
                )}
                {age && (
                  <Dropdown
                    value={age}
                    image={ageImage}
                    onRemove={() => criteriaRmvHandler("age")}
                    isEffectingChart={compare === "disease" || compare === ""}
                    items={PARAM_DICTIONARY}
                    keyName="age"
                    keyImage="ageImage"
                    showDropdownState={[showDropdown, setShowDropdown]}
                  />
                )} */}

                {state && (
                  <Dropdown
                    image={"/images/location.svg"}
                    value={state}
                    onRemove={() => criteriaRmvHandler("state")}
                    isEffectingChart
                    items={STATE_DICTIONARIES}
                    keyName="state"
                    keyImage="icons"
                    showDropdownState={[showDropdown, setShowDropdown]}
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
