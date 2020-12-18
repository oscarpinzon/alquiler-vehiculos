import React, { useState } from "react";
// CSS
import "./App.css";
// Bootstrap Imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Componentes
import Carro from "./components/Carro";
import Formulario from "./components/Formulario";

const testCarros = [
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

const fechaHoy = new Date().toISOString().slice(0, 10);

const msPorDia = 1000 * 60 * 60 * 24;

const diasMinimoRenta = 1;

function difEnDias(a, b) {
  // Descarta la informacion de zona horaria y de tiempo.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / msPorDia);
}

function getFechasIntermedias(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  for (
    var arr = [], dt = new Date(startDate);
    dt <= endDate;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  let stringArray = arr.map((v) => v.toISOString().slice(0, 10));
  return stringArray;
}

const App = () => {
  const [showModal, setModal] = useState(false);
  const [selected, setSelected] = useState(testCarros[0]);
  const [carros, setCarros] = useState(testCarros);
  const [fechaInicioRenta, setFechaInicioRenta] = useState(fechaHoy);
  const [fechaFinRenta, setFechaFinRenta] = useState(fechaHoy);
  const [diasRenta, setDiasRenta] = useState(1);
  const [confirmacionAlquiler, setConfirmacionAlquiler] = useState(false);

  const handleClose = () => setModal(false);

  const handleSelected = (id) => () => {
    const carroSeleccionado = carros.find((carro) => carro.id === id);
    setFechaInicioRenta(fechaHoy);
    setFechaFinRenta(fechaHoy);
    setDiasRenta(diasMinimoRenta);
    setSelected(carroSeleccionado);
    setConfirmacionAlquiler(false);
    setModal(true);
  };

  const handleIntentoAlquiler = () => {
    const fechasSonValidas =
      new Date(fechaInicioRenta) <= new Date(fechaFinRenta);

    if (fechasSonValidas) {
      const fechasAlquiladas = getFechasIntermedias(
        fechaInicioRenta,
        fechaFinRenta
      );

      let alquilerLibre = true;

      for (const fecha of fechasAlquiladas) {
        if (selected.fechasRentadas.includes(fecha)) {
          alquilerLibre = false;
          break;
        }
      }

      if (alquilerLibre) {
        const nuevoCarro = { ...selected, fechasRentadas: fechasAlquiladas };
        setCarros(
          carros.map((carro) =>
            carro.id === selected.id ? { ...carro, ...nuevoCarro } : carro
          )
        );
        setConfirmacionAlquiler(true);
      } else {
        // TODO: Mostrar mensaje de error
        console.log("fechas no validas / ya esta alquilado");
        setConfirmacionAlquiler(false);
      }
    } else {
      // TODO: Mostrar mensaje de error
      console.log("fechas no validas / date input");
      setConfirmacionAlquiler(false);
    }
  };

  const handleFechaInicioRenta = (event) => {
    const fechaInicio = new Date(event.target.value);
    const fechaFin = new Date(fechaFinRenta);
    if (fechaInicio > fechaFin) {
      alert("La fecha es invalida");
    } else {
      setDiasRenta(difEnDias(fechaInicio, fechaFin) + diasMinimoRenta);
      setFechaInicioRenta(event.target.value);
    }
  };

  const handleFechaFinRenta = (event) => {
    const fechaInicio = new Date(fechaInicioRenta);
    const fechaFin = new Date(event.target.value);
    if (fechaInicio > fechaFin) {
      alert("La fecha es invalida");
    } else {
      setDiasRenta(difEnDias(fechaInicio, fechaFin) + diasMinimoRenta);
      setFechaFinRenta(event.target.value);
    }
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
          <Modal.Title>Rentar {selected.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmacionAlquiler ? (
            <Alert className="alert-success" role="alert">
              <Alert.Heading>Su reserva fue exitosa!</Alert.Heading>
              <p>Su reserva del {selected.nombre} ha sido completada.</p>
              <p>
                Fechas de reserva: {fechaInicioRenta} al {fechaFinRenta}
              </p>
              <p>Costo total: ${selected.precioPorDia * diasRenta}</p>
            </Alert>
          ) : (
            <Formulario
              selected={selected}
              fechaHoy={fechaHoy}
              fechaInicioRenta={fechaInicioRenta}
              handleFechaInicioRenta={handleFechaInicioRenta}
              fechaFinRenta={fechaFinRenta}
              handleFechaFinRenta={handleFechaFinRenta}
              diasRenta={diasRenta}
              handleIntentoAlquiler={handleIntentoAlquiler}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
