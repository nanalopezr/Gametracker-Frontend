import { useState } from "react";

function JuegoList({ juegos, setJuegos }) {
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este juego?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/juegos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJuegos(juegos.filter((j) => j._id !== id));
      } else {
        alert("Error al eliminar el juego");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditar = (juego) => {
    setEditando(juego._id);
    setForm(juego);
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/juegos/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const actualizado = await res.json();
        setJuegos(juegos.map((j) => (j._id === actualizado._id ? actualizado : j)));
        setEditando(null);
      } else {
        alert("Error al actualizar el juego");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          className="tarjeta-juego"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
          }}
        >
          {editando === juego._id ? (
            <>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <input
                type="text"
                name="plataforma"
                value={form.plataforma}
                onChange={handleChange}
                placeholder="Plataforma"
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <input
                type="text"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                placeholder="Estado"
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <input
                type="number"
                name="horasJugadas"
                value={form.horasJugadas}
                onChange={handleChange}
                placeholder="Horas jugadas"
                style={{ width: "100%", marginBottom: "8px" }}
              />
              <button
                onClick={handleGuardar}
                style={{
                  background: "#00ADB5",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "6px",
                }}
              >
                💾 Guardar
              </button>
              <button
                onClick={() => setEditando(null)}
                style={{
                  background: "#555",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ❌ Cancelar
              </button>
            </>
          ) : (
            <>
              <h3 style={{ color: "#C084FC", marginBottom: "8px" }}>
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
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleEditar(juego)}
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
                  onClick={() => handleEliminar(juego._id)}
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
          )}
        </div>
      ))}
    </div>
  );
}

export default JuegoList;
