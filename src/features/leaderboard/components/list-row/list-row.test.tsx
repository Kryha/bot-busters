/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { ListRow } from "./list-row";

describe("Leaderboard list", () => {
  it("Should render rows of User data", () => {
    const leaderboardData = {
      rank: 1,
      avatar: "avatar.jpeg",
      username: "JohnDoe",
      score: 20,
      address: "aleoAddresss0000000",
    };

    render(<ListRow leaderboard={leaderboardData} />);

    expect(screen.getByText(/^JohnDoe/)).toHaveTextContent("JohnDoe");
  });
});
