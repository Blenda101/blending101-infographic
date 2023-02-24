import { makeVar, ReactiveVar } from "@apollo/client";

export type IVariant = "" | "RACE" | "SEX" | "AGE";

export interface VariantState {
  disease: string;
  diseaseImage: string;
  param: string;
  paramImage: string;
  race: string;
  raceImage: string;
  age: string;
  ageImage: string;
  sex: string;
  sexImage: string;
  variant: IVariant;
  year: string;
  state: string;
  compare: "disease" | "race" | "sex" | "age" | "";
}

export interface CriteriaState {
  incidence: VariantState;
  death: VariantState;
}

const Incidence: VariantState = {
  disease: "Arthritis",
  diseaseImage: "/images/Arthritis.svg",
  param: "",
  paramImage: "",
  race: "",
  raceImage: "",
  age: "",
  ageImage: "",
  sex: "",
  sexImage: "",
  variant: "",
  year: "2021",
  state: "",
  compare: "",
};

const Death: VariantState = {
  disease: "Alzheimer & Dementia",
  diseaseImage: "/images/Arthritis.svg",
  param: "",
  paramImage: "",
  race: "",
  raceImage: "",
  age: "",
  ageImage: "",
  sex: "",
  sexImage: "",
  variant: "",
  year: "2020",
  state: "",
  compare: "",
};

const initialState: CriteriaState = {
  incidence: Incidence,
  death: Death,
};

export const criteriaVar: ReactiveVar<CriteriaState> =
  makeVar<CriteriaState>(initialState);
