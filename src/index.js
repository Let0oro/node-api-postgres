const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(port, function isListenedMessage () {
    console.log(`App running on port: ${port}.`)
});

