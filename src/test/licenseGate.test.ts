import { describe, expect, it } from "vitest";
import { getAdvancedTransitionAction } from "../utils/licenseGate";

describe("getAdvancedTransitionAction", () => {
  it("waits until saved license state is loaded", () => {
    expect(getAdvancedTransitionAction(false, false)).toBe("wait");
    expect(getAdvancedTransitionAction(false, true)).toBe("wait");
  });

  it("prompts for a license when no saved unlock is present", () => {
    expect(getAdvancedTransitionAction(true, false)).toBe("prompt");
  });

  it("continues directly when a saved license unlock exists", () => {
    expect(getAdvancedTransitionAction(true, true)).toBe("continue");
  });
});
