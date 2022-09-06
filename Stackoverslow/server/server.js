const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const path = require('path');
const req = require('express/lib/request');
const db = require('./db');
const router = require('./routers');

//db connections
db.connect();

//middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// cors header methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

//api

app.use('/api', router);

//Static resources
//app.use('/upload', express.static(path.join(__dirname, '/../uploads')));

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  } catch (e) {
    res.send('Error occured');
  }
});

app.get('/', (req, res) => {
  res.send('Hello');
});

// Using cors

app.use(cors());

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
