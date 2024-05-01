// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useSelectStore } from "@/store";

import HeroProfile from "./HeroProfile";

jest.mock("@/store");

describe("HeroProfile component", () => {
  test("Hero Profile 點 +/- 按鈕會調整剩餘點數", async () => {
    const statData = { str: 5, int: 6, agi: 7, luk: 8 };
    useSelectStore.mockReturnValue({ selectedId: "1" });
    render(<HeroProfile statData={statData} />);

    const addbtn = screen.getAllByRole("button");
    await userEvent.click(addbtn[1]); // 點 - 按鈕
    expect(screen.getByTestId("remain-point")).toHaveTextContent(
      "剩餘點數 : 1",
    );
    await userEvent.click(addbtn[0]); // 點 + 按鈕
    expect(screen.getByTestId("remain-point")).toHaveTextContent(
      "剩餘點數 : 0",
    );
  });

  test("Hero Profile 有正確顯示文字", () => {
    const statData = { str: 5, int: 6, agi: 7, luk: 8 };
    useSelectStore.mockReturnValue({ selectedId: "1" });
    render(<HeroProfile statData={statData} />);

    expect(screen.getByText("STR")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId("remain-point")).toHaveTextContent(
      "剩餘點數 : 0",
    );
  });
});
