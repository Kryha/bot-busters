/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { ListRow } from "./list-row";

describe("Leaderboard", () => {
  it("test leaderboard row entry", () => {
    //MOCK
    const leaderboardData = {
      rank: 1,
      avatar: "avatar.jpeg",
      username: "JohnDoe",
      score: 20,
      address: "aleoAddresss0000000",
    };

    //RENDER
    render(<ListRow leaderboard={leaderboardData} />);

    //ASSERT
    expect(screen.getByText(/^JohnDoe/)).toHaveTextContent("JohnDoe");
  });
});
