const baseUrl = process.env.ORB_SMOKE_BASE_URL ?? "http://localhost:3000";
const email = process.env.ORB_ADMIN_EMAIL ?? "";
const password = process.env.ORB_ADMIN_PASSWORD ?? "";

const response = await fetch(`${baseUrl}/api/trpc/auth.passwordLogin`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ json: { email, password } }),
});

const setCookie = response.headers.get("set-cookie") ?? "";
const payload = await response.text();

if (!response.ok || !setCookie.includes("app_session_id") || !payload.includes("admin")) {
  throw new Error(`Password login smoke test failed: ${response.status} ${payload.slice(0, 180)}`);
}

console.log("Password login API smoke test passed: session cookie issued without OAuth redirect.");
