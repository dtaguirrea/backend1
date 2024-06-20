import mongoose from 'mongoose';

const connectionString = "mongodb+srv://admin:admin@clusterpk.hkdtxy4.mongodb.net/"
;

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}