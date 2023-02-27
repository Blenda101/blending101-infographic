import { useApolloClient, useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Tooltip as Popover, ITooltip } from "react-tooltip";
import { GET_CRITERIA, GET_STATE_DATA } from "../../graphql/Incidence";
import { useCriteria, useVariant } from "../context/VariantProvider";

import styles from "./Tooltip.module.scss";

interface TooltipProps extends ITooltip {
  title?: string;
  value?: string | number;
  dot?: string;
}

const Tooltip = (props: TooltipProps) => {
  const { title, value, dot } = props;
  const criteria = useCriteria();
  const isDeath = useVariant();

  return (
    <div id="tooltip" className={styles.tooltip}>
      <p id="tooltip-title">{title}</p>
      <span>
        {criteria?.year ? `${criteria?.year}, ` : ""}
        {criteria?.disease}
        {criteria?.param ? `, ${criteria?.param}` : ""}
        {!dot && criteria?.state ? `, ${criteria?.state}` : ""}
      </span>
      <h6 style={{ color: dot ? "#ededed" : "#7bba38" }}>
        <span style={{ backgroundColor: dot }}></span>
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
