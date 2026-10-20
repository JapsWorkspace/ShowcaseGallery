const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

if (!API_URL) {
  console.error("VITE_API_URL is missing. Set it in client/.env or your Vercel project settings.");
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}/api/products${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
  return payload;
}

export const getProducts = () => request("");
export const createProduct = (data) => request("", { method: "POST", body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProduct = (id) => request(`/${encodeURIComponent(id)}`, { method: "DELETE" });
