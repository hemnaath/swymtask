require('./config/db');
const express = require('express');
const userRoute = require('./route/userRoute');
const taskRoute = require('./route/taskRoute');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express ();

app.use(express.json());


app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(1731, ()=> {
    console.log("server connected");

});