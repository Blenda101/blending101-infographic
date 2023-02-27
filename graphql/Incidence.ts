import { gql } from "@apollo/client";

export const GET_SUMMARY = gql`
  query Summary(
    $year: String
    $state: String
    $disease: String
    $age: String
    $sex: String
    $race: String
    $dataSet: String
  ) {
    showInfoData(
      state: $state
      year: $year
      sex: $sex
      age: $age
      race: $race
      disease: $disease
      dataSet: $dataSet
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
    $dataSet: String
  ) {
    yearBasedAggregation(
      race: $race
      state: $state
      disease: $disease
      sex: $sex
      age: $age
      dataSet: $dataSet
    ) {
      name: _id
      peoples: percentage
    }
  }
`;

export const GET_COMPARE_TRENDS = gql`
  query GetCompareTrends(
    $type: String!
    $state: String
    $disease: String
    $age: String
    $sex: String
    $race: String
    $dataSet: String
  ) {
    getCompareData(
      type: $type
      state: $state
      disease: $disease
      sex: $sex
      age: $age
      race: $race
      dataSet: $dataSet
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
      incidence {
        year
        param
        paramImage
        disease
        diseaseImage
        state
        variant
        compare
        age
        ageImage
        sex
        sexImage
        race
        raceImage
      }
      death {
        year
        param
        paramImage
        disease
        diseaseImage
        state
        variant
        compare
        age
        ageImage
        sex
        sexImage
        race
        raceImage
      }
    }
  }
`;

export const GET_STATE_DATA = gql`
  query GetStateData(
    $dataSet: String
    $age: String
    $sex: String
    $race: String
    $disease: String
    $year: String
  ) {
    getStateData(
      dataSet: $dataSet
      sex: $sex
      age: $age
      race: $race
      disease: $disease
      year: $year
    )
  }
`;
