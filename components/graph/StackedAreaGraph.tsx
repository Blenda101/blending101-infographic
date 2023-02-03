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
  const { trends } = props;
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

  let height: string | number = "100%";
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
    height = 300;
  }
  if (width < 600) {
    height = 350;
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        width={500}
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
        {/* <Tooltip
          cursor={{ stroke: "#fe5d1f", strokeWidth: 1 }}
          formatter={(value, name) => [
            `${Number(value).toFixed(2)}%`,
            name.toString().toUpperCase(),
          ]}
        /> */}
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<CustomTooltip />}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="square"
          height={16}
          fontSize={16}
          formatter={CustomLegend}
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

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className={styles.linetip}>
        <p>{label}</p>
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
