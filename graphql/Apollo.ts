import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { criteriaVar } from "./Infograph";

const API_URL = "https://inforepo-production.up.railway.app/graphql";

const typeDefs = gql`
  type Criteria {
    disease: String
    param: String
    year: String
    state: String
    variant: String
  }
  extend type Query {
    criteria: Criteria
  }
`;

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        criteria: {
          read() {
            return criteriaVar();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: API_URL,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
  typeDefs,
});

export default client;
