// src/pages/BibliotecaJuegos.jsx
import React, { useEffect, useState } from "react";
import { getJuegos } from "../services/api";
import TarjetaJuego from "../components/TarjetaJuego";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    getJuegos().then((data) => setJuegos(data));
  }, []);

  return (
    <div>
      <h1>🎮 Mi Biblioteca de Juegos</h1>
      <div className="grid">
        {juegos.length > 0 ? (
          juegos.map((juego) => <TarjetaJuego key={juego._id} juego={juego} />)
        ) : (
          <p>No hay juegos aún. Agrega uno!</p>
        )}
      </div>
    </div>
  );
}
