import mongoose from 'mongoose';

//ESQUEMA DE DATOS ES UN ESTANDAR DONDE APARECE SOLO DATOS CON LO QUE EL API VA A TRABAJAR
const Schema = mongoose.Schema;

const EsquemaHabitacion = new Schema({
    nombre: {
        required: true,
        type: String
    },
    valorNoche: {
        required: true,
        type: Number
    },
    descripcion: {
        requierd: true,
        type: String
    },
    fotos: {
        required: true,
        type: [String]        
    },
    numMaximoPersonas: {
        required: true,
        type: Number
    }
});

export const modeloHabitacion = mongoose.model('habitaciones', EsquemaHabitacion);