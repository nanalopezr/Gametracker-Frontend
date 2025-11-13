import { useEffect, useState } from "react";
import JuegoList from "./components/JuegoList";
import FormularioJuego from "./components/FormularioJuego";
import FormularioResena from "./components/FormularioResena";
import ListaResenas from "./components/ListaResenas";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState("biblioteca");

  // 🔍 Estados para filtros de búsqueda
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    plataforma: "",
    estado: ""
  });

  // 🔹 Función para obtener juegos con filtros
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

      if (!res.ok) throw new Error(`Error al cargar los juegos: ${res.status}`);
      const data = await res.json();

      console.log("✅ Juegos obtenidos del backend:", data);
      setJuegos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error al cargar los juegos:", error.message);
      setJuegos([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar juegos al inicio
  useEffect(() => {
    fetchJuegos();
  }, []);

  // 🔍 Actualizar búsqueda en tiempo real
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchJuegos(busqueda);
    }, 400); // ⏱ espera 400ms antes de buscar (para evitar muchas peticiones)
    return () => clearTimeout(delaySearch);
  }, [busqueda]);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#121212",
        color: "#f2f2f2",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#00ADB5", marginBottom: "25px" }}>
        🎮 GameTracker
      </h1>

      {/* 🔸 Botones de navegación */}
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
            background: vista === "resenas" ? "#FF8C00" : "#333",
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
      </div>

      {/* 🔸 Mostrar la vista seleccionada */}
      {vista === "biblioteca" ? (
        <>
          {/* 🕹️ Lista de juegos con buscador */}
          <section
            style={{
              background: "#1E1E1E",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ color: "#00FFB9" }}>🎯 Juegos Disponibles</h2>

            {/* 🔍 Buscador y filtros */}
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
                placeholder="Buscar por nombre..."
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
                placeholder="Filtrar por plataforma..."
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

            {/* 📋 Resultados */}
            {loading ? (
              <p>Cargando juegos...</p>
            ) : juegos.length > 0 ? (
              <JuegoList juegos={juegos} setJuegos={setJuegos} />
            ) : (
              <p>No se encontraron juegos con esos filtros 😢</p>
            )}
          </section>

          {/* ➕ Formulario para agregar juego */}
          <section
            style={{
              background: "#1E1E1E",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ color: "#00ADB5" }}>➕ Agregar nuevo juego</h2>
            <FormularioJuego />
          </section>
        </>
      ) : (
        <>
          {/* 📝 Crear reseña */}
          <section
            style={{
              background: "#1E1E1E",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ color: "#FF8C00" }}>📝 Crear Nueva Reseña</h2>
            <FormularioResena juegos={juegos} />
          </section>

          {/* ⭐ Lista de reseñas */}
          <section
            style={{
              background: "#1E1E1E",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ color: "#FFD700" }}>⭐ Reseñas de Jugadores</h2>
            <ListaResenas />
          </section>
        </>
      )}
    </div>
  );
}

export default App;