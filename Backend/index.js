const http = require('http');
const requests = require('requests');
const express = require('express');
const app = express();
//CORS(CORS ORIGIN RESOURCE SHARING) handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //instead of * you can give specific url also
  res.header('Access-Control-Allow-Headers', '*'); //you can also mention (Origin,X-Requested-With,Content-Type,Accept,Authorization)
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,PATCH,DELETE,POST,GET');
    return res.status(200).json({});
  }
  //here we are blocking after this middleware,so options is not occured,then our routes should take care
  //so excecution should move to below routes
  next();
});

// if express 4.16+ we can replace these instead of body parser
//parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//root
app.get('/', (req, res) => {
  res.send('Welcome to node js learning');
});

//users service
app.get('/users', (req, res) => {
  requests('https://jsonplaceholder.typicode.com/users')
    .on('data', function (data) {
      res.send(data);
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
    });
});

const port = process.env.PORT || 8888;

http.createServer(app).listen(port, () => {
  console.log('Running succesfully port no :' + port);
});
