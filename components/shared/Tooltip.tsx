import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Tooltip as Popover, ITooltip } from "react-tooltip";
import { GET_CRITERIA } from "../../graphql/Query";

import styles from "./Tooltip.module.scss";

interface TooltipProps extends ITooltip {
  anchor: string;
  title: string;
  value: string | number;
  dot?: string;
}

const Tooltip = (props: TooltipProps) => {
  const { anchor, title, value, dot, ...tooltip } = props;
  const { data } = useQuery(GET_CRITERIA);
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Popover
      anchorId={anchor}
      delayShow={2000}
      className={styles.tooltip}
      classNameArrow={styles.tooltip__arrow}
      {...tooltip}
    >
      <p>{title}</p>
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
    </Popover>
  ) : (
    <Fragment />
  );
};

export default Tooltip;
