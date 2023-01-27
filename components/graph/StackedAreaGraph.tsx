import React, { Fragment, useMemo } from "react";
import {
  AreaChart,
  XAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@apollo/client";

import { criteriaVar } from "../../graphql/Infograph";
import { GET_CRITERIA } from "../../graphql/Query";

import styles from "./AreaGraph.module.scss";
import COLORS from "../../data/Colors";

export type IType = "disease" | "sex" | "race" | "age";
interface StackedAreaGraphProps {
  trends: any[];
  type: IType;
}

const StackedAreaGraph = (props: StackedAreaGraphProps) => {
  const { type, trends } = props;

  const changeYearHandler = (year: any) => {
    const criteria = criteriaVar();
    criteriaVar({ ...criteria, year: year.value });
  };

  const categories = useMemo(() => {
    return trends && trends?.length > 0
      ? Object.keys(trends[0]).filter((trend) => trend !== "year")
      : [];
  }, [trends]);

  return (
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
          {COLORS.map((color) => (
            <linearGradient key={color} id={color} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`#${color}`} stopOpacity={0.2} />
              <stop offset="95%" stopColor={`#${color}`} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          dataKey="year"
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
        <Legend
          verticalAlign="bottom"
          iconType="square"
          height={16}
          fontSize={16}
          formatter={CustomLegend}
        />
        {categories?.map((category, idx) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`#${COLORS[idx]}`}
            strokeWidth={4}
            fillOpacity={1}
            fill={`url(#${COLORS[idx]})`}
            activeDot={<CustomActiveDot />}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomLegend = (value: string, entry: any) => {
  const { color } = entry;

  return (
    <span
      style={{
        color: "#333",
        transform: "translateY(1px)",
        display: "inline-block",
      }}
    >
      {value}
    </span>
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

export default StackedAreaGraph;
