/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { useLazyQuery, useQuery } from "@apollo/client";

import { AREAGRAPH, LINEGRAPH } from "../../data/Trends";

import styles from "./Trends.module.scss";
import {
  GET_COMPARE_TRENDS,
  GET_CRITERIA,
  GET_TRENDS,
} from "../../graphql/Query";
import { CriteriaState, criteriaVar } from "../../graphql/Infograph";
import AreaGraph from "../graph/AreaGraph";
import StackedAreaGraph, { IType } from "../graph/StackedAreaGraph";
import { AGE, DISEASES, RACE, SEX } from "../../data/Category";

const Trends = (props: CriteriaState) => {
  const { compare, param, disease, state, variant } = props;
  const criteria = criteriaVar();
  // const [compare, setCompare] = useState<IType | "">("");

  const { data, loading: trendLoading } = useQuery(GET_TRENDS, {
    variables: {
      state,
      disease,
      age: variant === "AGE" ? param : "",
      sex: variant === "SEX" ? param : "",
      race: variant === "RACE" ? param : "",
    },
  });

  const { data: compareData, loading } = useQuery(GET_COMPARE_TRENDS, {
    variables: {
      type: compare,
      state,
      disease,
      category: param,
    },
    skip: compare === "",
  });

  const compareTrends = useMemo(() => {
    let categories: any[] = [];
    if (criteria.compare === "disease") categories = DISEASES;
    else if (criteria.compare === "age") categories = AGE;
    else if (criteria.compare === "race") categories = RACE;
    else if (criteria.compare === "sex") categories = SEX;

    return compareData?.getCompareData?.map((compareYear: any) => {
      const trend: any = { year: compareYear.year };
      categories.forEach((category) => {
        trend[category] = 0;
      });
      compareYear?.fotmatedData.forEach((type: any) => {
        if (!type?.category) return;
        trend[type?.category] = type?.percentage;
      });
      return trend;
    });
  }, [compareData?.getCompareData, criteria.compare]);

  const handleCompare = async (key: IType) => {
    if (compare === key)
      criteriaVar({
        ...criteria,
        compare: "",
      });
    else {
      criteriaVar({
        ...criteria,
        compare: key,
      });
    }
  };

  const getImageUrl = (path: string, type: string) => {
    return `${compare === type ? "filters" : ""}${path}`;
  };

  const trends = trendLoading ? AREAGRAPH : data?.yearBasedAggregation;

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
                      <img
                        src={getImageUrl("/images/disease.svg", "disease")}
                        alt="Disease Icon"
                      />
                      Disease
                    </li>
                    <li
                      className={
                        compare === "race" ? styles["graph__menu--active"] : ""
                      }
                      onClick={() => handleCompare("race")}
                    >
                      <img
                        src={getImageUrl("/images/race.svg", "race")}
                        alt="Race Icon"
                      />
                      Race
                    </li>
                    <li
                      className={
                        compare === "sex" ? styles["graph__menu--active"] : ""
                      }
                      onClick={() => handleCompare("sex")}
                    >
                      <img
                        src={getImageUrl("/images/sex.svg", "sex")}
                        alt="Sex Icon"
                      />
                      Sex
                    </li>
                    <li
                      className={
                        compare === "age" ? styles["graph__menu--active"] : ""
                      }
                      onClick={() => handleCompare("age")}
                    >
                      <img
                        src={getImageUrl("/images/age.svg", "age")}
                        alt="Age Icon"
                      />
                      Age
                    </li>
                  </ul>
                </div>
                {/* <div className={styles.graph__chart}> */}
                {compare === "" ? (
                  <div className={styles.graph__wrapper}>
                    <AreaGraph loading={trendLoading} trends={trends} />
                  </div>
                ) : (
                  <div className={styles.graph__wrapper_stacked}>
                    <StackedAreaGraph
                      loading={loading}
                      type={compare}
                      trends={loading ? LINEGRAPH : compareTrends}
                    />
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
