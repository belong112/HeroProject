// SomeComponent.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HeroList from "./HeroList";

jest.mock("next/navigation");

const mockHeroData = [
  { id: "1", name: "Hero 1", image: "http://hero1.jpg" },
  { id: "2", name: "Hero 2", image: "http://hero2.jpg" },
];

describe("HeroList component", () => {
  test("HeroList 有列出 HeroCard", async () => {
    render(<HeroList heroData={mockHeroData} />);

    const heroCard1 = screen.getByText("Hero 1");
    expect(heroCard1).toBeInTheDocument();
    const heroCard2 = screen.getByText("Hero 2");
    expect(heroCard2).toBeInTheDocument();
  });
});
