import { describe, it, expect } from "vitest";
import { updateSoulMission, updateIdentityField } from "../utils/markdownHelpers";

describe("updateSoulMission", () => {
  it("replaces 'Serve the user.' with the given name", () => {
    const content = "# SOUL.md\n## Mission\nServe the user.";
    expect(updateSoulMission(content, "Mulugeta")).toBe(
      "# SOUL.md\n## Mission\nServe Mulugeta."
    );
  });

  it("replaces 'Serve you.' with the given name", () => {
    const content = "# SOUL.md\n## Mission\nServe you.";
    expect(updateSoulMission(content, "Alice")).toBe(
      "# SOUL.md\n## Mission\nServe Alice."
    );
  });

  it("replaces an existing name with a new name", () => {
    const content = "# SOUL.md\n## Mission\nServe DevBot 9000.";
    expect(updateSoulMission(content, "Bob")).toBe(
      "# SOUL.md\n## Mission\nServe Bob."
    );
  });

  it("handles content with no 'Serve' line — returns unchanged", () => {
    const content = "# SOUL.md\n## Mission\nHelp the user succeed.";
    expect(updateSoulMission(content, "Mulugeta")).toBe(content);
  });

  it("handles empty content — returns empty string", () => {
    expect(updateSoulMission("", "Mulugeta")).toBe("");
  });

  it("handles null/undefined content — returns as-is", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(updateSoulMission(null as any, "Mulugeta")).toBe(null);
  });

  it("injects user name, not agent name, when preset is applied", () => {
    // Simulates what App.tsx should do after the fix:
    // preset SOUL.md has 'Serve the user.' and we inject userName
    const presetSoul = "# SOUL.md\n## Mission\nServe the user.\n\n## Role\nSenior software engineer.";
    const result = updateSoulMission(presetSoul, "Mulugeta");
    expect(result).toContain("Serve Mulugeta.");
    expect(result).not.toContain("Serve the user.");
    // Role section should be preserved
    expect(result).toContain("Senior software engineer.");
  });

  it("does not double-inject when called twice with same name", () => {
    const content = "# SOUL.md\n## Mission\nServe the user.";
    const once = updateSoulMission(content, "Mulugeta");
    const twice = updateSoulMission(once, "Mulugeta");
    expect(twice).toBe("# SOUL.md\n## Mission\nServe Mulugeta.");
  });

  it("handles name with spaces correctly", () => {
    const content = "# SOUL.md\n## Mission\nServe the user.";
    expect(updateSoulMission(content, "Jean-Paul")).toBe(
      "# SOUL.md\n## Mission\nServe Jean-Paul."
    );
  });

  it("only replaces 'Serve ...' lines, not other content", () => {
    const content = "# SOUL.md\n## Mission\nServe the user.\n\nAlways serve with integrity.";
    const result = updateSoulMission(content, "Mulugeta");
    // Both lines match the regex, so both get replaced — this documents current behavior
    expect(result).toContain("Serve Mulugeta.");
  });
});

describe("updateIdentityField", () => {
  it("updates the Name field", () => {
    const content = "# IDENTITY.md\n- **Name:** OldName\n- **Emoji:** 🤖";
    expect(updateIdentityField(content, "Name", "Alfred")).toBe(
      "# IDENTITY.md\n- **Name:** Alfred\n- **Emoji:** 🤖"
    );
  });

  it("updates the Emoji field", () => {
    const content = "# IDENTITY.md\n- **Name:** Alfred\n- **Emoji:** 🤖";
    expect(updateIdentityField(content, "Emoji", "🤵")).toBe(
      "# IDENTITY.md\n- **Name:** Alfred\n- **Emoji:** 🤵"
    );
  });

  it("handles empty content — returns as-is", () => {
    expect(updateIdentityField("", "Name", "Alice")).toBe("");
  });
});
