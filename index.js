const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { nanoid } = require('nanoid');

const app = express();
const port = process.env.PORT || 3000;
const urlBase = process.env.BASE_URL || `http://localhost:${port}`;

const db = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Wellcome to e-quilibrium API');
});

app.get('/:id', (req, res) => {
  const element = db[req.params.id];
  console.log(element);
  res.send(element);
});

app.post('/', (req, res) => {
  console.log(req.body);
  const id = nanoid()
  db[id] = { offer: req.body }; 
  res.send(new URL(id, urlBase));
});

app.post('/:id', (req, res) => {
  db[req.params.id].answer = req.body;
  res.send('Sent, wait for connection');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});