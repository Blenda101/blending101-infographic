/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import { GET_CRITERIA } from "../../graphql/Incidence";
import { CriteriaState, criteriaVar } from "../../graphql/Infograph";

import styles from "./VariantProvider.module.scss";

interface IAuthContext {
  isDeath: boolean;
}

// INITIALIZE 1: CREATE AUTH CONTEXT
const VariantContext = createContext<IAuthContext>({
  isDeath: false,
});

// CONTEXT WRAPPER: PROVIDES AUTH
interface VariantProviderProps {
  children: React.ReactNode;
}

const VariantProvider: React.FC<VariantProviderProps> = (props) => {
  const { children } = props;
  // const criteria = criteriaVar();
  const [death, setDeath] = useState<any>(false);

  const onIncidenceSelect = () => {
    setDeath(false);
    const root: any = document.querySelector(":root");
    if (!root) return;
    // criteriaVar({ ...criteria, {disease: "Arthritis"} });

    root.style.setProperty("--header", "#fff");
    root.style.setProperty("--body", "#fff");
    root.style.setProperty("--title", "#000");
    root.style.setProperty("--disease", "#e8f8d2");
    root.style.setProperty("--params", "#f4f4f4");
    root.style.setProperty("--card", "#fff");
    root.style.setProperty("--primary", "#7bba38");

    root.style.setProperty("--state-range-1", "#e5f2d7");
    root.style.setProperty("--state-range-2", "#b0d788");
    root.style.setProperty("--state-range-3", "#7cbc39");
    root.style.setProperty("--state-range-4", "#fe5717");
    root.style.setProperty("--state-range-unavailable", "#e5e5e5");
    root.style.setProperty("--state-range-label", "#444");

    root.style.setProperty("--trends-bg", "#fff");
    root.style.setProperty("--trends-panel", "#f2f9ec");

    root.style.setProperty("--filter-inactive", "#fff6f2");
    root.style.setProperty("--filter-active", "#f8faf5");

    root.style.setProperty("--prevalence", "#f4f4f4");
    root.style.setProperty("--line", "#7CBC39");

    root.style.setProperty("--dropdown-active", "#eef8df");
    root.style.setProperty("--dropdown-inactive", "#ffe0d4");
  };

  const onDeathSelect = () => {
    setDeath(true);

    const root: any = document.querySelector(":root");
    if (!root) return;

    // criteriaVar({ ...criteria, disease: "", year: "2020" });

    root.style.setProperty("--header", "#161616");
    root.style.setProperty("--body", "#282220");
    root.style.setProperty("--title", "#D9D9D9");
    root.style.setProperty("--disease", "#2F2A29");
    root.style.setProperty("--params", "#2F2A29");
    root.style.setProperty("--card", "#282220");
    root.style.setProperty("--primary", "#7CBC39");

    root.style.setProperty("--state-range-1", "#394125");
    root.style.setProperty("--state-range-2", "#5A7E2F");
    root.style.setProperty("--state-range-3", "#7CBC39");
    root.style.setProperty("--state-range-4", "#FE5717");
    root.style.setProperty("--state-range-unavailable", "#3B3634");
    root.style.setProperty("--state-range-label", "#ddd");

    root.style.setProperty("--trends-bg", "#2F2A29");
    root.style.setProperty("--trends-panel", "#37392B");

    root.style.setProperty("--filter-inactive", "#282220");
    root.style.setProperty("--filter-active", "#282220");

    root.style.setProperty("--prevalence", "#1F1C1B");
    root.style.setProperty("--line", "#161616");

    root.style.setProperty("--dropdown-active", "#28301c");
    root.style.setProperty("--dropdown-inactive", "#59382B");
  };

  return (
    <VariantContext.Provider
      value={{
        isDeath: death,
      }}
    >
      <div className={styles.wrapper}>
        <div
          className={`${styles["custom-tabs__links"]}  ${styles["custom-tabs__links--rounded"]}`}
        >
          <a
            className={!death ? styles.active : ""}
            style={{ color: death ? "#fff" : "#fe5209" }}
            onClick={onIncidenceSelect}
          >
            <img
              src={
                death ? "/images/Ambulance-White.svg" : "/images/Ambulance.svg"
              }
              alt="Icon"
            />
            Incidence
          </a>
          <a className={death ? styles.active : ""} onClick={onDeathSelect}>
            <img src="/images/Death.svg" alt="Icon" />
            Deaths
          </a>
        </div>
      </div>
      {children}
    </VariantContext.Provider>
  );
};

export default VariantProvider;

export const useVariant = () => {
  const { isDeath } = useContext(VariantContext);
  return isDeath;
};

export const useDataset = () => {
  const { isDeath } = useContext(VariantContext);
  return isDeath ? "death" : "incidence";
};

export const useCriteria = () => {
  const { isDeath } = useContext(VariantContext);
  const { data: criteriaState, loading } = useQuery<{
    criteria: CriteriaState;
  }>(GET_CRITERIA);
  return isDeath
    ? criteriaState?.criteria?.death
    : criteriaState?.criteria?.incidence;
};
