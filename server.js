const express = require("express");
const path = require("path");
const fs = require("fs");

/* Setting express port */
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* GET: for retrieving the notes */
app.get("/api/notes",
    (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (!err) {
                let notes = JSON.parse(data);
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

/* POST: Sending the data */
/* post data got stored in db.json */
app.post("/api/notes",
    (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (!err) {
                let notes = JSON.parse(data), noteContent = req.body;
                noteContent.id = Math.floor(Math.random() * 5000); //max
                notes.push(noteContent);
                fs.writeFile("./db/db.json", JSON.stringify(notes), () => res.json(noteContent));
            } else {
                throw err;
            }
        });
    });

/* DELETE: Delete the data based on id thats get generated in post*/
app.delete("/api/notes/:id",
    (req, res) => {
        fs.readFile("./db/db.json",
            (err, data) => {
                if (!err) {
                    let notes = JSON.parse(data), newNotes = notes.filter(
                        (note) => note.id !== parseInt(req.params.id)
                    );
                    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err, data) => {
                        res.json({msg: "successfully"});
                    });
                } else {
                    throw err;
                }
            });
    });

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
