import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing";

import AddTeam from '@/app/add/team/page';
import { ADD_TEAM } from '@/utils/queries/team';

const mocks = [
  {
    request: {
      query: ADD_TEAM,
      variables: {
        name: "Test",
        image: "http://fakeimage.com"
      }
    },
    result: {
      data: {
        name: "Test",
        image: "http://fakeimage.com",
      }
    }
  }
]

test("TeamsList", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddTeam />
    </MockedProvider>
  );

  const nameInput = await screen.findByPlaceholderText("Team name");
  await userEvent.type(nameInput, "Test");

  const ImageInput = await screen.findByPlaceholderText("Team image URL");
  await userEvent.type(ImageInput, "http://fakeimage.com");

  const button = await screen.findByText("Save Team!");
  userEvent.click(button);

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Team succesfully added!")).toBeInTheDocument();
});