const express = require('express');
const cors = require('cors');
const executeRoute = require('./routes/executeRoute');
const reviewRoute = require('./routes/reviewRoute');
const chatRoute = require('./routes/chatRoute');

//cors setup
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', executeRoute);
app.use('/api', reviewRoute);
app.use('/api', chatRoute);

module.exports = app;
