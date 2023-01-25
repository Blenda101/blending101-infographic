import { makeVar, ReactiveVar } from "@apollo/client";

export interface CriteriaState {
  disease: string;
  param: string;
  year: string;
  state: string;
}

const initialState: CriteriaState = {
  disease: "",
  param: "",
  year: "2021",
  state: "",
};

export const criteriaVar: ReactiveVar<CriteriaState> =
  makeVar<CriteriaState>(initialState);
