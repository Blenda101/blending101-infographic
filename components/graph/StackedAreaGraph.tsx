import React, { Fragment, useMemo } from "react";
import {
  AreaChart,
  XAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { useQuery } from "@apollo/client";

import { criteriaVar } from "../../graphql/Infograph";
import { GET_CRITERIA } from "../../graphql/Query";

import styles from "./AreaGraph.module.scss";
import COLORS from "../../data/Colors";
import useWindowSize from "../../hooks/useWindowSize";

export type IType = "disease" | "sex" | "race" | "age";
interface StackedAreaGraphProps {
  trends: any[];
  type: IType;
}

const StackedAreaGraph = (props: StackedAreaGraphProps) => {
  const { trends, type } = props;
  const width = useWindowSize();

  const changeYearHandler = (year: any) => {
    const criteria = criteriaVar();
    criteriaVar({ ...criteria, year: year.value });
  };

  const categories = useMemo(() => {
    return trends && trends?.length > 0
      ? Object.keys(trends[0]).filter((trend) => trend !== "year")
      : [];
  }, [trends]);

  let height: string | number = 420;
  if (width < 1600) {
    height = 380;
  }
  if (width < 1200) {
    height = 350;
  }
  if (width < 900) {
    height = 280;
  }
  if (width < 600) {
    height = 350;
  }
  if (width < 400) {
    height = 400;
  }
  return (
    <ResponsiveContainer width={width < 600 ? "170%" : "100%"} height={height}>
      <LineChart
        width={500}
        data={trends}
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 50,
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
          tick={<CustomYears width={width} />}
        />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<CustomTooltip type={type} />}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="square"
          height={16}
          fontSize={16}
          formatter={CustomLegend}
          wrapperStyle={{
            top: "100%",
          }}
        />
        {categories?.map((category, idx) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`#${COLORS[idx]}`}
            strokeWidth={4}
            activeDot={<CustomActiveDot />}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomLegend = (value: string, entry: any) => {
  return <span className={styles.legends}>{value}</span>;
};

const CustomActiveDot = (props: any) => {
  const { cx, cy, fill } = props;
  return (
    <Fragment>
      <circle cx={cx} cy={cy} r={8} fill={fill} />
      <circle cx={cx} cy={cy} r={15} fill={fill} opacity={0.2} />
    </Fragment>
  );
};
const CustomYears = (props: any) => {
  const { x, y, payload, width } = props;
  const { data } = useQuery(GET_CRITERIA);
  const isSelectedYear = payload.value === data?.criteria?.year;
  const isPhone = width < 600;
  return (
    <Fragment>
      <rect
        width={isPhone ? "50" : "56"}
        height="30"
        x={isPhone ? x - 26 : x - 29}
        y={y - 3}
        rx={15}
        className={`${styles.year__button} ${
          isSelectedYear ? styles["year__button--active"] : ""
        }`}
      />
      <text x={x} y={y + 18} className={styles.year__text}>
        {payload.value}
      </text>
    </Fragment>
  );
};

const CustomTooltip = (props: { type: IType; [key: string]: any }) => {
  const { active, payload, label, type } = props;
  const { data } = useQuery(GET_CRITERIA);
  if (active && payload && payload.length) {
    let criteria = [];
    if (type !== "disease") criteria.push(data?.criteria?.disease);
    if (type === "disease") criteria.push(data?.criteria?.param);
    if (data?.criteria?.state) criteria.push(data?.criteria?.state);
    return (
      <div className={styles.linetip}>
        <p>
          {label}
          <br /> <span>{criteria.join(", ")}</span>
        </p>
        <ul>
          {payload?.map((item: any) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <h6 style={{ color: item.stroke }}>{item.value.toFixed(1)}%</h6>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
export default StackedAreaGraph;
