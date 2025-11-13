import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Vérification de votre compte...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Lien de vérification invalide ou expiré.");
      return;
    }

    fetch(`http://localhost:8080/api/auth/verify?token=${token}`)
      .then((response) => {
        if (response.ok) {
          setMessage(" Votre compte a été activé avec succès !");
          setTimeout(() => navigate("/signin"), 3000);
        } else {
          setMessage("Le lien est invalide ou expiré.");
        }
      })
      .catch(() => setMessage("Erreur serveur. Réessayez plus tard."));
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
