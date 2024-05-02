import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import HeroProfile from "./HeroProfile";

jest.mock("@/store", () => ({
  useSelectStore() {
    return {
      selectedId: "1",
      setSelectedId: jest.fn(),
    };
  },
}));

// window.matchMedia() 在 jsdom 裏面沒有實作的功能，所以需要用 mock 的方式來繞過
// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("HeroProfile component", () => {
  test("點擊 +/- 按鈕會調整剩餘點數", async () => {
    const statData = { str: 5, int: 6, agi: 7, luk: 8 };
    render(<HeroProfile statData={statData} />);

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[1]); // 點 - 按鈕，剩餘點數 + 1
    expect(screen.getByTestId("remain-point")).toHaveTextContent(
      "剩餘點數 : 1",
    );
    await userEvent.click(buttons[0]); // 點 + 按鈕，剩餘點數 - 1
    expect(screen.getByTestId("remain-point")).toHaveTextContent(
      "剩餘點數 : 0",
    );
  });

  test("剩餘點數 > 0 不能儲存", async () => {
    const statData = { str: 5, int: 5, agi: 5, luk: 5 };
    render(<HeroProfile statData={statData} />);

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[1]); // 點 - 按紐讓剩餘點數 > 0
    await userEvent.click(screen.getByTestId("save-button"));
    // 跳出提示
    expect(await screen.findByText("仍有點數尚未分配")).toBeInTheDocument();
  });

  test("剩餘點數不足會跳錯", async () => {
    const statData = { str: 5, int: 5, agi: 5, luk: 5 };
    render(<HeroProfile statData={statData} />);

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]); // 點 + 按鈕
    // 初始剩餘點數為 0，無法分配點數
    expect(await screen.findByText("剩餘點數不足")).toBeInTheDocument();
  });

  test("能力點數 < 0會跳錯", async () => {
    const statData = { str: 0, int: 0, agi: 0, luk: 0 };
    render(<HeroProfile statData={statData} />);

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[1]); // 點 - 按鈕
    // 跳出提示
    expect(await screen.findByText("能力點數不足")).toBeInTheDocument();
  });

  test("Hero Profile 有正確顯示文字", () => {
    const statData = { str: 5, int: 6, agi: 7, luk: 8 };
    render(<HeroProfile statData={statData} />);

    expect(screen.getByText("STR")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId("remain-point")).toHaveTextContent(
      "剩餘點數 : 0",
    );
  });
});
