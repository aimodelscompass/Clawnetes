# Restore Advanced License Gate With Cross-Environment Secure Persistence

## Summary
- Restore the advanced-setup license gate removed in commit `57d431df`, using the same Gumroad verification flow and the same “Configuration Complete” entry point.
- Change the old session-only unlock into persistent unlock across app launches.
- Use a cross-environment secure storage design that works on macOS, Windows, WSL, and remote/headless Linux: save a verified license in an app-managed encrypted file, bound to the current machine.

## Implementation Changes
- Update `src/App.tsx` to restore the license modal, probe saved license state on startup, and only bypass the modal when a saved verified license is present.
- Update `src-tauri/src/main.rs` to add Gumroad verification, machine-bound encrypted license persistence, and Tauri commands for probing and saving license state.
- Update `src-tauri/Cargo.toml` with crypto dependencies needed for authenticated encryption and machine-bound key derivation.
- Add regression tests for the Rust license verification and storage helpers, and frontend tests for the restored gating flow.
- Validate with `npm test` and `npm run tauri dev`.
- Commit and push after validation succeeds.
