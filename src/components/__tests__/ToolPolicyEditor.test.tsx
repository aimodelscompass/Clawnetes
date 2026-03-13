import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ToolPolicyEditor from "../ToolPolicyEditor";

describe("ToolPolicyEditor", () => {
  it("switches profiles and toggles tools with overrides", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <ToolPolicyEditor
        policy={{ profile: "minimal", allow: [], deny: [], elevatedEnabled: false }}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /coding/i }));
    expect(onChange).toHaveBeenCalledWith({
      profile: "coding",
      allow: [],
      deny: [],
      elevatedEnabled: false,
    });
  });

  it("enables an extra tool outside the current profile", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <ToolPolicyEditor
        policy={{ profile: "minimal", allow: [], deny: [], elevatedEnabled: false }}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Toggle read" }));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        profile: "minimal",
        allow: ["read"],
        deny: [],
      }),
    );
  });
});
