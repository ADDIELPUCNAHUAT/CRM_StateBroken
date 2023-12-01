import React, { useState } from 'react';
import './FormClientes.css';
import '../../../../../src/styles/index.css';

interface Cliente {
  nombre: string;
  correoElectronico: string;
  fechaNac: string;
  fechaCreacion: string;
  telefono: number;
  idEmpleado_fk: number;
}

interface FormClientesProps {
  onClose: () => void;
}

function FormClientes({ onClose }: FormClientesProps) {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: '',
    correoElectronico: '',
    fechaNac: '',
    telefono: 0,
    idEmpleado_fk: parseInt(localStorage.getItem('idEmpleado') || '0'),
    fechaCreacion: new Date().toISOString(),
  });

  const [message, setMessage] = useState<string>(''); // estado para el mensaje de alerta

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    if (e.target.name === 'fechaNac') {
      const fecha = new Date(e.target.value);
      value = fecha.toISOString();
    } else if (e.target.name === 'telefono') {
      value = parseInt(e.target.value);
    }
    setCliente({ ...cliente, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('https://jimenezmiapi.somee.com/api/Cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(cliente),
    });
    if (response.ok) {
      setMessage('Post realizado correctamente');
      onClose(); // cierra el formulario
    } else {
      setMessage('Error al realizar el post');
    }
  };

  return (
    <div>
      {message && <div>{message}</div>}
      <form className="miFormCliente" onSubmit={handleSubmit}>
        <h1>Nuevo cliente</h1>
        <div className="miNombre">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required onChange={handleChange} />
        </div>
        <div className="miCorreo">
          <label htmlFor="correoElectronico">Correo Electronico</label>
          <input type="email" id="correoElectronico" name="correoElectronico" required onChange={handleChange} />
        </div>
        <div className="grupo1">
          <div>
            <label htmlFor="email">Telefono</label>
            <input type="number" id="telefono" name="telefono" required onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="fechaNac">Fecha de Nacimiento</label>
            <input type="date" id="fechaNac" name="fechaNac" required onChange={handleChange} />
          </div>
        </div>
        <button className='miBotonCliente' type="submit">Crear Cliente</button>
      </form>
    </div>
  );
}

export default FormClientes;