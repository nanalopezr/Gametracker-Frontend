import { useEffect, useState } from "react";

function ListaResenas() {
  const [resenas, setResenas] = useState([]);
  const [error, setError] = useState(null);

  // 🔹 Cargar reseñas desde el backend
  useEffect(() => {
    const obtenerResenas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/resenas");
        if (!res.ok) throw new Error("Error al obtener reseñas");
        const data = await res.json();
        setResenas(Array.isArray(data) ? data : []); // Evita error si no es un arreglo
      } catch (err) {
        console.error("❌ Error al cargar reseñas:", err);
        setError(err.message);
      }
    };

    obtenerResenas();
  }, []);

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#f2f2f2",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <h2 style={{ color: "#00ADB5", textAlign: "center" }}>💬 Reseñas</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Error: {error}
        </p>
      )}

      {resenas.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          No hay reseñas registradas aún 😢
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {resenas.map((r) => (
            <li
              key={r._id}
              style={{
                background: "#121212",
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <h3 style={{ color: "#00ADB5", marginBottom: "6px" }}>
                🎮 {r.juego?.nombre || "Juego desconocido"}
              </h3>
              <p style={{ margin: "4px 0" }}>
                ⭐ <strong>{r.puntuacion}</strong> / 5
              </p>
              <p style={{ fontStyle: "italic", color: "#ccc" }}>
                “{r.texto}”
              </p>
              <p style={{ marginTop: "6px", fontSize: "0.9em", color: "#aaa" }}>
                👤 {r.autor || "Anónimo"} | 🕒{" "}
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaResenas;
