export function isManusOAuthConfigured(env: NodeJS.ProcessEnv = process.env) {
  return Boolean(env.OAUTH_SERVER_URL?.trim() && env.VITE_APP_ID?.trim());
}
