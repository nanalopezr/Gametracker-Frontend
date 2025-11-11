import { useState } from "react";

function FormularioJuego() {
  const [form, setForm] = useState({
    nombre: "",
    genero: "",
    plataforma: "",
    fechaLanzamiento: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al agregar el juego");

      alert("✅ Juego agregado con éxito");
      setForm({
        nombre: "",
        genero: "",
        plataforma: "",
        fechaLanzamiento: "",
      });
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Hubo un problema al agregar el juego.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <label>Nombre del juego:</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Ej: The Legend of Zelda"
        required
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #444",
          background: "#1e1e1e",
          color: "#f2f2f2",
        }}
      />

      <label>Género:</label>
      <input
        type="text"
        name="genero"
        value={form.genero}
        onChange={handleChange}
        placeholder="Ej: Aventura"
        required
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #444",
          background: "#1e1e1e",
          color: "#f2f2f2",
        }}
      />

      <label>Plataforma:</label>
      <input
        type="text"
        name="plataforma"
        value={form.plataforma}
        onChange={handleChange}
        placeholder="Ej: Nintendo Switch"
        required
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #444",
          background: "#1e1e1e",
          color: "#f2f2f2",
        }}
      />

      <label>Fecha de lanzamiento:</label>
      <input
        type="date"
        name="fechaLanzamiento"
        value={form.fechaLanzamiento}
        onChange={handleChange}
        required
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #444",
          background: "#1e1e1e",
          color: "#f2f2f2",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#00ADB5",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Agregar Juego
      </button>
    </form>
  );
}

export default FormularioJuego;
