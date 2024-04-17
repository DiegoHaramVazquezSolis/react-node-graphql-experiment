import { gql } from "@apollo/client";

const ADD_PLAYER = gql`
  mutation AddPlayer($first_name: String!, $last_name: String!, $team_id: ID!) {
    addPlayer(first_name: $first_name, last_name: $last_name, team_id: $team_id) {
      first_name,
      last_name,
    }
  }
`;

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id,
      first_name,
      last_name,
      team {
        name
      }
    }
  }
`;

export {
  ADD_PLAYER,
  GET_PLAYERS,
};