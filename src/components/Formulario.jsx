import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';

function Formulario() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        cuantos: '',
        fecha: ''
    });

    const [datosTabla, setDatosTabla] = useState([]);

    useEffect(()=>{cargarDatos()}, []);

    const handleChange = (event) => {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formulario);
        const docRef = await addDoc(collection(db, "reservaciones"), formulario);
        console.log("Documento agregado con el ID", docRef);
    }

    /*
    const cargarDatos = async () => {
        console.log("Entró a cargar datos");
        const datos = await getDocs(collection(db, "reservaciones"));
        datos.forEach((doc) => {
            const id = doc.id;
            console.log({id, ...doc.data()});
        });
        console.log(datos)
    }
    */

    // Requiere recargar manualmente
    // await getDocs() para cargar solo una vez
    /*
    const cargarDatos = async () => {
        console.log("Entro a cargar datos...");
        
        
        const querySnapshot = querySnapshot(collection(db, "reservaciones"));
        let datosFormateados = querySnapshot.docs.map((doc) => {
            // console.log(doc.id, " => ", doc.data());
            return doc.data();
        });
        console.log(datosFormateados);
        setDatosTabla(datosFormateados);
    }
    */
   // await querySnapshot() para cargar en tiempo real
   const cargarDatos = async () => {
    console.log("Entro a cargar datos...");
    onSnapshot(collection(db, "reservaciones"), (querySnapshot) => {
        // order by date
        console.log("detected changes");
        let rawReservaciones = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        console.log(rawReservaciones);
        setDatosTabla(rawReservaciones);
    });
}

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Nombre de quien reserva
                    </label>
                    <input name='nombre' type="text" className="form-control" onChange={handleChange} />
                    <div className="form-text text-danger fw-bold">
                        Esta persona debe presentarse el dia de la cita.
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        ¿Cuantas personas?
                    </label>
                    <input name='cuantos' type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Fecha
                    </label>
                    <input name='fecha' type="date" className="form-control" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

            <h1>Lista de reservaciones</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Personas</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosTabla.map((renglon, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{renglon.nombre}</td>
                                    <td>{renglon.cuantos}</td>
                                    <td>{renglon.fecha}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>

    );
}

export default Formulario;