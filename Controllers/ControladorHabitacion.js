import { ServicioHabitacion } from "../services/ServicioHabitacion.js";

export class ControladorHabitacion {

    constructor() { }

    async buscarHabitaciones(request, response) {
        let objetoServicioHabitaciones = new ServicioHabitacion();
        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta ",
                "datos": await objetoServicioHabitaciones.buscarHabitaciones(),
            });
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }

    async buscarHabitacionPorId(request, response) {
        let id = request.params.id;
        let objetoServicioHabitaciones = new ServicioHabitacion();
        try {
            response.status(200).json({
                "mensaje": "Exito en la consulta " + id,
                "datos": await objetoServicioHabitaciones.buscarHabitacionPorId(id)
            });
        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }

    async registrarHabitacion(request, response) {
        let datosHabitacion = request.body; //Obtengo datos del body
        let objetoServicioHabitaciones = new ServicioHabitacion();
        try {
            if (datosHabitacion.numMaximoPersonas > 8) {
                response.status(400).json({
                    "mensaje": "No hay capacidad para tantas personas",
                    "datos": null
                });
                return;
            }
            await objetoServicioHabitaciones.agregarHabitacionEnDB(datosHabitacion);
            response.status(200).json({
                "mensaje": "Exito agragando habitación",
                "datos": null
            });

        } catch (error) {
            response.status(400).json({
                "mensaje": "Error en la consulta " + error,
                "datos": null
            });
        }
    }

    async editarHabitacion(request, response) {
        let id = request.params.id;
        let datosHabitacion = request.body;
        let objetoServicioHabitaciones = new ServicioHabitacion();
        try {
            await objetoServicioHabitaciones.editarHabitacion(id, datosHabitacion);
            response.status(200).json({
                "mensaje": "Exito editando la habitación con el id:" + id,
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