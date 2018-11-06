const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL =
  'mongodb://admin:123456don@ds215633.mlab.com:15633/movie-database'; // Строка подключения к базе

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/img', express.static(__dirname + '/data/img/'));

// Запрос на получение всех фильмов из базы
app.get('/api/movies', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let movies = client.db('movie-database').collection('movie-in-theaters');

      movies.find().toArray((err, result) => {
        if (err) console.log(err);
        res.send(result);
      });
    }
  );
});

// Запрос на добавление нового фильма
app.post('/api/movies', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let data = req.body.movie;
      let movies = client.db('movie-database').collection('movie-in-theaters');

      if (Object.keys(data).length) {
        if (data.hasOwnProperty('_id')) {
          delete data._id;
        }
        movies.insertOne(data, (err, result) => {
          res.send(data._id);
        });
      } else res.send({ message: 'object is empty' });
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
