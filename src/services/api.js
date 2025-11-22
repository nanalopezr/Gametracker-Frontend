// src/services/api.js
const API_URL = "http://localhost:3000/api"; //backend

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

export async function getJuegoFavorito() {
  const res = await fetch("http://localhost:4000/api/resenas/estadisticas/favorito");
  return res.json();
}
