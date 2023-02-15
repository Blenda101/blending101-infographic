import { useApolloClient, useQuery } from "@apollo/client";
import Tippy from "@tippyjs/react";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { criteriaVar } from "../../graphql/Infograph";
import { GET_CRITERIA, GET_STATE_DATA } from "../../graphql/Query";
import { useVariant } from "../context/VariantProvider";
import Tooltip from "./Tooltip";

import styles from "./Tooltip.module.scss";

interface StateProps {
  id: string;
  maps: any;
  children: React.ReactNode;
}
const State = (props: StateProps) => {
  const { id, maps, children } = props;
  const criteria = criteriaVar();
  const stateRef = useRef<SVGGElement>(null);
  const isDeath = useVariant();
  const [color, textColor] = useMemo(() => {
    const value = maps ? (maps as any)[id]?.quartile : 0;
    let color = "",
      text = "";
    if (isDeath) {
      text = "#E8E8E8";
      if (value === 1) {
        color = "#394125";
        text = "#E8E8E8";
      } else if (value === 2) {
        color = "#5A7E2F";
        text = "#E8E8E8";
      } else if (value === 3) {
        color = "#7CBC39";
        text = "#E8E8E8";
      } else if (value === 4) {
        color = "#FE5717";
        text = "white";
      } else {
        color = "#3B3634";
        text = "white";
      }
    } else {
      if (value === 1) {
        color = "#E5F2D7";
        text = "black";
      } else if (value === 2) {
        color = "#B0D788";
        text = "black";
      } else if (value === 3) {
        color = "#7CBC39";
        text = "white";
      } else if (value === 4) {
        color = "#FE5717";
        text = "white";
      } else {
        color = "#E5E5E5";
        text = "black";
      }
    }
    return [color, text];
  }, [id, isDeath, maps]);

  useEffect(() => {
    if (!stateRef.current) return;
    const text: SVGPathElement = stateRef.current.children[1] as any;
    const polygon: SVGPathElement = stateRef.current.children[0] as any;

    polygon.style.opacity = "1";
    polygon.style.fill = color;
    polygon.style.outline = "none";
    text.style.fill = textColor;

    if (id === criteria.state) {
      // IF THAT STATE IS ALREADY SELECTED -> UNSELECT
      polygon.style.stroke = isDeath ? "#fff" : "#333";
      polygon.style.strokeWidth = "3";
      text.style.stroke = "none";
    } else {
      polygon.style.stroke = "none";
    }
  }, [color, criteria.state, id, isDeath, textColor]);

  const stateSelectHandler = () => {
    if (id !== criteria.state) {
      criteriaVar({
        ...criteria,
        state: id,
      });
    } else {
      criteriaVar({
        ...criteria,
        state: "",
      });
    }
  };

  return (
    <Tippy
      content={
        <Tooltip
          title={maps ? maps[id]?.fullForm : ""}
          value={maps ? maps[id]?.percentage : 0}
          dot={color}
        />
      }
      placement="bottom"
      delay={[2000, 200]}
      // TO DEBUG THE TOOLTIP
      // hideOnClick={false}
      // trigger={"click"}
      // interactive
    >
      <g
        id={id}
        ref={stateRef}
        style={{ cursor: "pointer" }}
        onClick={stateSelectHandler}
      >
        {children}
      </g>
    </Tippy>
  );
};
export default State;
