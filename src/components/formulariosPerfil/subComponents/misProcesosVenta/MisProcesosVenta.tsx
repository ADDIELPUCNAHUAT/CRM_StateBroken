import { useEffect, useState } from 'react';
import "./MisProcesosVenta.css";
import "../../../../../src/styles/index.css";

interface ProcesoVenta {
    id: number;
    tipodePropiedad: string;
    cliente: {
        telefono: number;
        nombre: string;
    };
    inmueble: {
        precioVenta: number;
    };
    estadoVentas: {
        nombre: string;
    };
    propiedadTerreno:{
        precioVenta: number;
    
    };
};

const getProcesosVenta = async () => {
    const response = await fetch(`http://jimenezmiapi.somee.com/api/ProcesoDeVenta?IdEmpleadoFk=${localStorage.getItem('idEmpleado')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProcesoVenta[] = await response.json();
    return data;
}

function MisProcesosVenta() {
    const [procesosVenta, setProcesosVenta] = useState<ProcesoVenta[]>([]);

    useEffect(() => {
        getProcesosVenta().then(data => setProcesosVenta(data));
    }, []);

    return (
        <>
            <div>
                <table className="miTabla">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Cliente</th>
                            <th>Número</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procesosVenta.map((procesoVenta) => (
                            <tr key={procesoVenta.id}>
                                <td>{procesoVenta.tipodePropiedad === 'string' ? 'Inmueble' : procesoVenta.tipodePropiedad}</td>
                                <td>{procesoVenta.cliente.nombre}</td>
                                <td>{procesoVenta.cliente.telefono}</td>
                                <td>{procesoVenta.tipodePropiedad === 'Inmueble' ? procesoVenta.inmueble.precioVenta : procesoVenta.propiedadTerreno.precioVenta}</td>
                                <td>{procesoVenta.estadoVentas.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MisProcesosVenta;