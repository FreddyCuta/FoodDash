const express = require('express');
const app = express();
const morgan = require('morgan');

const tasksRoutes = require('./routes/tasks.routes');

app.use(morgan('dev'));

app.use(tasksRoutes);

app.listen(3000)
console.log('Server is running on port 3000');