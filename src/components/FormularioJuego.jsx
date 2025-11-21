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

      alert("Juego agregado con éxito");
      setForm({
        nombre: "",
        plataforma: "",
        portadaURL: "",
        estado: "Pendiente",
        horasJugadas: 0,
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Hubo un problema al agregar el juego.");
    }
  };

  return (
    <div
      style={{
        background: "#2b2e54",
        padding: "30px",
        borderRadius: "16px",
        maxWidth: "600px",
        margin: "25px auto",
        color: "#E6F7FF",
        backdropFilter: "blur(8px)",
      }}
    >
      <h2
        style={{
          color: "#adb4e4",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        ➕ Agregar Nuevo Juego
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {/* Nombre */}
        <label style={labelStyle}>Nombre del juego:</label>
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
        <label style={labelStyle}>Plataforma:</label>
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
        <label style={labelStyle}>URL de la portada:</label>
        <input
          type="url"
          name="portadaURL"
          value={form.portadaURL}
          onChange={handleChange}
          placeholder="https://..."
          style={inputStyle}
        />

        {/* Estado */}
        <label style={labelStyle}>Estado:</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          style={selectStyle}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
        </select>

        {/* Horas jugadas */}
        <label style={labelStyle}>Horas jugadas:</label>
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
          ➕ Agregar Juego
        </button>
      </form>
    </div>
  );
}

/* Estilos reutilizables */
const labelStyle = {
  fontWeight: "bold",
  color: "#C084FC",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #00ADB5",
  background: "#2b2e54",
  color: "#E6F7FF",
  outline: "none",
  transition: "0.25s",
};

const selectStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #00ADB5",
  background: "#2b2e54",
  color: "#E6F7FF",
  cursor: "pointer",
  outline: "none",
  transition: "0.25s",
};

const buttonStyle = {
  background: "#00E0FF",
  color: "#000",
  border: "none",
  padding: "13px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "0.3s",
  textShadow: "0 0 5px #fff",
  
};

export default FormularioJuego;
