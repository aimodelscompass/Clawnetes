# Granular Tool Controls

## Goal
- Replace the coarse allowlist/denylist/all tool UI with an OpenClaw-aligned granular tool policy editor.
- Support workspace-level and per-agent tool policies.
- Load and save `tools.profile`, `tools.allow`, and `tools.deny` while preserving compatibility with existing configs.
- Migrate legacy synthetic tool ids and skill ids into the new policy model without breaking saved setups.

## Progress
- [x] Inspect current frontend/backend tool handling and existing config shapes.
- [x] Confirm OpenClaw tool/profile semantics from `https://docs.openclaw.ai/tools`.
- [x] Add shared frontend tool catalog and normalization helpers.
- [x] Replace wizard and agent tool selectors with the granular policy editor UI.
- [x] Extend frontend types and payload construction for profile/allow/deny policies.
- [x] Extend Rust load/save paths for top-level and per-agent tool policies.
- [x] Add or update tests for normalization, payload mapping, and UI behavior.
- [x] Run `npm test`.
- [x] Run `npm run tauri dev`.
- [ ] Commit and push after validation succeeds.

## Notes
- Preserve unrelated worktree changes.
- Prefer the OpenClaw docs as the source of truth for built-in tool ids and profile definitions.
- Keep old `filesystem` / `terminal` / `browser` / `network` selections readable by mapping them into real tool ids.
