import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing";

import { PlayersList } from '@/components/PlayersList';
import { GET_PLAYERS } from '@/utils/queries/player';

const mocks = [
  {
    delay: 30,
    request: {
      query: GET_PLAYERS
    },
    result: {
      data: {
        players: [
          {
            id: 1,
            first_name: 'Diego',
            last_name: 'Vazquez',
            team: {
              name: 'Bayern Munchen'
            }
          }
        ]
      }
    }
  }
];

test('PlayersList', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PlayersList />
    </MockedProvider>
  );

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Diego Vazquez: Bayern Munchen")).toBeInTheDocument();
});