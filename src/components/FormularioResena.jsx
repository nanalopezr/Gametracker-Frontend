import { useEffect, useState } from "react";

function FormularioResena() {
  const [form, setForm] = useState({
    juego: "",
    puntuacion: "",
    texto: "",
    autor: "",
  });

  const [juegos, setJuegos] = useState([]); 
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/juegos");
        if (!res.ok) throw new Error("Error al obtener los juegos");
        const data = await res.json();
        setJuegos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error al cargar juegos:", err);
        setError(err.message);
      }
    };

    obtenerJuegos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al crear la reseña");

      const data = await res.json();
      console.log("✅ Reseña creada:", data);
      setMensaje("🎉 Reseña creada exitosamente!");
      setForm({ juego: "", puntuacion: "", texto: "", autor: "" });
    } catch (err) {
      console.error("❌ Error en el envío:", err);
      setError("Hubo un problema al enviar la reseña.");
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
        maxWidth: "600px",
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#00ADB5", textAlign: "center" }}>
        📝 Crear Reseña
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        
        {/* 🔸 SELECT DE JUEGO (YA ENVÍA *NOMBRE*) */}
        <label>
          Juego:
          <select
            name="juego"
            value={form.juego}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #333",
              marginTop: "4px",
              background: "#121212",
              color: "#f2f2f2",
            }}
          >
            <option value="">Selecciona un juego</option>

            {Array.isArray(juegos) &&
              juegos.map((j) => (
                <option key={j._id} value={j.nombre}>
                  {j.nombre}
                </option>
              ))}
          </select>
        </label>

        {/* 🔸 Puntuación */}
        <label>
          Puntuación (1-5):
          <input
            type="number"
            name="puntuacion"
            value={form.puntuacion}
            onChange={handleChange}
            min="1"
            max="5"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#121212",
              color: "#f2f2f2",
            }}
          />
        </label>

        {/* 🔸 Comentario */}
        <label>
          Reseña:
          <textarea
            name="texto"
            value={form.texto}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#121212",
              color: "#f2f2f2",
            }}
          />
        </label>

        {/* 🔸 Autor */}
        <label>
          Autor:
          <input
            type="text"
            name="autor"
            value={form.autor}
            onChange={handleChange}
            placeholder="Tu nombre (opcional)"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#121212",
              color: "#f2f2f2",
            }}
          />
        </label>

        {/* 🔸 Botón */}
        <button
          type="submit"
          style={{
            background: "#00ADB5",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Guardar Reseña
        </button>
      </form>

      {mensaje && (
        <p style={{ color: "lightgreen", textAlign: "center", marginTop: "10px" }}>
          {mensaje}
        </p>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormularioResena;
