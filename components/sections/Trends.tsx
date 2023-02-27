/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { AREAGRAPH, LINEGRAPH } from "../../data/Trends";

import styles from "./Trends.module.scss";
import { GET_COMPARE_TRENDS, GET_TRENDS } from "../../graphql/Incidence";
import { criteriaVar, VariantState } from "../../graphql/Infograph";
import AreaGraph from "../graph/AreaGraph";
import StackedAreaGraph, { IType } from "../graph/StackedAreaGraph";
import {
  AGE,
  DEATH_AGE,
  DEATH_DISEASES,
  DISEASES,
  RACE,
  SEX,
} from "../../data/Category";
import { useDataset, useVariant } from "../context/VariantProvider";

const Trends = (props: VariantState) => {
  const { compare, param, disease, state, variant, race, sex, age } = props;
  const criteria = criteriaVar();
  const type = useDataset();
  const isDeath = useVariant();

  const { data, loading: trendLoading } = useQuery(GET_TRENDS, {
    variables: {
      state,
      disease,
      race,
      sex,
      age,
      dataSet: type,
    },
  });

  const { data: compareData, loading } = useQuery(GET_COMPARE_TRENDS, {
    variables: {
      type: compare,
      state,
      disease,
      race,
      sex,
      age,
      dataSet: type,
    },
    skip: compare === "",
  });

  const compareTrends = useMemo(() => {
    let categories: any[] = [];
    if (criteria[type]?.compare === "disease")
      categories = isDeath ? DEATH_DISEASES : DISEASES;
    else if (criteria[type]?.compare === "age")
      categories = isDeath ? DEATH_AGE : AGE;
    else if (criteria[type]?.compare === "race") categories = RACE;
    else if (criteria[type]?.compare === "sex") categories = SEX;

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
  }, [compareData?.getCompareData, criteria, isDeath, type]);

  const handleCompare = async (key: IType) => {
    if (compare === key)
      criteriaVar({
        ...criteria,
        [type]: {
          ...criteria[type],
          compare: "",
        },
      });
    else {
      criteriaVar({
        ...criteria,
        [type]: {
          ...criteria[type],
          compare: key,
        },
      });
    }
  };

  const getImageUrl = (path: string, type: string) => {
    return `${compare === type ? "filters" : isDeath ? "dark" : ""}${path}`;
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
      {isDeath && <span className={styles.note}>Deaths in 1000000</span>}
    </section>
  );
};

export default Trends;
