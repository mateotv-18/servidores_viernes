import express from 'express'
import { rutasPersonalizadas } from '../Routes/rutas.js'
import { conexionMongo } from '../db/db.js'

export class ServidorAPI {
    constructor() {
        this.app = express();
        this.conectarConBD();
        this.activarBody();
        this.atenderPeticiones();
    }
    //Metodos de la clase ServidorAPI
    despertarServidor() {
        this.app.listen(process.env.PORT, function () {
            console.log(`Exito encendiendo el servidor: ${process.env.PORT}`)
        })
    }

    atenderPeticiones() {
        this.app.use('/', rutasPersonalizadas);
    }

    conectarConBD() {
        conexionMongo();
    }

    activarBody() {
        this.app.use(express.json());
    }

}