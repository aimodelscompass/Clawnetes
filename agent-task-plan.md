# Connect Brain Duplicate Auth Fix Plan

## Objective
- Remove the duplicate provider authentication block from the Connect Brain wizard step.
- Keep the existing layout and behavior intact apart from showing auth only once under the provider selector.
- Add regression coverage for hosted providers so this duplicate render does not return.

## Implementation Outline
- Update `src/App.tsx` step `8` to keep only the top `renderProviderAuthEditor(...)` call.
- Preserve existing model selection, thinking level, and hosted/local helper text.
- Add a wizard navigation test that reaches Connect Brain and verifies a single auth editor for Anthropic and OpenAI.
- Run `npm test`.
- Run `npm run tauri dev`.
- Commit and push after validation succeeds.
