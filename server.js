const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jadcherla.1',
  database: 'moviePlannerDB',
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// GET
app.get('/', (req, res) => {
  connection.query('select * from movies', (err, data) => {
    if (err) throw err;
    console.log(data);
    res.render('index', { movies: data });
  });
});

// create new movie
app.post('/api/movies', (req, res) => {
  connection.query('INSERT INTO movies (movie) VALUES (?)', [req.body.movie], (err, result) => {
    if (err) {
      return res.status(500).end();
    }
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});
// retrieve all movies
app.get('/api/movies', (req, res) => {
  connection.query('SELECT * FROM movies;', (err, data) => {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update a movie
app.put('/api/movies/:id', (req, res) => {
  connection.query('UPDATE movies SET movie= ? WHERE id = ?', [req.body.movie, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).end();
    }
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    return res.status(200).end();
  });
});

// delete a movie
app.delete('/api/movies/:id', (req, res) => {
  connection.query('DELETE from movies WHERE id = ?', [req.params.id], (err, result) => {
    console.log(result);
    if (err) {
      return res.status(500).end();
    }
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    return res.status(200).end();
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
