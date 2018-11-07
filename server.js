const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL =
  'mongodb://admin:ae75912f92@ds219983.mlab.com:19983/carier-day'; // Строка подключения к базе

const MONGO_DB_NAME = 'carier-day';
const MONGO_COL_NAME = 'people';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
// Запрос на получение всех фильмов из базы
app.get('/api/data', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let movies = client.db(MONGO_DB_NAME).collection(MONGO_COL_NAME);

      movies.find().toArray((err, result) => {
        if (err) console.log(err);
        res.send(result);
      });
    }
  );
});

// Запрос на добавление нового фильма
// app.post('/api/movies', (req, res) => {
//   MongoClient.connect(
//     MONGO_URL,
//     { useNewUrlParser: true },
//     (err, client) => {
//       if (err) console.log(err);
//       let data = req.body.movie;
//       let movies = client.db('movie-database').collection('movie-in-theaters');

//       if (Object.keys(data).length) {
//         if (data.hasOwnProperty('_id')) {
//           delete data._id;
//         }
//         movies.insertOne(data, (err, result) => {
//           res.send(data._id);
//         });
//       } else res.send({ message: 'object is empty' });
//     }
//   );
// });

//production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
