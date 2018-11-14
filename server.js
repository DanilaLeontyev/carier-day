// const express = require('express');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const MONGO_URL =
  'mongodb://admin:ae75912f92@ds219983.mlab.com:19983/carier-day';

const MONGO_DB_NAME = 'carier-day';
const MONGO_COL_NAME = 'people';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/people', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      const data = req.body;
      const people = client.db(MONGO_DB_NAME).collection(MONGO_COL_NAME);
      people.insertOne(data, (err, result) => {
        if (err) {
          res.send(error);
        } else {
          res.send(result);
        }
      });
    }
  );
});

app.get('/file', (req, res) => {
  res.download('./pdf/certificate.pdf');
});

app.get('/api/people', (req, res) => {
  const file = fs.createReadStream('./pdf/certificate.pdf');
  const data = fs.statSync('./pdf/certificate.pdf');
  res.setHeader('Content-Length', data.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
  file.pipe(res);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
