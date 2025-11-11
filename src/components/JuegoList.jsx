import { useEffect, useState } from "react";

function JuegoList() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Obtener juegos del backend al montar el componente
  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/juegos");
        if (!res.ok) throw new Error("Error al obtener los juegos");
        const data = await res.json();
        setJuegos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerJuegos();
  }, []);

  if (cargando) return <p style={{ color: "#ccc" }}>Cargando juegos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (juegos.length === 0)
    return <p style={{ color: "#aaa" }}>No hay juegos registrados.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {juegos.map((juego) => (
        <div
          key={juego._id}
          style={{
            background: "#1e1e1e",
            color: "#f2f2f2",
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h3 style={{ color: "#00ADB5", marginBottom: "8px" }}>
            🎮 {juego.nombre}
          </h3>
          <p>
            <strong>Plataforma:</strong> {juego.plataforma || "Sin especificar"}
          </p>
          <p>
            <strong>Estado:</strong> {juego.estado || "Pendiente"}
          </p>
          <p>
            <strong>Horas jugadas:</strong> {juego.horasJugadas ?? 0}
          </p>
          {juego.portadaURL && (
            <img
              src={juego.portadaURL}
              alt={juego.nombre}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default JuegoList;
