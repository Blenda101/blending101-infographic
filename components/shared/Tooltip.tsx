import { useApolloClient, useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Tooltip as Popover, ITooltip } from "react-tooltip";
import { GET_CRITERIA, GET_STATE_DATA } from "../../graphql/Incidence";

import styles from "./Tooltip.module.scss";

interface TooltipProps extends ITooltip {
  title?: string;
  value?: string | number;
  dot?: string;
}

const Tooltip = (props: TooltipProps) => {
  const { title, value, dot } = props;
  const { data } = useQuery(GET_CRITERIA);
  const client = useApolloClient();

  return (
    <div id="tooltip" className={styles.tooltip}>
      <p id="tooltip-title">{title}</p>
      <span>
        {data?.criteria?.year ? `${data?.criteria?.year}, ` : ""}
        {data?.criteria?.disease}
        {data?.criteria?.param ? `, ${data?.criteria?.param}` : ""}
        {!dot && data?.criteria?.state ? `, ${data?.criteria?.state}` : ""}
      </span>
      <h6 style={{ color: dot ? "#ededed" : "#7bba38" }}>
        <span style={{ backgroundColor: dot }}></span>
        {value
          ? typeof value === "string"
            ? parseFloat(value)?.toFixed(1)
            : value.toFixed(1)
          : 0}
        %
      </h6>
    </div>
  );
};

export default Tooltip;
