import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Carro = ({ carro, handleSelected }) => {
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
          <p>Transmisión: {carro.transmision}</p>
          <Button
            onClick={handleSelected(carro.id)}
            className="btn btn-primary"
          >
            Rentar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Carro;
