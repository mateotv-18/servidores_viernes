import { ServicioHabitacion } from "../services/ServicioHabitacion.js";
import { ServicioReserva } from "../services/ServicioReserva.js";
import { modeloHabitacion } from "../Models/ModeloHabitacion.js";
import { isValidObjectId, model } from "mongoose";

export class ControladorReserva {
    constructor() { }

    async buscarReservas(request, response) {
        let objetoServicioReservas = new ServicioReserva();
        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta ",
                "datos": await objetoServicioReservas.buscarRerservas()
            });
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }

    async buscarReservaPorId(request, response) {
        let id = request.params.id;
        let objetoServicioReservas = new ServicioReserva();
        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta " + id,
                "datos": await objetoServicioReservas.buscarReservaPorId(id)
            });
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }

    async registrarReserva(request, response) {
        let datosReserva = request.body;
        let objetoServicioReservas = new ServicioReserva();
        let objetoServicioHabitacion = new ServicioHabitacion();
        let fechaInicio = new Date(datosReserva.fechaInicio);
        let fechaSalida = new Date(datosReserva.fechaSalida);
        console.log(fechaInicio);
        console.log(fechaSalida);
        let restaDate = fechaSalida.getTime() - fechaInicio.getTime();
        console.log(Math.round(restaDate / (1000 * 60 * 60 * 24)));  
        console.log(objetoServicioHabitacion.valorNoche);

        // console.log(datosReserva.fechaSalida.getTime())
        // console.log(datosReserva.fechaInicio.getTime())
        // let costoReserva = (datosReserva.fechaSalida.getDay()) - (datosReserva.fechaInicio.getDay());    
        // console.log(costoReserva);
        try {
            if (!isValidObjectId(await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion))) {
                response.status(400).json({
                    "mensaje": "id de habitación no valido",
                    "datos": null
                });
                return;
            }
            if (datosReserva.fechaInicio > datosReserva.fechaSalida) {
                response.status(400).json({
                    "mensaje": "La fecha de entrada no puede ser mayor a la fecha de salida",
                    "datos": null
                });
                return;
            }
            if ((datosReserva.numAdultos + datosReserva.numNiños) > 8) {
                response.status(400).json({
                    "mensaje": "El número maximo de personas permitidas es 8",
                    "datos": null
                });
                return;
            }
            if (datosReserva.numAdultos < 1) {
                response.status(400).json({
                    "mensaje": "Debe haber por lo menos 1 mayor de edad",
                    "datos": null
                });
                return;
            }
            if (datosReserva.numNiños < 0) {
                response.status(400).json({
                    "mensaje": "Número no valido. Si no hay niños poner el número 0 ",
                    "datos": null
                });
                return;
            }

            await objetoServicioReservas.agregarReservaEnDB(datosReserva);
            response.status(200).json({
                "mensaje": "Exito agragando la reserva",
                "datos": null
            });

        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }

    async editarReserva(request, response) {
        let datosReserva = request.body;
        let objetoServicioReservas = new ServicioReserva();
        let objetoServicioHabitaciones = new ServicioHabitacion();
        objetoServicioHabitaciones.buscarIdHabitacion(datosReserva.idHabitacion);
        try {
            await objetoServicioReservas.editarReserva(id, datosReserva);
            response.status(200).json({
                "mensaje": "Exito editando la reserva con el id: " + id,
                "datos": null
            });
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }
}