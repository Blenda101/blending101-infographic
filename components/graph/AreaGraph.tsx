import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import {
  AreaChart,
  XAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { criteriaVar } from "../../graphql/Infograph";
import { GET_CRITERIA } from "../../graphql/Incidence";
import useWindowSize from "../../hooks/useWindowSize";
import {
  useCriteria,
  useDataset,
  useVariant,
} from "../context/VariantProvider";
import styles from "./AreaGraph.module.scss";

const AreaGraph = ({ trends, loading }: any) => {
  const width = useWindowSize();
  const isDeath = useVariant();
  const type = useDataset();

  const changeYearHandler = (year: any) => {
    const criteria = criteriaVar();
    criteriaVar({
      ...criteria,
      [type]: { ...criteria[type], year: year.value },
    });
  };

  return (
    <ResponsiveContainer width={width < 600 ? "180%" : "100%"} height="100%">
      <AreaChart
        // width={500}
        height={400}
        data={trends}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {isDeath ? (
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#525252" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#525252" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#313130" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#313130" stopOpacity={0} />
            </linearGradient>
          </defs>
        ) : (
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffece6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffece6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
        )}
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          onClick={changeYearHandler}
          tick={<CustomYears />}
        />
        {/* <YAxis dataKey="peoples" /> */}
        {!loading && (
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={<CustomTooltip />}
          />
        )}
        <Area
          type="monotone"
          dataKey="peoples"
          stroke={loading ? "none" : "#fe5e21"}
          strokeWidth={4}
          fillOpacity={1}
          fill={"url(#colorUv)"}
          activeDot={<CustomActiveDot />}
        />
      </AreaChart>
    </ResponsiveContainer>
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
  const { x, y, payload, width } = props;
  const isDeath = useVariant();
  const criteria = useCriteria();
  const isSelectedYear = payload.value === criteria?.year;
  const isPhone = width < 600;
  return (
    <Fragment>
      <rect
        width={isPhone ? "50" : "56"}
        height="30"
        x={isPhone ? x - 26 : x - 29}
        y={y - 20}
        rx={15}
        className={`${styles.year__button} ${
          isSelectedYear ? styles["year__button--active"] : ""
        }`}
        style={{
          filter:
            isSelectedYear && isDeath
              ? "none"
              : "drop-shadow(0px 3px 3px #ccc)",
        }}
      />
      <text
        x={x}
        y={y}
        className={`${styles.year__text}  ${
          isSelectedYear ? styles["year__text--active"] : ""
        }`}
      >
        {payload.value}
      </text>
    </Fragment>
  );
};

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;
  const criteria = useCriteria();
  const isDeath = useVariant();

  if (active && payload && payload.length) {
    let criteriaFilters = [];
    criteriaFilters.push(criteria?.disease);
    criteria?.sex && criteriaFilters.push(criteria?.sex);
    criteria?.race && criteriaFilters.push(criteria?.race);
    criteria?.age && criteriaFilters.push(criteria?.age);
    criteria?.state && criteriaFilters.push(criteria?.state);

    return (
      <div className={styles.areatip}>
        <p>{label}</p>
        <span>{criteriaFilters?.join(", ")}</span>
        <h6>
          {isDeath ? Math.round(payload[0].value) : payload[0].value.toFixed(1)}{" "}
          {isDeath ? "" : "%"}
        </h6>
      </div>
    );
  }

  return null;
};

export default AreaGraph;
