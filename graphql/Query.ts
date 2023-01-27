import { gql } from "@apollo/client";

export const GET_SUMMARY = gql`
  query Summary(
    $year: String
    $state: String
    $disease: String
    $age: String
    $sex: String
    $race: String
  ) {
    showInfoData(
      state: $state
      year: $year
      sex: $sex
      age: $age
      race: $race
      disease: $disease
    ) {
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
    yearBasedAggregation(
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
  query GetCompareTrends($type: String!) {
    getCompareData(type: $type) {
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
      disease
      state
      variant
    }
  }
`;

export const GET_STATE_DATA = gql`
  query GetStateData {
    getStateData
  }
`;
