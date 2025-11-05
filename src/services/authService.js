
const API_URL = "http://localhost:8080/api/auth";

export async function logout() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      localStorage.removeItem("token");
      console.log("Déconnexion réussie");
    } else {
      console.warn("Erreur de déconnexion :", response.status);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
}