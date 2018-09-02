const express = require("express"); // express framework
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
//cross-origin-resource
app.use(cors())
//compresion
app.use(compression());
// handle incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// respond with "angular index.html" when a GET request is made to the homepage
app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname + "/dist/" } );
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// register our routes
let routes = require("./api/routes/hotelRoute");
routes(app);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// middleware to handle wrong routes 
app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + 'not found' });
});


app.listen(port);
console.log('App running on ' + port);