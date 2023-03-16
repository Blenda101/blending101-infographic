import React from "react";
import { useCriteria, useVariant } from "../context/VariantProvider";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  title?: string;
  value?: string | number;
  type?: "DISEASE" | "RACE" | "SEX" | "AGE" | "STATE";
  dot?: string;
}

const Tooltip = (props: TooltipProps) => {
  const { title, value, type, dot } = props;
  const criteria = useCriteria();
  const isDeath = useVariant();

  let criteriaFilters = [];
  criteria?.year && criteriaFilters.push(criteria?.year);
  type !== "DISEASE" &&
    criteria?.disease &&
    criteriaFilters.push(criteria?.disease);
  type !== "SEX" && criteria?.sex && criteriaFilters.push(criteria?.sex);
  type !== "RACE" && criteria?.race && criteriaFilters.push(criteria?.race);
  type !== "AGE" && criteria?.age && criteriaFilters.push(criteria?.age);
  type !== "STATE" && criteria?.state && criteriaFilters.push(criteria?.state);

  return (
    <div id="tooltip" className={styles.tooltip}>
      <p id="tooltip-title">{title}</p>
      <span>{criteriaFilters?.join(", ")}</span>
      <h6 style={{ color: dot ? "#ededed" : "#7bba38" }}>
        {dot && <span style={{ backgroundColor: dot }}></span>}
        {value
          ? isDeath
            ? Math.round(+value)
            : typeof value === "string"
            ? parseFloat(value)?.toFixed(1)
            : value.toFixed(1)
          : 0}
        {isDeath ? "" : "%"}
      </h6>
    </div>
  );
};

export default Tooltip;
