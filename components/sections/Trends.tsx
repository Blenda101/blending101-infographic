import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

import data from "../../data/Trends";

import styles from "./Trends.module.scss";

const Trends = () => {
  return (
    <section id="Trends">
      <div className="continer-fluid w-90">
        <div className="row">
          <div className="col-12">
            <div className="tabs">
              <div className="tabs-heading">
                <h3>Trends</h3>
              </div>
              <div className="small-button">
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
              </div>
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
                      data={data}
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
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#fe5e21"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorUv)"
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

export default Trends;
