function TarjetaJuego({ juego }) {
  return (
    <div
      style={{
        background: "#1f1f1f",
        borderRadius: "10px",
        padding: "15px",
        width: "200px",
        textAlign: "center"
      }}
    >
      <img
        src={juego.portadaURL || "https://via.placeholder.com/150"}
        alt={juego.nombre}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
      />
      <h3>{juego.nombre}</h3>
      <p>{juego.plataforma}</p>
      <p>Estado: {juego.estado}</p>
      <p>Horas jugadas: {juego.horasJugadas}</p>
    </div>
  );
}

export default TarjetaJuego;
