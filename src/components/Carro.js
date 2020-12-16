import React from "react";

const Carro = ({ carro }) => {
  return (
    <div key={carro.id}>
      <p>Precio por dia: {carro.precioPorDia}</p>
      <p>Nombre: {carro.nombre}</p>
      <p>Pasajeros: {carro.pasajeros}</p>
      <p>Puertas: {carro.puertas}</p>
      <p>Transmision: {carro.transmision}</p>
    </div>
  );
};

export default Carro;
