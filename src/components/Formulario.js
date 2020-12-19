import React from "react";
import Button from "react-bootstrap/Button";

const Formulario = ({
  selected,
  fechaInicioRenta,
  handleFechaInicioRenta,
  fechaHoy,
  fechaFinRenta,
  handleFechaFinRenta,
  diasRenta,
  handleIntentoAlquiler,
}) => {
  return (
    <div>
      <p>Modelo: {selected.nombre}</p>
      <p>Precio por dia: ${selected.precioPorDia}</p>
      <p>Pasajeros: {selected.pasajeros}</p>
      <p>Puertas: {selected.puertas}</p>
      <p>Transmisión: {selected.transmision}</p>
      <form>
        <label>
          Inicio de la renta:
          <input
            type="date"
            value={fechaInicioRenta}
            onChange={handleFechaInicioRenta}
            min={fechaHoy}
            required
          ></input>
        </label>
        <label>
          Fin de la renta:
          <input
            type="date"
            value={fechaFinRenta}
            onChange={handleFechaFinRenta}
            min={fechaHoy}
            required
          ></input>
        </label>
        <p>Días de renta: {diasRenta}</p>
        <p>Costo de renta: ${diasRenta * selected.precioPorDia}</p>
        <Button variant="primary" onClick={handleIntentoAlquiler}>
          Rentar
        </Button>
      </form>
    </div>
  );
};

export default Formulario;
