import React, { useEffect, useState } from 'react';
import "./FormProcesoVenta.css";
import '../../../../../src/styles/index.css';

interface Cliente {
    id: number;
    nombre: string;
    correoElectronico: string;
    fechaNac: string;
    fechaCreacion: string;
    telefono: number;
    empleado: null;
  }
  interface procesosVenta {
    idClienteFk: number;
    idEmpleadoFk: number;
    inmueblesFk: number;
    idPropiedadTerrenoFk: number;
    tipodePropiedad: string;
    fechaInicio: string;
    fechaFin: string;
    idEstadoDeVenta_fk: number;
    status: boolean;
  }


interface Property {
    tipo: string;
    id: number;
    direccion: string;
    descripcion: string;
    img1Path: string;
    fechaDeCreacion: string;
    empleado: {
      id: number;
      nombre: string;
      imgPerfil: string;
    };
  }
  


function FormProcesoVenta() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const tiposPropiedad = ["Terreno", "Inmueble"];
    const [procesoVenta, setProcesoVenta] = useState<procesosVenta>({
        idClienteFk: 1,
        idEmpleadoFk: Number(localStorage.getItem('idEmpleado')),
        inmueblesFk: 4,
        idPropiedadTerrenoFk: 4,
        tipodePropiedad: "string",
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date().toISOString(),
        idEstadoDeVenta_fk: 1,
        status: true
    });
    
    const postProcesoVenta = async () => {
        const response = await fetch('http://jimenezmiapi.somee.com/api/ProcesoDeVenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(procesoVenta)
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    }

    const fetchClientes = async () => {
        const response = await fetch(`https://jimenezmiapi.somee.com/api/Cliente/empleado/${localStorage.getItem("idEmpleado")}`,{
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
        });
        const data = await response.json();
        setClientes(data);
    };

    const fetchProperties = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`https://jimenezmiapi.somee.com/api/InmueblesyTerrenos/empleado/${localStorage.getItem("idEmpleado")}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();
        setProperties(data);
    };

    useEffect(() => {
        fetchClientes();
        fetchProperties();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(procesoVenta);
        try {
            await postProcesoVenta();
            alert('Proceso de venta creado exitosamente');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al crear el proceso de venta');
        }
    };
    return (
        <div>
            <form className='miFormCliente' onSubmit={handleSubmit}>
                <label htmlFor="opcion1">Cliente:</label>
                <input
                    list="opciones1"
                    id="opcion1"
                    name="opcion1"
                    onChange={e => {
                        const clienteSeleccionado = clientes.find(cliente => cliente.nombre === e.target.value);
                        if (clienteSeleccionado) {
                            setProcesoVenta(prevState => ({ ...prevState, idClienteFk: clienteSeleccionado.id }));
                        }
                    }}
                />
    
                <datalist id="opciones1">
                {clientes.map((cliente, index) => (
                <option key={index} value={cliente.nombre} />
                ))}
                </datalist>
    
                <br />
    
                <label htmlFor="opcion2">Propiedad:</label>
                <input
                    list="opciones2"
                    id="opcion2"
                    name="opcion2"
                    onChange={e => {
                        const propiedadSeleccionada = properties.find(property => property.direccion === e.target.value);
                        if (propiedadSeleccionada) {
                            setProcesoVenta(prevState => ({ ...prevState, inmueblesFk: propiedadSeleccionada.id, idPropiedadTerrenoFk: propiedadSeleccionada.id }));
                        }
                    }}
                />
    
                <datalist id="opciones2">
                {properties.map((property, index) => (
                <option key={index} value={property.direccion} />
                ))}
                </datalist>
    
                <br />

                <label htmlFor="opcion3">TipoPropiedad:</label>
            <input
                list="opciones3"
                id="opcion3"
                name="opcion3"
                onChange={e => {
                    setProcesoVenta(prevState => ({ ...prevState, tipodePropiedad: e.target.value }));
                }}
            />

            <datalist id="opciones3">
            {tiposPropiedad.map((tipo, index) => (
            <option key={index} value={tipo} />
            ))}
            </datalist>
                <br />
    
                <button className='miBotonCliente' type="submit">Crear</button>
            </form>
        </div>
    );
}


export default FormProcesoVenta;
