import mongoose from 'mongoose';

export async function conexionMongo() {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Exito en la conexión con mongo');

    } catch (error) {
        console.log(error);

    }
}