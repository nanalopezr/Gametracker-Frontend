import { useEffect, useState } from "react";
import JuegoList from "./components/JuegoList";
import FormularioJuego from "./components/FormularioJuego";
import FormularioResena from "./components/FormularioResena";
import ListaResenas from "./components/ListaResenas";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState("biblioteca");

  // 🔹 Cargar juegos desde el backend
  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // ⏱ 8s de límite

        const res = await fetch("http://localhost:3000/api/juegos", { signal: controller.signal });
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

    fetchJuegos();
  }, []);

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
          {/* 🕹️ Lista de juegos */}
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
            {loading ? (
              <p>Cargando juegos...</p>
            ) : juegos.length > 0 ? (
              <JuegoList juegos={juegos} />
            ) : (
              <p>No hay juegos registrados aún.</p>
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
            {/* ✅ Pasamos juegos como prop */}
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
