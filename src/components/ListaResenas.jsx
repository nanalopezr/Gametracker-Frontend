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

  // cargar todas
  useEffect(() => {
    cargarResenas();
  }, []);

  // filtrar en tiempo real
  useEffect(() => {
    const esperar = setTimeout(() => {
      cargarResenas(busqueda);
    }, 400);
    return () => clearTimeout(esperar);
  }, [busqueda]);

  // ⭐ Estrellas
  const renderEstrellas = (num) =>
    "★".repeat(num) + "☆".repeat(5 - num);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ color: "#00ADB5", marginBottom: "20px" }}>
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
          borderRadius: "10px",
          border: "2px solid #00ADB5",
          background: "#1E1E1E",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {resenas.map((r) => (
          <div
            key={r._id}
            style={{
              background: "#222",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h3 style={{ color: "#00ADB5", marginBottom: "8px" }}>
              🎮 {r.juego?.nombre || "Juego desconocido"}
            </h3>

            <p style={{ fontSize: "22px", color: "#FFD700", margin: "5px 0" }}>
              {renderEstrellas(r.puntuacion)}
            </p>

            <p style={{ opacity: 0.8, marginBottom: "10px" }}>
              <strong>Autor:</strong> {r.autor || "Anónimo"}
            </p>

            <p style={{ lineHeight: "1.4", marginBottom: "12px" }}>
              {r.texto}
            </p>

            <p style={{ fontSize: "12px", opacity: 0.6 }}>
              Fecha: {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaResenas;
