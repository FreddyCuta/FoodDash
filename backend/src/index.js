const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const tasksRoutes = require('./routes/tasks.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(tasksRoutes);


app.listen(3000)
console.log('Server is running on port 3000');