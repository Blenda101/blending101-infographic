import React, { Fragment } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";

import data from "../../data/Trends";

import styles from "./Trends.module.scss";
import { GET_CRITERIA, GET_TRENDS } from "../../graphql/Query";
import { criteriaVar } from "../../graphql/Infograph";

const Trends = () => {
  const { data } = useQuery(GET_TRENDS);
  const trends = data?.yearBasedAggregation || [];

  const changeYearHandler = (year: any) => {
    const criteria = criteriaVar();
    criteriaVar({ ...criteria, year: year.value });
  };

  return (
    <section id="Trends">
      <div className="continer-fluid w-90">
        <div className="row">
          <div className="col-12">
            <div className="tabs">
              <div className="tabs-heading">
                <h3>Trends</h3>
              </div>
              {/* <div className="small-button">
                <ul>
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> Heart
                      Disease
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> Black
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> Male
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="/images/fa_heartbeat.svg" alt="" /> 50-59
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className={styles.graph}>
                <div className={styles.graph__panel}>
                  <h2 className={styles.graph__title}>Compare</h2>
                  <ul className={styles.graph__menu}>
                    <li>
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Disease
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Race
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Sex
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faHeartPulse} />
                      Age
                    </li>
                  </ul>
                </div>
                <div className={styles.graph__wrapper}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      width={500}
                      height={400}
                      data={trends}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ffece6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ffece6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        onClick={changeYearHandler}
                        tick={<CustomYears />}
                      />
                      <Tooltip
                        cursor={{ stroke: "#fe5d1f", strokeWidth: 1 }}
                        formatter={(value, name) => [
                          `${Number(value).toFixed(2)}%`,
                          name.toString().toUpperCase(),
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="peoples"
                        stroke="#fe5e21"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        activeDot={<CustomActiveDot />}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomActiveDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={10}
      stroke="#FFA27E"
      stroke-width={5}
      fill="#FE5717"
    />
  );
};
const CustomYears = (props: any) => {
  const { x, y, payload } = props;
  const { data } = useQuery(GET_CRITERIA);
  const isSelectedYear = payload.value === data?.criteria?.year;
  return (
    <Fragment>
      <rect
        width="56"
        height="30"
        x={x - 29}
        y={y - 20}
        rx={15}
        className={`${styles.year__button} ${
          isSelectedYear ? styles["year__button--active"] : ""
        }`}
      />
      <text x={x} y={y} className={styles.year__text}>
        {payload.value}
      </text>
    </Fragment>
  );
};

export default Trends;
