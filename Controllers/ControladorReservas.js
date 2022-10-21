import { ServicioHabitacion } from "../services/ServicioHabitacion.js";
import { ServicioReserva } from "../services/ServicioReserva.js";
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
        let habitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion);
        let fechaInicio = new Date(datosReserva.fechaInicio);
        let fechaSalida = new Date(datosReserva.fechaSalida);
        let resultadoFechas = Math.round((fechaSalida.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));

        try {
            if (!isValidObjectId(habitacion)) {
                response.status(400).json({
                    "mensaje": "id de habitación no valido",
                    "datos": null
                });
                return;
            }
            if (datosReserva.fechaInicio >= datosReserva.fechaSalida) {
                response.status(400).json({
                    "mensaje": "La fecha de entrada no puede ser mayor o igual que la fecha de salida",
                    "datos": null
                });
                return;
            }
            if ((datosReserva.numAdultos + datosReserva.numNiños) > habitacion.numMaximoPersonas) {
                response.status(400).json({
                    "mensaje": "El número maximo de personas permitidas es " + habitacion.numMaximoPersonas,
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
            datosReserva.costoReserva = resultadoFechas * habitacion.valorNoche;
            await objetoServicioReservas.agregarReservaEnDB(datosReserva);
            response.status(200).json({
                "mensaje": "El costo de la reserva es: " + datosReserva.costoReserva,
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
        let id = request.params.id;
        let datosReserva = request.body;
        let objetoServicioReservas = new ServicioReserva();
        let objetoServicioHabitacion = new ServicioHabitacion();
        let habitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion);
        let fechaInicio = new Date(datosReserva.fechaInicio);
        let fechaSalida = new Date(datosReserva.fechaSalida);
        let resultadoFechas = Math.round((fechaSalida.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
        console.log(resultadoFechas)
        try {
            if (!isValidObjectId(habitacion)) {
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
            if ((datosReserva.numAdultos + datosReserva.numNiños) > habitacion.numMaximoPersonas) {
                response.status(400).json({
                    "mensaje": "El número maximo de personas permitidas es " + habitacion.numMaximoPersonas,
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
            datosReserva.costoReserva = resultadoFechas * habitacion.valorNoche;
            await objetoServicioReservas.editarReserva(id, datosReserva);
            response.status(200).json({
                "mensaje": "El valor de la reserva es: " + datosReserva.costoReserva,
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