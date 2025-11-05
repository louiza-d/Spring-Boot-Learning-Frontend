

export async function apiFetchConfig(url, options={}) {

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type" : "application/json",
         ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers}

      const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Non autorisé, token invalide");
  }

  return response;
}