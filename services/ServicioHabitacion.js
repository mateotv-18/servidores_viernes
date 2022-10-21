import { modeloHabitacion } from "../Models/ModeloHabitacion.js";

export class ServicioHabitacion {
    async buscarHabitaciones() {
        let habitaciones = await modeloHabitacion.find();
        return habitaciones;
    }

    async buscarHabitacionPorId(id) {
        let habitacion = await modeloHabitacion.findById(id);
        return habitacion;
    }

    async agregarHabitacionEnDB(habitacion) {
        let datosValues = new modeloHabitacion(habitacion);
        return await datosValues.save();
    }

    async editarHabitacion(id, habitacion) {
        return await modeloHabitacion.findByIdAndUpdate(id, habitacion);
    }

    async costoReserva(id, valorNoche) {
        return await modeloHabitacion.find({
            id: id,
            valorNoche: valorNoche
        });
    }
}

