const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', function responseApi(request, response) {
    response.json({info: 'Node.js, Express, and Postgres API'})
});


// Assing the CRUD functions for each endPoint

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);


app.listen(port, function isListenedMessage () {
    console.log(`App running on port: ${port}.`)
});