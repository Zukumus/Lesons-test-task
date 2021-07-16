require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const path = require('path');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');


PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

// ERROR HANDLER
// app.use(errorHandler);
app.get('/', (req, res) => res.status(200).json({ message: `Working + ${PORT}` }))

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()