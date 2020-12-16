import React from "react";
import Card from "react-bootstrap/Card";

const Carro = ({ carro }) => {
  return (
    <div key={carro.id} className="col-md-4 text-center my-2">
      <Card className="bg-light">
        <img
          src={carro.imagen}
          className="card-img-top img-fluid p-2"
          alt="Imagen del carro"
        ></img>
        <div className="card-body">
          <h5 className="card-title">{carro.nombre}</h5>
          <p>Precio por dia: ${carro.precioPorDia}</p>
          <p>Pasajeros: {carro.pasajeros}</p>
          <p>Puertas: {carro.puertas}</p>
          <p>Transmision: {carro.transmision}</p>
          <a href="#" className="btn btn-primary">
            Rentar
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Carro;
