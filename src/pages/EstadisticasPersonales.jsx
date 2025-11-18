import React, { useEffect, useState } from "react";
import { getJuegoFavorito } from "../services/api";

export default function EstadisticasPersonales() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getJuegoFavorito().then((info) => setData(info));
  }, []);

  if (!data) return <p>Cargando estadísticas...</p>;

  return (
    <div>
      <h1>📈 Estadísticas Personales</h1>

      {data.juegoFavorito ? (
        <div style={{ marginTop: "20px" }}>
          <h2>⭐ Juego Favorito</h2>
          <p><strong>🎮 {data.juegoFavorito}</strong></p>
          <p>Plataforma: {data.plataforma}</p>
          <p>⭐ Promedio: {data.promedio}</p>
          <p>📝 Reseñas analizadas: {data.cantidadResenas}</p>
        </div>
      ) : (
        <p>Aún no hay reseñas suficientes para calcular estadísticas.</p>
      )}
    </div>
  );
}
