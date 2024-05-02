import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import HeroList from "./HeroList";

const mockHeroData = [
  { id: "1", name: "Hero 1", image: "http://hero1.jpg" },
  { id: "2", name: "Hero 2", image: "http://hero2.jpg" },
];

const mockFunc = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockFunc,
    };
  },
}));

describe("HeroList component", () => {
  test("HeroList 有列出 HeroCard", async () => {
    render(<HeroList heroData={mockHeroData} />);

    const heroCard1 = screen.getByText("Hero 1");
    expect(heroCard1).toBeInTheDocument();
    const heroCard2 = screen.getByText("Hero 2");
    expect(heroCard2).toBeInTheDocument();
  });

  test("點選 HeroCard 會觸發函式", async () => {
    render(<HeroList heroData={mockHeroData} />);

    const heroCard1 = screen.getByText("Hero 1");
    await userEvent.click(heroCard1);
    expect(mockFunc).toHaveBeenCalledWith("/heroes/1");
  });
});
