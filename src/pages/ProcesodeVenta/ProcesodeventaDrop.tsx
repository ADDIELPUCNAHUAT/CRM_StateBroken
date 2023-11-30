import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState,useEffect } from 'react';
import './ProcesodeVenta.css'

interface Task {
    id: number;
    tipodePropiedad: string;
    idEstadoDeVenta_fk: number;
    
    cliente: {
        nombre: string;
        
    };
    Propiedad: {
        direccion: string;
  
    };
    empleado: {
        nombre: string
    };

    estadoVentas: {
        nombre: string;
    };
    }


const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`https://jimenezmiapi.somee.com/api/ProcesoDeVenta?IdEmpleadoFk=${localStorage.getItem('idEmpleado')}`,{
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();

    const tasks = data.map((item: any) => {
        let task: Task = {
            id: item.id,
            tipodePropiedad: item.tipodePropiedad,
            idEstadoDeVenta_fk:parseInt(item.idEstadoDeVenta_fk) ,
            cliente: {
                nombre: item.cliente.nombre
              
            },
            Propiedad: item.tipodePropiedad === 'Inmueble' ? item.inmueble : item.propiedadTerreno,
            empleado: {
                nombre: item.empleado.nombre
               
            },
            estadoVentas: {
                nombre: item.estadoVentas.nombre,
                }
    }
        return task;
    });

    return tasks;
}

const updateTask = async (id: number, newState: number) => {
    const response = await fetch(`https://jimenezmiapi.somee.com/api/CambiarEstadoVenta/${id}/${newState}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ idEstadoDeVenta_fk: newState })
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
    }
}

export const DragAndDrop = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = async () => {
        const tasksFromAPI = await fetchTasks();
        console.log(tasksFromAPI);
        setTasks(tasksFromAPI);
    }

    useEffect(() => {
        getTasks();
    }, []);



    const getList = (list: number) => {
        return tasks.filter(item => Number(item.idEstadoDeVenta_fk) === list)
    }
    
    const startDrag = (evt: React.DragEvent<HTMLDivElement>, item: Task) => {
        evt.dataTransfer.setData('itemID', item.id.toString())
        console.log(item);
    }
    
    const draggingOver = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }
    
    const onDrop = (evt: React.DragEvent<HTMLDivElement>, list: number) => {
        const itemID = evt.dataTransfer.getData('itemID');
        const item = tasks.find(item => item.id === parseInt(itemID));

        if (item) {
            item.idEstadoDeVenta_fk = list;

            const newState = tasks.map(task => {
                if(task.id === parseInt(itemID)) return item;
                return task
            })

            setTasks(newState);

            updateTask(item.id, list).then(() => {
                getTasks(); // Actualizar la lista de tareas
            }).catch(error => {
                console.error('Error al actualizar la tarea:', error);
            });
        }
    }

    return (
        <>
        <div className='ProcessVen'>
            <h1>
               {/*  Arrastrar y Soltar &nbsp;
                <img className='icon-react' src="src/assets/react.svg" alt="" /> */}
                PROCESOS DE VENTA
            </h1>
            <br/>
    
            <div className='drag-and-drop'>
                <div className='column column--1'>
                    <h3>
                        Interes
                    </h3>
                    <div className='dd-zone' onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 1))}>
                        {getList(1).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.Propiedad.direccion}</strong>
                                <p className='body'>{item.cliente.nombre}</p>
                                <p className='body'>{item.empleado.nombre}</p>
                                <p className='body'>{item.estadoVentas.nombre}</p>
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className='column column--2'>
                    <h3>
                        Negociacion
                    </h3>
                    <div className='dd-zone' onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 2))}>
                        {getList(2).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.Propiedad.direccion}</strong>
                                <p className='body'>{item.cliente.nombre}</p>
                                <p className='body'>{item.empleado.nombre}</p>
                                <p className='body'>{item.estadoVentas.nombre}</p>
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className='column column--3'>
                    <h3>
                        Casi venta
                    </h3>
                    <div className='dd-zone' onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 3))}>
                        {getList(3).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.Propiedad.direccion}</strong>
                                <p className='body'>{item.cliente.nombre}</p>
                                <p className='body'>{item.empleado.nombre}</p>
                                <p className='body'>{item.estadoVentas.nombre}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
        </>
    );

                        }