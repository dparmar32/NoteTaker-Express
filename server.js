const express = require('express')
const path = require('path');
const database = require('./db/db.json')

/* Setting express port */
const PORT = process.env.PORT || 3001;

const app = express();
/* Enabling link to given folder for accessing info */
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'/public/notes.html'))
)
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));