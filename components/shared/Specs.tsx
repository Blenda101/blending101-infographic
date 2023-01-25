import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Specs.module.scss";

export type ICategory = { _id: string; percentage: number };

interface SpecsProps {
  active: string;
  caption: string;
  value: number;
  icon?: IconDefinition;
  image?: string;
}

const Specs = (props: SpecsProps) => {
  const { active, caption, value, icon, image } = props;
  return (
    <div
      className={`small-icon ${active === caption ? "small-icon-active" : ""}`}
    >
      <div className={styles.progress}>
        <svg className={styles.progress__svg}>
          <defs>
            <linearGradient id="outline" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 1 }} />
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
              <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 1 }} />
              <stop
                offset="100%"
                style={{ stopColor: "#ddd", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          <circle cx="34" cy="34" r="28" />
          <circle
            cx="34"
            cy="34"
            r="28"
            style={{ strokeDashoffset: 176 - (176 * value) / 100 }}
          />
          <circle cx="34" cy="34" r="34" stroke="url(#outline)" />
        </svg>
        <div className={styles.progress__icon}>
          {icon ? <FontAwesomeIcon icon={icon} /> : null}
          {image ? <img src={image} alt={caption} /> : null}
        </div>
      </div>
      <div className="desc">
        <p>{caption}</p>
        <p className="numbers">{value}%</p>
      </div>
    </div>
  );
};

export default Specs;
