import { useState } from "react";

function FormularioJuego() {
  const [form, setForm] = useState({
    nombre: "",
    plataforma: "",
    portadaURL: "",
    estado: "Pendiente",
    horasJugadas: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "horasJugadas" ? Number(value) : value,
    });
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
        plataforma: "",
        portadaURL: "",
        estado: "Pendiente",
        horasJugadas: 0,
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
      {/* Nombre */}
      <label>Nombre del juego:</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Ej: God of War"
        required
        style={inputStyle}
      />

      {/* Plataforma */}
      <label>Plataforma:</label>
      <input
        type="text"
        name="plataforma"
        value={form.plataforma}
        onChange={handleChange}
        placeholder="Ej: PlayStation 5"
        required
        style={inputStyle}
      />

      {/* Portada */}
      <label>URL de la portada:</label>
      <input
        type="url"
        name="portadaURL"
        value={form.portadaURL}
        onChange={handleChange}
        placeholder="https://..."
        style={inputStyle}
      />

      {/* Estado */}
      <label>Estado:</label>
      <select
        name="estado"
        value={form.estado}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Jugando">Jugando</option>
        <option value="Completado">Completado</option>
      </select>

      {/* Horas jugadas */}
      <label>Horas jugadas:</label>
      <input
        type="number"
        name="horasJugadas"
        value={form.horasJugadas}
        onChange={handleChange}
        min="0"
        placeholder="Ej: 12"
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Agregar Juego
      </button>
    </form>
  );
}

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #444",
  background: "#1e1e1e",
  color: "#f2f2f2",
};

const buttonStyle = {
  background: "#00ADB5",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background 0.3s",
};

export default FormularioJuego;
