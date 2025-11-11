import { useState, useEffect } from "react";

function Resenas() {
  const [resenas, setResenas] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [form, setForm] = useState({
    juego: "",
    puntuacion: "",
    texto: "",
    autor: ""
  });

  // ✅ Cargar reseñas existentes
  const obtenerResenas = async () => {
    const res = await fetch("http://localhost:3000/api/resenas");
    const data = await res.json();
    setResenas(data);
  };

  // ✅ Cargar juegos disponibles
  const obtenerJuegos = async () => {
    const res = await fetch("http://localhost:3000/api/juegos");
    const data = await res.json();
    setJuegos(data);
  };

  // ✅ useEffect para cargar datos al montar
  useEffect(() => {
    obtenerResenas();
    obtenerJuegos();
  }, []);

  // ✅ Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Enviar reseña nueva
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Error al crear reseña");

      alert("✅ Reseña creada con éxito");
      setForm({ juego: "", puntuacion: "", texto: "", autor: "" });
      obtenerResenas(); // Recargar lista
    } catch (error) {
      alert("❌ No se pudo crear la reseña");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎮 Reseñas de Juegos</h1>

      {/* 📋 Lista de reseñas */}
      <h2>📚 Reseñas existentes</h2>
      {resenas.length === 0 ? (
        <p>No hay reseñas aún.</p>
      ) : (
        <ul>
          {resenas.map((r) => (
            <li key={r._id}>
              <strong>{r.juego?.nombre || "Juego desconocido"}</strong> — ⭐ {r.puntuacion}/5  
              <br />
              {r.texto} <br />
              <em>por {r.autor}</em>
              <hr />
            </li>
          ))}
        </ul>
      )}

      {/* 📝 Formulario de reseña */}
      <h2>📝 Escribir una nueva reseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Juego:</label>
        <select name="juego" value={form.juego} onChange={handleChange} required>
          <option value="">Selecciona un juego</option>
          {juegos.map((j) => (
            <option key={j._id} value={j._id}>{j.nombre}</option>
          ))}
        </select>
        <br /><br />

        <label>Puntuación (1-5):</label>
        <input
          type="number"
          name="puntuacion"
          value={form.puntuacion}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />
        <br /><br />

        <label>Texto:</label>
        <textarea
          name="texto"
          placeholder="Escribe tu reseña..."
          value={form.texto}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Autor:</label>
        <input
          type="text"
          name="autor"
          placeholder="Tu nombre"
          value={form.autor}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
}

export default Resenas;
