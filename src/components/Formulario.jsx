import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

function Formulario() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        cuantos: '',
        fecha: ''
    });

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

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">
                    Nombre de quien reserva
                </label>
                <input name='nombre' type="text" className="form-control" onChange={handleChange}/>
                <div className="form-text text-danger fw-bold">
                    Esta persona debe presentarse el dia de la cita.
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    ¿Cuantas personas?
                </label>
                <input name='cuantos' type="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Fecha
                </label>
                <input name='fecha' type="date" className="form-control" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}

export default Formulario;