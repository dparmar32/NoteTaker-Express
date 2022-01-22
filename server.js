const express = require("express");
const path = require("path");
const fs = require("fs");

/* Setting express port */
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* GET: for retrieving the notes */
app.get("/api/notes",
    (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (!err) {
                var notes = JSON.parse(data);
                res.json(notes);
            } else {
                throw err;
            }
        });
    });

app.get("/notes",
    (req, res) => {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

app.get("*",
    (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
