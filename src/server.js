require('dotenv').config();
const mongoose = require('mongoose');
const connectDB =  require('./config/dbConn');

const { PORT = 8000 } = process.env;

connectDB();
const app = require("./app");

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});