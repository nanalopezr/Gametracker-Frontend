import { useState, useEffect } from "react";

function CrearResena() {
  const [juegos, setJuegos] = useState([]);
  const [juegoId, setJuegoId] = useState("");
  const [puntuacion, setPuntuacion] = useState(1);
  const [texto, setTexto] = useState("");
  const [autor, setAutor] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [resenas, setResenas] = useState([]);

  // Cargar juegos
  useEffect(() => {
    fetch("http://localhost:3000/api/juegos")
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch(() => setMensaje("❌ Error al cargar juegos"));
  }, []);

  // Cargar reseñas
  useEffect(() => {
    fetch("http://localhost:3000/api/resenas")
      .then((res) => res.json())
      .then((data) => setResenas(data))
      .catch(() => setMensaje("❌ Error al cargar reseñas"));
  }, []);

  // Enviar reseña
  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevaResena = { juego: juegoId, puntuacion, texto, autor };
    const respuesta = await fetch("http://localhost:3000/api/resenas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaResena),
    });

    if (respuesta.ok) {
      setMensaje("✅ Reseña creada con éxito");
      setTexto("");
      setAutor("");
      setPuntuacion(1);
      setJuegoId("");
      const nuevas = await fetch("http://localhost:3000/api/resenas");
      setResenas(await nuevas.json());
    } else {
      setMensaje("❌ Error al crear la reseña");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Reseña</h2>
      <form onSubmit={manejarEnvio}>
        <label>Juego:</label>
        <select value={juegoId} onChange={(e) => setJuegoId(e.target.value)} required>
          <option value="">-- Selecciona un juego --</option>
          {juegos.map((j) => (
            <option key={j._id} value={j._id}>{j.nombre}</option>
          ))}
        </select>
        <br /><br />

        <label>Puntuación (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={puntuacion}
          onChange={(e) => setPuntuacion(e.target.value)}
          required
        />
        <br /><br />

        <label>Texto:</label>
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} required />
        <br /><br />

        <label>Autor:</label>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Tu nombre"
        />
        <br /><br />

        <button type="submit">Enviar reseña</button>
      </form>

      <p>{mensaje}</p>

      <h3>📝 Reseñas</h3>
      {resenas.length === 0 ? (
        <p>No hay reseñas aún</p>
      ) : (
        <ul>
          {resenas.map((r) => (
            <li key={r._id}>
              <strong>{r.juego?.nombre || "Juego desconocido"}</strong> — ⭐ {r.puntuacion}  
              <br />{r.texto} <em>por {r.autor}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CrearResena;
