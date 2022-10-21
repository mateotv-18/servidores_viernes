import { modeloReserva } from "../Models/ModeloReserva.js";

export class ServicioReserva {
    async buscarRerservas() {
        let reservas = await modeloReserva.find();
        return reservas;
    }
    async buscarReservaPorId(id) {
        let reserva = await modeloReserva.findById(id);        
        return reserva;
    } 
    async agregarReservaEnDB(reserva) {
        let datosValues = new modeloReserva(reserva);
        return await datosValues.save();
    }
    async editarReserva(id, reserva) {
        return await modeloReserva.findByIdAndUpdate(id, reserva);
    }    
}