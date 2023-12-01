import React, { useEffect, useState }  from 'react';
import "./FormCasa.css";
import "../../../../../../../src/styles/index.css";
interface Casa {
    idEmpleadoFk: number;
    idTipoFk: number;
    direccion: string;
    descripcion: string;
    precioVenta: number;
    precioRenta: number;
    metrosCuadrados: number;
    metrosConstruidos: number;
    fechaDeCreacion: string;
    fechaUltimaModificacion: string;
    idEditorFk: number;
    habitaciones: number;
    banos: number;
    piscina: boolean;
    balcon: boolean;
    cocina: boolean;
    comedor: boolean;
    garaje: boolean;
    numPlantas: number;
    anoConstruccion: string;
    sistemaCalefaccion: boolean;
    aireAcondicionado: boolean;
    amueblada: boolean;
    status: boolean;
    img1Path: string;
    img2Path: string;
    img3Path: string;
    img4Path: string;
}



function getRandomImage(num: number) {
    return `/img/${Math.random() < 0.5 ? 'casa' : 'depa'}${num}.jpg`;
}

interface FomrCasaProps{
    onClose: () => void;
}

/* 
const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
   
    const formState = getDefaultFormState();

    try {
        const response = await fetch('https://jimenezmiapi.somee.com/api/Inmueble', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formState)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }

        const data = await response.json();
        alert('Formulario enviado correctamente');
        console.log(data);
    } catch (error) {
        console.error(error);
    }finally{
        
    }
}; */

export function FormCasa({onClose}: FomrCasaProps) {
    const[casa,setCasa] = useState<Casa>({
    idEmpleadoFk: Number(localStorage.getItem('idEmpleado')),
    idTipoFk: 1,
    direccion: "Calle 1",
    descripcion: "esta es una casa",
    precioVenta: 200,
    precioRenta: 2000,
    metrosCuadrados: 20,
    metrosConstruidos: 30,
    fechaDeCreacion: new Date().toISOString(),
    fechaUltimaModificacion: new Date().toISOString(),
    idEditorFk: 0,
    habitaciones: 2,
    banos: 2,
    piscina: false,
    balcon: false,
    cocina: false,
    comedor: false,
    garaje: false,
    numPlantas: 2,
    anoConstruccion: '2009',
    sistemaCalefaccion: false,
    aireAcondicionado: true,
    amueblada: false,
    status: true,
    img1Path: getRandomImage(1),
    img2Path: getRandomImage(2),
    img3Path: getRandomImage(3),
    img4Path: getRandomImage(4)
    });

    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        console.log(casa);
    }, [casa]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number | boolean = e.target.value;
    
        if (e.target.type === 'number') {
            value = parseInt(e.target.value);
        } else if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }
    
        if (e.target.name === 'anoConstruccion') {
            const fecha = new Date(parseInt(e.target.value), 0); // Crear una fecha con el año y el mes de enero
            value = fecha.toISOString();
        }
    
        setCasa(prevCasa => ({ ...prevCasa, [e.target.name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://jimenezmiapi.somee.com/api/Inmueble', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },  
                body: JSON.stringify(casa),
            });
    
            const responseClone = response.clone();
    
            if(response.ok){
                setMensaje('Post realizado correctamente');
                console.log('Post realizado correctamente');
                if (typeof onClose === 'function') {
                    onClose();
                }
            } else {
                try {
                    const responseData = await responseClone.json();
                    setMensaje('Error al realizar el post');
                    console.error(`Error al realizar el post: ${responseData}`);
                } catch (error) {
                    const responseText = await response.text();
                    setMensaje('Error al realizar el post');
                    console.error(`Error al realizar el post: ${responseText}`);
                }
            }
        } catch (error) {
            setMensaje('Error al realizar el post');
            console.error(`Error al realizar el post: ${error}`);
        }
    }
    return (
        <div>
            {mensaje && <div className="alert alert-info" style={{padding: '10px', textAlign: 'center'}}>{mensaje}</div>}
           <form className='miFormCasa'  onSubmit={handleSubmit}>
                <h1 >Nueva casa</h1>
                <div className='miDireccionCasa'>
                    <label htmlFor="direccionCasa">Direccion</label>
                    <input type="text" id="direccionCasa" name="direccion" required onChange={handleChange} />
                </div>
                <div className='grupoCasa1'>
                    <div>
                        <label htmlFor="precioCasa">Precio</label>
                        <input type="number" id="precioCasa" name="precioVenta" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="anioConstruccionCasa">Año construccion</label>
                        <input type="number" id="anioConstruccionCasa" name="anoConstruccion" required onChange={handleChange}  />
                    </div>
                    <div>
                        <label htmlFor="anioConstruccionCasa">Metros cuadrados</label>
                        <input type="number" id="anioConstruccionCasa" name="metrosCuadrados" required onChange={handleChange}  />
                    </div>
                </div>
                <div className='miTextboxCasa'>
                    <label htmlFor="textboxCasa">Descripcion</label>
                    <input type="text" id="textboxCasa" name="descripcion" required  onChange={handleChange} />
                </div>
                <div className='grupoCasa1'>
                    <div>
                        <label htmlFor="habitacionesCasa">Habitaciones</label>
                        <input type="number" id="habitacionesCasa" name="habitaciones" required onChange={handleChange}  />
                    </div>
                    
                    <div>
                        <label htmlFor="baniosCasa">Baños</label>
                        <input type="number" id="baniosCasa" name="banos" required onChange={handleChange} />
                    </div>
                </div>
                <div className='grupoTextCasa'>
                    <div>
                        <input type="checkbox" id="piscinaCasa" name="piscina"  onChange={handleChange} />
                        <label htmlFor="piscina">Piscina</label>
                    </div>
                    <div>
                        <input type="checkbox" id="balconCasa" name="balcon"  onChange={handleChange}  />
                        <label htmlFor="balcon">Balcón</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="cocinaCasa" name="cocina"  onChange={handleChange} />
                        <label htmlFor="cocina">Cocina</label>
                    </div>
                    <div>
                        <input type="checkbox" id="garajeCasa" name="garaje"  onChange={handleChange} />
                        <label htmlFor="garaje">Garaje</label>
                    </div>
                </div>
                <div className='grupoImg'>
                    <div>
                        <label htmlFor="imgCasa1">Imagen 1:</label>
                        <input type="file" id="imgCasa1" name="imgCasa1" accept="image/*"></input>
                    </div>
                    <div>
                        <label htmlFor="imgCasa2">Imagen 2:</label>
                        <input type="file" id="imgCasa2" name="imgCasa2" accept="image/*"></input>
                    </div>
                    <div>
                        <label htmlFor="imgCasa3">Imagen 3:</label>
                        <input type="file" id="imgCasa3" name="imgCasa3" accept="image/*"></input>
                    </div>
                    <div>
                        <label htmlFor="imgCasa4">Imagen 4:</label>
                        <input type="file" id="imgCasa4" name="imgCasa4" accept="image/*"></input>
                    </div>
                </div>
                <button className='miBotonCasa' type="submit" >Agregar</button>
            </form>
        </div>
    );

}

