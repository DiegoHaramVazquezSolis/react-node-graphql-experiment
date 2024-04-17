import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing";

import { TeamsList } from '@/components/TeamsList';
import { GET_TEAMS } from '@/utils/queries/team';

const mocks = [
  {
    delay: 30,
    request: {
      query: GET_TEAMS
    },
    result: {
      data: {
        teams: [
          {
            id: 1,
            name: 'Bayern Munchen',
            image: 'https://fakeimage.com'
          }
        ]
      }
    }
  }
];

test('TeamsList', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TeamsList />
    </MockedProvider>
  );

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Bayern Munchen")).toBeInTheDocument();
});