import { gql } from "@apollo/client";

const ADD_TEAM = gql`
  mutation AddTeam($name: String!, $image: String!) {
    addTeam(name: $name, image: $image) {
      name,
      image,
    }
  }
`;

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id,
      name,
      image,
    }
  }
`;

export {
  ADD_TEAM,
  GET_TEAMS,
};