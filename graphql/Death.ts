import { gql } from "@apollo/client";

export const GET_SUMMARY = gql`
  query Summary($year: String, $state: String) {
    showInfoData2(state: $state, year: $year) {
      diseases {
        _id
        percentage
      }
      race {
        _id
        percentage
      }
      age {
        _id
        percentage
      }
      sex {
        _id
        percentage
      }
    }
  }
`;

export const GET_TRENDS = gql`
  query GetTrends(
    $race: String
    $state: String
    $disease: String
    $age: String
    $sex: String
  ) {
    yearBasedAggregation2(
      race: $race
      state: $state
      disease: $disease
      sex: $sex
      age: $age
    ) {
      name: _id
      peoples: percentage
    }
  }
`;

export const GET_COMPARE_TRENDS = gql`
  query GetCompareTrends(
    $type: String!
    $sex: String
    $age: String
    $state: String
    $disease: String
    $race: String
  ) {
    getCompareData2(
      type: $type
      state: $state
      disease: $disease
      sex: $sex
      age: $age
      race: $race
    ) {
      year
      fotmatedData {
        category: _id
        sampleSize
        value
        percentage
      }
    }
  }
`;

export const GET_CRITERIA = gql`
  query Criteria {
    criteria @client {
      year
      param
      paramImage
      disease
      diseaseImage
      state
      variant
      compare
    }
  }
`;

export const GET_STATE_DATA = gql`
  query GetStateData(
    $sex: String
    $year: String
    $age: String
    $disease: String
    $race: String
  ) {
    getStateData2(
      sex: $sex
      disease: $disease
      year: $year
      age: $age
      race: $race
    )
  }
`;
