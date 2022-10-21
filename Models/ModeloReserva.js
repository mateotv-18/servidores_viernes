import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EsquemaReserva = new Schema({
    idHabitacion: {
        required: true,
        type: String
    },
    fechaInicio: {
        required: true,
        type: Date
    },
    fechaSalida: {
        required: true,
        type: Date
    },
    numAdultos: {
        required: true,
        type: Number
    },
    numNiños: {
        required: true,
        type: Number
    },
    costoReserva: {
        required: false,
        type: Number
    }
});

export const modeloReserva = mongoose.model('reservas', EsquemaReserva);
