import { useEffect, useState } from "react";

function Estadisticas() {
  const [stats, setStats] = useState(null);
  const [todos, setTodos] = useState([]);

  // Cargar juego favorito
  useEffect(() => {
    fetch("http://localhost:3000/api/resenas/estadisticas/favorito")
      .then(res => res.json())
      .then(data => setStats({
        juegoFavorito: data.juegoFavorito,
        plataforma: data.plataforma,
        promedio: data.promedio,
        cantidadResenas: data.cantidadResenas
      }))
      .catch(err => console.error("Error estadísticas favorito", err));
  }, []);

  // Cargar estadísticas de todos los juegos
  useEffect(() => {
    fetch("http://localhost:3000/api/resenas/estadisticas/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error estadísticas todos", err));
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #142550ff, #28293fff)",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 0 20px #2b2e54",
        animation: "fadeIn 0.8s ease",
      }}
    >
      <h2 style={{
        color: "#C084FC",
        fontSize: "28px",
        textAlign: "center",
        marginBottom: "20px",
      }}>
        📊 Estadísticas
      </h2>

      {!stats ? (
        <p style={{ textAlign: "center" }}>Cargando estadísticas...</p>
      ) : (
        <div>

          {/* JUEGO FAVORITO */}
          <div
            style={{
              background: "#2b2e54",
              padding: "20px",
              borderRadius: "18px",
              boxShadow: "0 0 15px rgba(147,112,219,0.3)",
              backdropFilter: "blur(6px)",
              transition: "0.3s",
              transform: "scale(1)",
              marginBottom: "30px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ color: "#FFD700", marginBottom: "10px" }}>
              ⭐ Juego Favorito
            </h3>

            <p><strong style={{ color: "#C084FC",}}>🎮 {stats.juegoFavorito}</strong></p>
            <p>🕹 <strong style={{ color: "#7ca4aaff"}}>Plataforma: </strong> <strong style={{ color: "#9ec8ceff"}}>{stats.plataforma}</strong></p>
            <p>⭐ <strong style={{ color: "#7ca4aaff"}}>Promedio: </strong> <strong style={{ color: "#9ec8ceff"}}>{stats.promedio}</strong></p>
            <p>📦 <strong style={{ color: "#7ca4aaff"}}>Reseñas: </strong> <strong style={{ color: "#9ec8ceff"}}>{stats.cantidadResenas}</strong></p>
          </div>

          {/* ESTADÍSTICAS POR JUEGO */}
          <h3 style={{ color: "#7DD3FC", marginBottom: "10px" }}>
            📚 Estadísticas por Juego
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {todos.length > 0 ? (
              todos.map((juego, index) => (
                <div
                  key={index}
                  style={{
                    padding: "18px",
                    background: "#2b2e54",
                    borderRadius: "15px",
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 0 10px rgba(255,255,255,0.08)",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <p style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#C084FC" }}>🎮 {juego.nombre}</strong>
                  </p>
                  <p>🕹 <strong style={{ color: "#7ca4aaff"}}>{juego.plataforma}</strong></p>
                  <p>⭐ <strong style={{ color: "#7ca4aaff"}}> Promedio:</strong> <strong style={{ color: "#9ec8ceff"}}>{juego.promedio}</strong></p>
                  <p>📦 <strong style={{ color: "#7ca4aaff"}}> Reseñas: </strong> <strong style={{ color: "#9ec8ceff"}}>{juego.cantidadResenas}</strong></p>
                </div>
              ))
            ) : (
              <p>No hay estadísticas de otros juegos.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Estadisticas;
