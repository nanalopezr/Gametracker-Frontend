import { useEffect, useState } from "react";
import JuegoList from "./components/JuegoList";
import FormularioJuego from "./components/FormularioJuego";
import FormularioResena from "./components/FormularioResena";
import ListaResenas from "./components/ListaResenas";
import Estadisticas from "./components/Estadisticas";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState("biblioteca");

  const [busqueda, setBusqueda] = useState({
    nombre: "",
    plataforma: "",
    estado: ""
  });

  // Obtener juegos (con filtros)
  const fetchJuegos = async (filtros = {}) => {
    try {
      setLoading(true);
      let query = [];
      if (filtros.nombre) query.push(`nombre=${encodeURIComponent(filtros.nombre)}`);
      if (filtros.plataforma) query.push(`plataforma=${encodeURIComponent(filtros.plataforma)}`);
      if (filtros.estado) query.push(`estado=${encodeURIComponent(filtros.estado)}`);
      const queryString = query.length > 0 ? `?${query.join("&")}` : "";

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`http://localhost:3000/api/juegos${queryString}`, {
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error(`Error al cargar juegos: ${res.status}`);

      const data = await res.json();
      setJuegos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error:", error.message);
      setJuegos([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar juegos al iniciar
  useEffect(() => {
    fetchJuegos();
  }, []);

  // Actualizar filtros en tiempo real
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchJuegos(busqueda);
    }, 400);
    return () => clearTimeout(delay);
  }, [busqueda]);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#0a1329ff",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#b43ce4", marginBottom: "25px" }}>
        🎮 GameTracker
      </h1>

      {/* Botones de navegación */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setVista("biblioteca")}
          style={{
            background: vista === "biblioteca" ? "#00ADB5" : "#333",
            color: "white",
            padding: "10px 20px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Biblioteca
        </button>

        <button
          onClick={() => setVista("resenas")}
          style={{
            background: vista === "resenas" ? "#6A5ACD" : "#333",
            color: "white",
            padding: "10px 20px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reseñas
        </button>

        {/* Nuevo botón de Estadísticas */}
        <button
          onClick={() => setVista("estadisticas")}
          style={{
            background: vista === "estadisticas" ? "#c06c84" : "#333",
            color: "white",
            padding: "10px 20px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Estadísticas
        </button>
      </div>

      {/* Vistas */}
      {vista === "biblioteca" && (
        <>
          <section
            style={{
              background: "#142550ff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ color: "#adb4e4" }}>🎯 Juegos Disponibles</h2>

            {/* Buscadores */}
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Buscar por nombre…"
                value={busqueda.nombre}
                onChange={(e) => setBusqueda({ ...busqueda, nombre: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  flex: "1",
                }}
              />

              <input
                type="text"
                placeholder="Filtrar por plataforma…"
                value={busqueda.plataforma}
                onChange={(e) => setBusqueda({ ...busqueda, plataforma: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  flex: "1",
                }}
              />

              <select
                value={busqueda.estado}
                onChange={(e) => setBusqueda({ ...busqueda, estado: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                }}
              >
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Jugando">Jugando</option>
                <option value="Completado">Completado</option>
              </select>
            </div>

            {loading ? (
              <p>Cargando juegos…</p>
            ) : juegos.length > 0 ? (
              <JuegoList juegos={juegos} setJuegos={setJuegos} />
            ) : (
              <p>No se encontraron juegos 😢</p>
            )}
          </section>

          {/* Agregar juego */}
          <section
            style={{
              background: "#142550ff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
            }}
          >
            <FormularioJuego />
          </section>
        </>
      )}

      {vista === "resenas" && (
        <>
          <section
            style={{
              background: "#142550ff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <FormularioResena juegos={juegos} />
          </section>

          <section
            style={{
              background: "#142550ff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <ListaResenas />
          </section>
        </>
      )}

      {/* 🔥 Nueva vista: estadísticas */}
      {vista === "estadisticas" && (
        <Estadisticas juegos={juegos} />
      )}
    </div>
  );
}

export default App;
