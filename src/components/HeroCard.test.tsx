// SomeComponent.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import HeroCard from "./HeroCard";

const mockName = "mockName";
const mockImage = "https://img1.jpg";
const mockFunc = jest.fn();

describe("HeroCard component", () => {
  test("card 有正確顯示文字", async () => {
    render(
      <HeroCard
        isSelect={false}
        name={mockName}
        image={mockImage}
        clickCard={mockFunc}
      />,
    );

    const card = screen.getByTestId("hero-card");
    expect(card).toHaveTextContent("mockName");
  });

  test("當被選擇時 card 有顯示正確背景顏色", async () => {
    render(
      <HeroCard
        isSelect={true}
        name={mockName}
        image={mockImage}
        clickCard={mockFunc}
      />,
    );

    const card = screen.getByTestId("hero-card");
    expect(card).toHaveStyle({ "background-color": "#fffcec" });
  });

  test("當沒有被選擇時 card 有顯示正確背景顏色", async () => {
    render(
      <HeroCard
        isSelect={false}
        name={mockName}
        image={mockImage}
        clickCard={mockFunc}
      />,
    );

    const card = screen.getByTestId("hero-card");
    expect(card).toHaveStyle({ "background-color": "#fff" });
  });

  test("點選會觸發 function", async () => {
    render(
      <HeroCard
        isSelect={false}
        name={mockName}
        image={mockImage}
        clickCard={mockFunc}
      />,
    );

    const card = screen.getByTestId("hero-card");
    // 點選後有順利觸發函式
    await userEvent.click(card);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
