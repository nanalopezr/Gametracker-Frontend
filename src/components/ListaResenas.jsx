import { useEffect, useState } from "react";

function ListaResenas() {
  const [resenas, setResenas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  //  ESTADOS PARA EDITAR 
  const [modalEditar, setModalEditar] = useState(false);
  const [resenaActual, setResenaActual] = useState(null);

  //  ESTADOS PARA ELIMINAR 
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

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

  const renderEstrellas = (num) => "⭐".repeat(num) + "✩".repeat(5 - num);

  // ABRIR MODAL DE EDICIÓN
  const abrirModalEditar = (resena) => {
    setResenaActual(resena);
    setModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setModalEditar(false);
    setResenaActual(null);
  };

  // GUARDAR CAMBIOS DE EDICIÓN
  const guardarEdicion = async () => {
  try {
    const body = {
      nombreJuego: resenaActual.juego?.nombre,
      texto: resenaActual.texto,
      puntuacion: resenaActual.puntuacion,
      autor: resenaActual.autor,
    };

    const res = await fetch(
      "http://localhost:3000/api/resenas/editarPorNombre",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) throw new Error("Error al editar reseña");

    cerrarModalEditar();
    cargarResenas();
  } catch (err) {
    alert("❌ " + err.message);
  }
};

  // CONFIRMAR ELIMINAR
  const solicitarEliminar = (id) => {
    setIdAEliminar(id);
    setConfirmarEliminar(true);
  };

  const eliminarResena = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/resenas/${idAEliminar}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("No se pudo eliminar la reseña");

      setConfirmarEliminar(false);
      setIdAEliminar(null);
      cargarResenas();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* ---------------------------------- */}
      <h2
        style={{
          color: "#91e0ebff",
          marginBottom: "20px",
          fontSize: "26px",
          textShadow: "0 0 10px #00E0FF",
        }}
      >
        ⭐ Reseñas de la comunidad
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
          border: "2px solid #00E0FF",
          background: "#0e2635ff",
          backdropFilter: "blur(6px)",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* ---------------------------------- */}
      {cargando && <p>Cargando reseñas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {resenas.length === 0 && !cargando && (
        <p style={{ opacity: 0.7 }}>No hay reseñas aún.</p>
      )}

      {/* ---------------------------------- LISTADO ---------------------------------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {resenas.map((r) => (
          <div key={r._id} className="resena-card">
            {/* TÍTULO */}
            <h3 style={{ color: "#C084FC", marginBottom: "8px" }}>
              🎮 {r.juego?.nombre || "Juego desconocido"}
            </h3>

            {/* ESTRELLAS */}
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

            {/* AUTOR */}
            <p style={{ opacity: 0.8, marginBottom: "10px", color: "#a3dce4ff" }}>
              <strong>👤 Autor:</strong> {r.autor || "Anónimo"}
            </p>

            {/* TEXTO */}
            <p style={{ lineHeight: "1.4", marginBottom: "12px", 
              color: "#91e0ebff",
            }}>
              {r.texto}
            </p>

            <p
              style={{
                fontSize: "12px",
                opacity: 0.6,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "8px",
                marginBottom: "10px",
                color: "#91e0ebff",
              }}
            >
              📅 {new Date(r.createdAt).toLocaleDateString()}
            </p>

            {/* BOTONES */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => abrirModalEditar(r)}
                style={{
                  background: "#355c7d",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✏️ Editar
              </button>

              <button
                onClick={() => solicitarEliminar(r._id)}
                style={{
                  background: "#f67280",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* =============================== MODAL EDITAR =================================== */}
      {modalEditar && (
        <div style={modalFondo}>
          <div style={modalCaja}>
            <h3 style={{ marginBottom: "15px", color: "#8d5ab9" }}>
              ✏️ Editar Reseña
            </h3>

            <label>Texto:</label>
            <textarea
              value={resenaActual.texto}
              onChange={(e) =>
                setResenaActual({ ...resenaActual, texto: e.target.value })
              }
              style={inputModal}
            />

            <label>Puntuación:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={resenaActual.puntuacion}
              onChange={(e) =>
                setResenaActual({
                  ...resenaActual,
                  puntuacion: Number(e.target.value),
                })
              }
              style={inputModal}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={guardarEdicion} style={btnGuardar}>
                Guardar
              </button>
              <button onClick={cerrarModalEditar} style={btnCancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================== MODAL CONFIRMAR ELIMINACIÓN ========================= */}
      {confirmarEliminar && (
        <div style={modalFondo}>
          <div style={modalCaja}>
            <h3 style={{ color: "#ff5555" }}>¿Eliminar reseña?</h3>
            <p>Esta acción no se puede deshacer.</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={eliminarResena} style={btnEliminar}>
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmarEliminar(false)}
                style={btnCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

<style>
  {`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .resena-card {
      padding: 20px;
      border-radius: 12px;
      background: #2b2e54;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 0 10px #1d455cff;
      transition: 0.25s;
      opacity: 0;
      animation: fadeIn 0.6s ease forwards;
      cursor: pointer;
    }

    .resena-card:hover {
      transform: scale(1.03);
      box-shadow: 0 0 20px rgba(182, 164, 245, 0.25);
    }
  `}
</style>

    </div>
  );
}

/* ============================ ESTILOS MODALES ============================ */

const modalFondo = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(3px)",
  zIndex: 9999,
};

const modalCaja = {
  background: "#0a1329ff",
  padding: "25px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
  color: "white",
  boxShadow: "0 0 15px rgba(255,255,255,0.15)",
};

const inputModal = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px 0",
  borderRadius: "8px",
  background: "#0f1c3fff",
  border: "1px solid #555",
  color: "white",
};

const btnGuardar = {
  background: "#355c7d",
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnCancelar = {
  background: "#6c5b7b",
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  color: "white",
};

const btnEliminar = {
  background: "#FF4B4B",
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ListaResenas;
