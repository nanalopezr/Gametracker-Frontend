import React, { useEffect, useState } from "react";
import { getJuegos } from "../services/api";
import TarjetaJuego from "../components/TarjetaJuego";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [genero, setGenero] = useState("");

  const cargarJuegos = () => {
    getJuegos(genero ? { genero } : {}).then((data) => setJuegos(data));
  };

  useEffect(() => {
    cargarJuegos();
  }, [genero]);

  return (
    <div>
      <h1>🎮 Mi Biblioteca de Juegos</h1>

      {/* Filtro */}
      <div style={{ margin: "20px 0" }}>
        <label>Filtrar por género: </label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Todos</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Shooter">Shooter</option>
          <option value="Simulación">Simulación</option>
          <option value="Deportes">Deportes</option>
        </select>
      </div>

      {/* Lista de juegos */}
      <div className="grid">
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <TarjetaJuego key={juego._id} juego={juego} />
          ))
        ) : (
          <p>No hay juegos aún.</p>
        )}
      </div>
    </div>
  );
}
