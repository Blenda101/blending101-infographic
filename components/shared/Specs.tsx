/* eslint-disable @next/next/no-img-element */
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import React from "react";
import { useVariant } from "../context/VariantProvider";
import styles from "./Specs.module.scss";
import Tooltip from "./Tooltip";

export type ICategory = { _id: string; percentage: number };

interface SpecsProps {
  active: string;
  caption: string;
  value: string | number;
  icon?: IconDefinition;
  image?: string;
  onClick?: any;
  type?: "DISEASE" | "RACE" | "SEX" | "AGE" | "STATE";
}

const Specs = (props: SpecsProps) => {
  const { active, caption, value, type, image, onClick } = props;
  const isDeath = useVariant();
  return (
    <Tippy
      content={<Tooltip title={caption} value={value} type={type} />}
      placement="bottom"
      delay={[2000, 200]}
    >
      <div
        id={caption}
        className={`small-icon ${
          active === caption ? "small-icon-active" : ""
        }`}
        onClick={onClick}
      >
        <div className={styles.progress}>
          <svg className={styles.progress__svg} viewBox="0 0 75 75">
            {isDeath ? (
              <defs>
                <linearGradient id="outline" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#2F2A29", stopOpacity: 1 }}
                  />
                  <stop
                    offset="20%"
                    style={{ stopColor: "#2F2A29", stopOpacity: 1 }}
                  />
                  <stop
                    offset="60%"
                    style={{ stopColor: "#4E4746", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#4E4746", stopOpacity: 1 }}
                  />
                </linearGradient>
                <linearGradient id="inside" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#2E2928", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#4E4C4C", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            ) : (
              <defs>
                <linearGradient id="outline" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#fff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="20%"
                    style={{ stopColor: "#fff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="60%"
                    style={{ stopColor: "#eee", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#eee", stopOpacity: 1 }}
                  />
                </linearGradient>
                <linearGradient id="inside" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#fff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#ddd", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            )}

            <circle cx="34" cy="34" r="28" />
            <circle
              cx="34"
              cy="34"
              r="28"
              style={{
                stroke: isDeath ? "transparent" : "#7bba38",
                strokeDashoffset: 176 - (176 * +value) / 100,
              }}
            />
            <circle cx="34" cy="34" r="34" stroke="url(#outline)" />
          </svg>
          <div className={styles.progress__icon}>
            {image ? <img src={image} alt={caption} /> : null}
          </div>
        </div>
        <div className="desc">
          <p>{caption}</p>
          <p className="numbers">
            {value}
            {isDeath ? "" : "%"}
          </p>
        </div>
      </div>
    </Tippy>
  );
};

export default Specs;
