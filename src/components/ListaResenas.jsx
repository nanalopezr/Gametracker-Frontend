import { useEffect, useState } from "react";

function ListaResenas() {
  const [resenas, setResenas] = useState([]);
  const [error, setError] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({ texto: "", puntuacion: "" });

  // 🔹 Cargar reseñas desde el backend
  useEffect(() => {
    const obtenerResenas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/resenas");
        if (!res.ok) throw new Error("Error al obtener reseñas");
        const data = await res.json();
        setResenas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error al cargar reseñas:", err);
        setError(err.message);
      }
    };
    obtenerResenas();
  }, []);

  // 🔹 Eliminar reseña
  const eliminarResena = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reseña?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/resenas/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar la reseña");
      setResenas(resenas.filter((r) => r._id !== id));
    } catch (err) {
      alert("❌ No se pudo eliminar la reseña.");
      console.error(err);
    }
  };

  // 🔹 Activar modo edición
  const editarResena = (resena) => {
    setEditandoId(resena._id);
    setFormEdicion({ texto: resena.texto, puntuacion: resena.puntuacion });
  };

  // 🔹 Guardar cambios de la reseña
  const guardarCambios = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/resenas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdicion),
      });
      if (!res.ok) throw new Error("Error al actualizar la reseña");
      const dataActualizada = await res.json();

      // Actualiza el estado con la reseña modificada
      setResenas(
        resenas.map((r) => (r._id === id ? dataActualizada : r))
      );

      setEditandoId(null);
      alert("✅ Reseña actualizada correctamente");
    } catch (err) {
      alert("❌ No se pudo actualizar la reseña.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#f2f2f2",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <h2 style={{ color: "#00ADB5", textAlign: "center" }}>💬 Reseñas</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Error: {error}
        </p>
      )}

      {resenas.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          No hay reseñas registradas aún 😢
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {resenas.map((r) => (
            <li
              key={r._id}
              style={{
                background: "#121212",
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {editandoId === r._id ? (
                <>
                  <h3 style={{ color: "#00ADB5" }}>
                    🎮 {r.juego?.nombre || "Juego desconocido"}
                  </h3>
                  <label>
                    ⭐ Puntuación:{" "}
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formEdicion.puntuacion}
                      onChange={(e) =>
                        setFormEdicion({
                          ...formEdicion,
                          puntuacion: e.target.value,
                        })
                      }
                      style={{
                        width: "60px",
                        padding: "4px",
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #555",
                        borderRadius: "6px",
                      }}
                    />
                  </label>
                  <textarea
                    value={formEdicion.texto}
                    onChange={(e) =>
                      setFormEdicion({ ...formEdicion, texto: e.target.value })
                    }
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "8px",
                      background: "#222",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: "6px",
                    }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() => guardarCambios(r._id)}
                      style={{
                        background: "#00ADB5",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      💾 Guardar
                    </button>
                    <button
                      onClick={() => setEditandoId(null)}
                      style={{
                        background: "#555",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ color: "#00ADB5", marginBottom: "6px" }}>
                    🎮 {r.juego?.nombre || "Juego desconocido"}
                  </h3>
                  <p style={{ margin: "4px 0" }}>
                    ⭐ <strong>{r.puntuacion}</strong> / 5
                  </p>
                  <p style={{ fontStyle: "italic", color: "#ccc" }}>
                    “{r.texto}”
                  </p>
                  <p style={{ marginTop: "6px", fontSize: "0.9em", color: "#aaa" }}>
                    👤 {r.autor || "Anónimo"} | 🕒{" "}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() => editarResena(r)}
                      style={{
                        background: "#0077ff",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarResena(r._id)}
                      style={{
                        background: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaResenas;
