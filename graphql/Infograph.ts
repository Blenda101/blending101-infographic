import { makeVar, ReactiveVar } from "@apollo/client";

export type IVariant = "" | "RACE" | "SEX" | "AGE";
export interface CriteriaState {
  disease: string;
  diseaseImage: string;
  param: string;
  paramImage: string;
  variant: IVariant;
  year: string;
  state: string;
}

const initialState: CriteriaState = {
  disease: "Arthritis",
  diseaseImage: "/images/Cancer.svg",
  param: "",
  paramImage: "",
  variant: "",
  year: "2021",
  state: "",
};

export const criteriaVar: ReactiveVar<CriteriaState> =
  makeVar<CriteriaState>(initialState);
