const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        const DB_URI = process.env.DB_URI;
        await mongoose.connect(DB_URI);
        console.log('**** Connected to Database ****');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);  // Salir del proceso si no se puede conectar
    }
}

module.exports = { dbConnect };