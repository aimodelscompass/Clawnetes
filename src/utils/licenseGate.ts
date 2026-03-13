export type AdvancedTransitionAction = "wait" | "continue" | "prompt";

export function getAdvancedTransitionAction(
  licenseStatusLoaded: boolean,
  licenseUnlocked: boolean,
): AdvancedTransitionAction {
  if (!licenseStatusLoaded) {
    return "wait";
  }

  return licenseUnlocked ? "continue" : "prompt";
}
