import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { useLazyQuery, useQuery } from "@apollo/client";

import staticData from "../../data/Trends";

import styles from "./Trends.module.scss";
import {
  GET_COMPARE_TRENDS,
  GET_CRITERIA,
  GET_TRENDS,
} from "../../graphql/Query";
import { CriteriaState, criteriaVar } from "../../graphql/Infograph";
import AreaGraph from "../graph/AreaGraph";
import StackedAreaGraph, { IType } from "../graph/StackedAreaGraph";

const Trends = (props: CriteriaState) => {
  const { param, disease, state, variant } = props;
  const [compare, setCompare] = useState<IType | "">("");

  const { data } = useQuery(GET_TRENDS, {
    variables: {
      state,
      disease,
      age: variant === "AGE" ? param : "",
      sex: variant === "SEX" ? param : "",
      race: variant === "RACE" ? param : "",
    },
  });

  const { data: compareData } = useQuery(GET_COMPARE_TRENDS, {
    variables: {
      type: compare,
      state,
      disease,
      category: param,
    },
    skip: compare === "",
  });

  const compareTrends = useMemo(() => {
    // console.log(compareData?.getCompareData);

    return compareData?.getCompareData?.map((compareYear: any) => {
      const year: any = { year: compareYear.year };
      compareYear?.fotmatedData.forEach((category: any) => {
        if (!category?.category) return;
        year[category?.category] = category?.percentage;
      });
      return year;
    });
  }, [compareData]);

  const handleCompare = async (key: IType) => {
    if (compare === key) setCompare("");
    else {
      setCompare(key);
    }
  };

  const trends = data?.yearBasedAggregation || [];
  return (
    <section id="Trends">
      <div className="continer-fluid w-90">
        <div className="row">
          <div className="col-12">
            <div className="tabs">
              <div className="tabs-heading">
                <h3>Trends</h3>
              </div>
              <div className={styles.graph}>
                <div className={styles.graph__panel}>
                  <h2 className={styles.graph__title}>Compare</h2>
                  <ul className={styles.graph__menu}>
                    <li
                      className={
                        compare === "disease"
                          ? styles["graph__menu--active"]
                          : ""
                      }
                      onClick={() => handleCompare("disease")}
                    >
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Disease
                    </li>
                    <li
                      className={
                        compare === "race" ? styles["graph__menu--active"] : ""
                      }
                      onClick={() => handleCompare("race")}
                    >
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Race
                    </li>
                    <li
                      className={
                        compare === "sex" ? styles["graph__menu--active"] : ""
                      }
                      onClick={() => handleCompare("sex")}
                    >
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Sex
                    </li>
                    <li
                      className={
                        compare === "age" ? styles["graph__menu--active"] : ""
                      }
                      onClick={() => handleCompare("age")}
                    >
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Age
                    </li>
                  </ul>
                </div>
                {compare === "" ? (
                  <div className={styles.graph__wrapper}>
                    <AreaGraph trends={trends} />
                  </div>
                ) : (
                  <div className={styles.graph__wrapper_stacked}>
                    <StackedAreaGraph type={compare} trends={compareTrends} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trends;
