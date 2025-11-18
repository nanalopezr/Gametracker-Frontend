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
        background: "rgba(30, 30, 30, 0.9)",
        color: "#f2f2f2",
        padding: "28px",
        borderRadius: "16px",
        //boxShadow: "0 0 20px rgba(0, 150, 200, 0.3)",
        maxWidth: "650px",
        margin: "0 auto",
        marginTop: "30px",
        backdropFilter: "blur(6px)",
      }}
    >
      <h2
        style={{
          color: "#91e0ebff",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "1.6rem",
        }}
      >
        📝 Crear Reseña
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>

        {/* SELECT */}
        <label style={{ fontWeight: "bold", color: "#C084FC" }}>
          Juego:
          <select
            name="juego"
            value={form.juego}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #00ADB5",
              marginTop: "6px",
              background: "#111",
              color: "#E6F7FF",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <option
              value=""
              style={{ background: "#1E1E1E", color: "#A3A3A3" }}
            >
              Selecciona un juego
            </option>

            {Array.isArray(juegos) &&
              juegos.map((j) => (
                <option
                  key={j._id}
                  value={j.nombre}
                  style={{
                    background: "#1A1A1A",
                    color: "#E6F7FF",
                    padding: "10px",
                  }}
                >
                  {j.nombre}
                </option>
              ))}
          </select>
        </label>

        {/* PUNTUACIÓN */}
        <label style={{ fontWeight: "bold", color: "#C084FC" }}>
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
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #00ADB5",
              background: "#111",
              color: "#E6F7FF",
            }}
          />
        </label>

        {/* TEXTO */}
        <label style={{ fontWeight: "bold", color: "#C084FC" }}>
          Reseña:
          <textarea
            name="texto"
            value={form.texto}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #00ADB5",
              background: "#111",
              color: "#E6F7FF",
              resize: "none",
            }}
          />
        </label>

        {/* AUTOR */}
        <label style={{ fontWeight: "bold", color: "#C084FC" }}>
          Autor:
          <input
            type="text"
            name="autor"
            value={form.autor}
            onChange={handleChange}
            placeholder="Tu nombre (opcional)"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #00ADB5",
              background: "#111",
              color: "#E6F7FF",
            }}
          />
        </label>

        {/* BOTÓN */}
        <button
          type="submit"
          style={{
            background: "#00E0FF",
            color: "#000",
            padding: "12px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
            textShadow: "0 0 5px #fff",
          }}
          onMouseEnter={(e) =>
            (e.target.style.boxShadow = "0 0 12px #00E0FF")
          }
          onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
        >
          Guardar Reseña
        </button>
      </form>

      {mensaje && (
        <p style={{ color: "lightgreen", textAlign: "center", marginTop: "12px" }}>
          {mensaje}
        </p>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "12px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormularioResena;