import "./FormTerreno.css";
import "../../../../../../../src/styles/index.css";
import React from 'react';
import "./FormTerreno.css";
import "../../../../../../../src/styles/index.css";

function getRandomBoolean() {
    return Math.random() < 0.5;
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDefaultFormData() {
    const isTerreno = Math.random() < 0.5;
    const imgNum = getRandomNumber(1, 4);
    const imgType = isTerreno ? 'terreno' : 'lote';

    return {
        idEmpleadoFk: Number(localStorage.getItem('idEmpleado')),
        idTipoFk: 1,
        direccion: `CALLE ${getRandomNumber(1, 100)}`,
        descripcion: `Es un ${isTerreno ? 'terreno grande' : 'lote pequeño'}`,
        precioVenta: getRandomNumber(10000, 50000),
        precioRenta: 0,
        accesosCarreteras: getRandomBoolean(),
        serviciosBasicos: getRandomBoolean(),
        arbolado: getRandomBoolean(),
        fechaDeCreacion:new Date(Date.now()).toISOString(),
        fechaUltimoModificacion: new Date(getRandomNumber(1990, 2022), 0, 1).toISOString(),
        idEditorFk: 0,
        status: true,
        img1Path: `/img/${imgType}${imgNum}.jpg`,
        img2Path: `/img/${imgType}${imgNum + 1}.jpg`,
        img3Path: `/img/${imgType}${imgNum + 2}.jpg`,
        img4Path: `/img/${imgType}${imgNum + 3}.jpg`
    };
}
const handleSubmit = async () => {
    const formData = getDefaultFormData();

    try {
        const response = await fetch('https://jimenezmiapi.somee.com/api/PropiedadTerreno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            alert('Formulario enviado correctamente');
            console.log(data);
        } else {
            console.log('La respuesta no es JSON válido');
        }
    } catch (error) {
        console.error(error);
    }
};
function FormTerreno() {
    return (
        <div>
            <form className='miFormTerreno' action="/submit" method="post" >
                <h1 >Nuevo terreno</h1>
                <div className='miDireccionTerreno'>
                    <label htmlFor="direccionTerreno">Direccion</label>
                    <input type="text" id="direccionTerreno" name="direccionTerreno" required />
                </div>
                <div className='grupoTerreno1'>
                    <div>
                        <label htmlFor="precioTerreno">Precio</label>
                        <input type="number" id="precioTerreno" name="precioTerreno" required />
                    </div>
                    <div>
                        <label htmlFor="anioConstruccionTerreno">Año construccion</label>
                        <input type="number" id="anioConstruccionTerreno" name="anioConstruccionTerreno" required />
                    </div>
                    <div>
                        <label htmlFor="anioConstruccionTerreno">Metros cuadrados</label>
                        <input type="number" id="anioConstruccionTerreno" name="anioConstruccionTerreno" required />
                    </div>
                </div>
                <div className='miTextboxTerreno'>
                    <label htmlFor="textboxTerreno">Descripcion</label>
                    <input type="text" id="textboxTerreno" name="textboxTerreno" required />
                </div>
                <div className='grupoTextTerreno'>
                    <div>
                        <input type="checkbox" id="piscinaTerreno" name="piscinaTerreno" value="yes" />
                        <label htmlFor="piscinaTerreno">Carreteras</label>
                    </div>
                    <div>
                        <input type="checkbox" id="balconTerreno" name="balconTerreno" value="yes" />
                        <label htmlFor="balconTerreno">Posee Agua</label>
                    </div>
                    <div>
                        <input type="checkbox" id="amuebladoTerreno" name="amuebladoTerreno" value="yes" />
                        <label htmlFor="amuebladoTerreno">Posee electricidad</label>
                    </div>
                    <div>
                        <input type="checkbox" id="cocinaTerreno" name="cocinaTerreno" value="yes" />
                        <label htmlFor="cocinaTerreno">Posee arbolado</label>
                    </div>
                </div>
                <div className='grupoImg2'>
                    <div>
                        <label htmlFor="imgTerreno1">Imagen 1:</label>
                        <input type="file" id="imgTerreno1" name="imgTerreno1" accept="image/*"></input>
                    </div>
                    <div>
                        <label htmlFor="imgTerreno2">Imagen 2:</label>
                        <input type="file" id="imgTerreno2" name="imgTerreno2" accept="image/*"></input>
                    </div>
                    <div>
                        <label htmlFor="imgTerreno3">Imagen 3:</label>
                        <input type="file" id="imgTerreno3" name="imgTerreno3" accept="image/*"></input>
                    </div>
                    <div>
                        <label htmlFor="imgTerreno4">Imagen 4:</label>
                        <input type="file" id="imgTerreno4" name="imgTerreno4" accept="image/*"></input>
                    </div>
                </div>
                <button className='miBotonTerreno' type="submit" onClick={handleSubmit}>Agregar</button>
            </form>
        </div>
    );
}

export default FormTerreno;
