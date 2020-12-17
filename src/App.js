import React, { useState } from "react";
// CSS
import "./App.css";
// Bootstrap Imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// Componentes
import Carro from "./components/Carro";

const carros = [
  {
    id: 1,
    precioPorDia: 5,
    nombre: "Hyundai Accent",
    pasajeros: 4,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/hyundai_accent.png",
    fechasRentadas: [],
  },
  {
    id: 2,
    precioPorDia: 4,
    nombre: "Toyota Yaris",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/toyota_yaris.png",
    fechasRentadas: [],
  },
  {
    id: 3,
    precioPorDia: 6,
    nombre: "Kia Rio",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/kia_rio.png",
    fechasRentadas: [],
  },
  {
    id: 4,
    precioPorDia: 5,
    nombre: "Kia Picanto",
    pasajeros: 2,
    puertas: 2,
    transmision: "Automatica",
    imagen: "./img/kia_picanto.png",
    fechasRentadas: [],
  },
  {
    id: 5,
    precioPorDia: 4,
    nombre: "Nissan Almera",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/nissan_almera.png",
    fechasRentadas: [],
  },
  {
    id: 6,
    precioPorDia: 6,
    nombre: "Hyundai i10",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/hyundai_i10.png",
    fechasRentadas: [],
  },
];

const App = () => {
  const [showModal, setModal] = useState(false);
  const [selected, setSelected] = useState(carros[0]);
  const handleClose = () => setModal(false);
  const handleSelected = (id) => () => {
    const carroSeleccionado = carros.filter((carro) => carro.id === id);
    console.log(carroSeleccionado[0]);
    setSelected(carroSeleccionado[0]);
    setModal(true);
  };

  return (
    <>
      <Container>
        <h1 className="header">Alquiler de Vehiculos</h1>
        <Row>
          {carros.map((carro) => (
            <Carro
              key={carro.id}
              carro={carro}
              handleSelected={handleSelected}
            />
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} className="rent-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selected.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Precio por dia: ${selected.precioPorDia}</p>
          <p>Pasajeros: {selected.pasajeros}</p>
          <p>Puertas: {selected.puertas}</p>
          <p>Transmision: {selected.transmision}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
