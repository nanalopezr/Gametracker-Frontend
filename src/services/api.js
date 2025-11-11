// src/services/api.js
const API_URL = "http://localhost:3000/api"; // tu backend

// Obtener todos los juegos
export const getJuegos = async () => {
  const res = await fetch(`${API_URL}/juegos`);
  return await res.json();
};

// Agregar un nuevo juego
export const addJuego = async (nuevoJuego) => {
  const res = await fetch(`${API_URL}/juegos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoJuego),
  });
  return await res.json();
};
