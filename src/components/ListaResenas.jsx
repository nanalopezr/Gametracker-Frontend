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

  // filtrado
  useEffect(() => {
    const esperar = setTimeout(() => {
      cargarResenas(busqueda);
    }, 400);
    return () => clearTimeout(esperar);
  }, [busqueda]);

  // ⭐ Estrellas visuales
  const renderEstrellas = (num) =>
    "⭐".repeat(num) + "✩".repeat(5 - num);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2
        style={{
          color: "#91e0ebff",
          marginBottom: "20px",
          fontSize: "26px",
          textShadow: "0 0 10px #8ec9d1ff",
        }}
      >
      </h2>

      {/* BUSCADOR */}
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
          border: "2px solid #355c7d",
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

      {/* GRID DE RESEÑAS */}
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
              borderRadius: "15px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 12px rgba(0, 200, 255, 0.2)",
              transition: "all 0.25s ease",
              transform: "translateY(0px)",
              opacity: 0,
              animation: "fadeIn 0.6s ease forwards",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 18px rgba(0, 200, 255, 0.55)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 12px rgba(0, 200, 255, 0.2)")
            }
          >
            {/* Título */}
            <h3
              style={{
                color: "#8d5ab9ff", 
                marginBottom: "8px",
              }}
            >
              🎮 {r.juego?.nombre || "Juego desconocido"}
            </h3>

            {/* Estrellas */}
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

            {/* Autor */}
            <p style={{ opacity: 0.8, marginBottom: "10px" }}>
              <strong>👤 Autor:</strong> {r.autor || "Anónimo"}
            </p>

            {/* Texto */}
            <p style={{ lineHeight: "1.4", marginBottom: "12px" }}>
              {r.texto}
            </p>

            {/* Fecha */}
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

      {/* Animación CSS */}
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
