const baseUrl = (process.env.VITE_ORB_API_BASE_URL ?? "").replace(/\/$/, "");
const email = process.env.ORB_ADMIN_EMAIL ?? "";
const password = process.env.ORB_ADMIN_PASSWORD ?? "";

const loginResponse = await fetch(`${baseUrl}/auth/login`, {
  method: "POST",
  headers: { "content-type": "application/json", accept: "application/json" },
  body: JSON.stringify({ email, password }),
});
const loginBody = await loginResponse.json().catch(() => ({}));

if (!loginResponse.ok || !loginBody.token || !loginBody.user) {
  throw new Error(`Railway admin login failed with HTTP ${loginResponse.status}.`);
}
if (loginBody.user.role !== "admin") {
  throw new Error("Railway login succeeded but the configured account is not an admin.");
}

const headers = { authorization: `Bearer ${loginBody.token}`, accept: "application/json" };
const [teachers, students, issues, disputes, payouts, support, notifications] = await Promise.all([
  fetch(`${baseUrl}/admin/teachers/pending`, { headers }),
  fetch(`${baseUrl}/admin/students/all`, { headers }),
  fetch(`${baseUrl}/admin/lessons/issues`, { headers }),
  fetch(`${baseUrl}/disputes`, { headers }),
  fetch(`${baseUrl}/payouts`, { headers }),
  fetch(`${baseUrl}/support`, { headers }),
  fetch(`${baseUrl}/notifications/all`, { headers }),
]);

const responses = [teachers, students, issues, disputes, payouts, support, notifications];
if (responses.some((response) => !response.ok)) {
  throw new Error(`Railway admin data endpoints failed: ${responses.map((response) => response.status).join(", ")}.`);
}

const bodies = await Promise.all(responses.map((response) => response.json()));
console.log(`Railway admin smoke test passed: ${bodies.map((body) => body.results ?? body.data?.length ?? 0).join(", ")} records returned.`);
