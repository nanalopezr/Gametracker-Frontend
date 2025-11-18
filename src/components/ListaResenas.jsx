import { useEffect, useState } from "react";

function ListaResenas() {
  const [resenas, setResenas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarResenas = async (filtro = "") => {
    try {
      setCargando(true);
      setError("");

      const url = filtro
        ? `http://localhost:3000/api/resenas?nombreJuego=${filtro}`
        : `http://localhost:3000/api/resenas`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudieron cargar las reseñas");

      const data = await res.json();
      setResenas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarResenas();
  }, []);

  useEffect(() => {
    const esperar = setTimeout(() => {
      cargarResenas(busqueda);
    }, 400);
    return () => clearTimeout(esperar);
  }, [busqueda]);

  const renderEstrellas = (num) =>
    "⭐".repeat(num) + "✩".repeat(5 - num);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2
        style={{
          color: "#91e0ebff",
          marginBottom: "20px",
          fontSize: "26px",
          textShadow: "0 0 10px #143438ff",
        }}
      >
        ⭐ Reseñas de la comunidad
      </h2>

      <input
        type="text"
        placeholder="Buscar por nombre del juego..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          maxWidth: "450px",
          borderRadius: "12px",
          border: "2px solid #00E0FF",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          color: "white",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {cargando && <p>Cargando reseñas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {resenas.length === 0 && !cargando && (
        <p style={{ opacity: 0.7 }}>No hay reseñas aún.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {resenas.map((r) => (
          <div
            key={r._id}
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "#2A2A2A", // igual al de Estadísticas
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              transform: "scale(1)",
              opacity: 0,
              animation: "fadeIn 0.6s ease forwards",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 0 16px rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0 10px rgba(0,0,0,0.4)";
            }}
          >
            <h3
              style={{
                color: "#8d5ab9ff",
                marginBottom: "8px",
              }}
            >
              🎮 {r.juego?.nombre || "Juego desconocido"}
            </h3>

            <p
              style={{
                fontSize: "26px",
                color: "#6c5b7b",
                margin: "5px 0",
                textShadow: "0 0 5px #355c7d",
              }}
            >
              {renderEstrellas(r.puntuacion)}
            </p>

            <p style={{ opacity: 0.8, marginBottom: "10px" }}>
              <strong>👤 Autor:</strong> {r.autor || "Anónimo"}
            </p>

            <p style={{ lineHeight: "1.4", marginBottom: "12px" }}>
              {r.texto}
            </p>

            <p
              style={{
                fontSize: "12px",
                opacity: 0.6,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "8px",
              }}
            >
              📅 {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default ListaResenas;