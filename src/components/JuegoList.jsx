import { useState } from "react";

function JuegoList({ juegos, setJuegos }) {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({});
  const [idEliminar, setIdEliminar] = useState(null);

  // Abrir modal de edición
  const abrirModalEditar = (juego) => {
    setForm(juego);
    setModalEditar(true);
  };

  // Abrir modal de eliminación
  const abrirModalEliminar = (id) => {
    setIdEliminar(id);
    setModalEliminar(true);
  };

  // Cerrar modales
  const cerrarModales = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };

  // Editar juego
  const handleGuardar = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/juegos/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const actualizado = await res.json();
        setJuegos(
          juegos.map((j) => (j._id === actualizado._id ? actualizado : j))
        );
        cerrarModales();
      } else {
        alert("Error al actualizar el juego");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Eliminar juego
  const handleEliminar = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/juegos/${idEliminar}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setJuegos(juegos.filter((j) => j._id !== idEliminar));
        cerrarModales();
      } else {
        alert("Error al eliminar el juego");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Cambiar campos del form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* GRID DE JUEGOS */}
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
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            className="tarjeta-juego"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 6px 14px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.3)";
            }}
          >
            <>
              <h3 style={{ color: "#C084FC", marginBottom: "8px" }}>
                🎮 {juego.nombre}
              </h3>

              <p>
                <strong>Plataforma:</strong>{" "}
                {juego.plataforma || "Sin especificar"}
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

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => abrirModalEditar(juego)}
                  style={{
                    background: "#355c7d",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => abrirModalEliminar(juego._id)}
                  style={{
                    background: "#f67280",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  🗑 Eliminar
                </button>
              </div>
            </>
          </div>
        ))}
      </div>

      {/* MODAL EDITAR */}
      {modalEditar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#1f1f1f",
              padding: "25px",
              borderRadius: "12px",
              width: "350px",
              color: "#fff",
            }}
          >
            <h2 style={{ marginBottom: "15px", color: "#91e0eb" }}>
              ✏️ Editar juego
            </h2>

            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              type="text"
              name="plataforma"
              value={form.plataforma}
              onChange={handleChange}
              placeholder="Plataforma"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Jugando">Jugando</option>
              <option value="Completado">Completado</option>
            </select>

            <input
              type="number"
              name="horasJugadas"
              value={form.horasJugadas}
              onChange={handleChange}
              placeholder="Horas jugadas"
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <div style={{ textAlign: "right" }}>
              <button
                onClick={handleGuardar}
                style={{
                  background: "#00ADB5",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
              >
                💾 Guardar
              </button>

              <button
                onClick={cerrarModales}
                style={{
                  background: "#777",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {modalEliminar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#1f1f1f",
              padding: "25px",
              borderRadius: "12px",
              width: "330px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "15px", color: "#f67280" }}>
              ⚠️ Confirmar eliminación
            </h2>

            <p style={{ marginBottom: "20px" }}>
              ¿Seguro que quieres eliminar este juego?
            </p>

            <button
              onClick={handleEliminar}
              style={{
                background: "#f67280",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Sí, eliminar
            </button>

            <button
              onClick={cerrarModales}
              style={{
                background: "#777",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default JuegoList;
