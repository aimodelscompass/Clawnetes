import type { ProviderAuthConfig } from "../types";

export const LOCAL_PROVIDERS = new Set(["ollama", "lmstudio", "local"]);

export const OAUTH_METHODS_BY_PROVIDER: Record<string, Array<{ value: string; label: string; oauthProviderId: string }>> = {
  anthropic: [
    { value: "claude-cli", label: "Claude Code OAuth", oauthProviderId: "anthropic" },
  ],
  openai: [
    { value: "openai-codex", label: "OpenAI Codex OAuth", oauthProviderId: "openai-codex" },
  ],
  google: [
    { value: "google-gemini-cli", label: "Gemini CLI OAuth", oauthProviderId: "google-gemini-cli" },
    { value: "google-antigravity", label: "Antigravity OAuth", oauthProviderId: "google-antigravity" },
  ],
};

export function getDefaultAuthMethod(provider: string): string {
  if (provider === "anthropic") return "token";
  if (provider === "openai") return "token";
  if (provider === "google") return "token";
  return "token";
}

export function createDefaultProviderAuth(provider: string): ProviderAuthConfig {
  const oauthOption = OAUTH_METHODS_BY_PROVIDER[provider]?.[0];
  return {
    auth_method: getDefaultAuthMethod(provider),
    token: "",
    profile_key: null,
    profile: null,
    oauth_provider_id: oauthOption?.oauthProviderId ?? null,
  };
}

export function normalizeProviderAuths(providerAuths: Record<string, ProviderAuthConfig> | undefined, provider: string, apiKey: string, authMethod: string): Record<string, ProviderAuthConfig> {
  const next = { ...(providerAuths || {}) };
  if (!next[provider]) {
    next[provider] = createDefaultProviderAuth(provider);
  }
  if (apiKey || authMethod !== "token") {
    next[provider] = {
      ...next[provider],
      auth_method: authMethod || next[provider].auth_method,
      token: apiKey || next[provider].token,
    };
  }
  return next;
}

export function getReferencedProviders(models: string[]): string[] {
  const unique = new Set<string>();
  for (const model of models) {
    const provider = model.split("/")[0];
    if (!provider || LOCAL_PROVIDERS.has(provider)) continue;
    unique.add(provider);
  }
  return Array.from(unique).sort();
}

export function buildReferencedProviders(input: {
  primaryModel: string;
  fallbackModels: string[];
  agentConfigs?: Array<{ model: string; fallbackModels: string[] }>;
}): string[] {
  const models = [input.primaryModel, ...input.fallbackModels];
  for (const agent of input.agentConfigs || []) {
    models.push(agent.model, ...agent.fallbackModels);
  }
  return getReferencedProviders(models.filter(Boolean));
}

export function getProviderAuthOptions(provider: string): Array<{ value: string; label: string; description: string }> {
  const options = [{ value: "token", label: "API Key", description: "Paste an API key or token for this provider." }];

  if (provider === "anthropic") {
    options.push({ value: "setup-token", label: "Setup Token", description: "Paste a token from `claude setup-token`." });
  }

  for (const oauthOption of OAUTH_METHODS_BY_PROVIDER[provider] || []) {
    options.push({
      value: oauthOption.value,
      label: oauthOption.label,
      description: "Launch the provider auth flow in your browser and import the resulting profile.",
    });
  }

  return options;
}

export function isOAuthMethod(authMethod: string): boolean {
  return authMethod !== "token" && authMethod !== "setup-token";
}
