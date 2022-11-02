const fse = require("fs-extra");
const path = require("path");
import { v4 as uuidv4 } from 'uuid';

module.exports = function (app) {
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    })

    app.get("*", function (req, res) {
        res.sendFile(__dirname, "../public/index.html");
    })
    
    app.get("/api/notes", function(req, res) {

        // Return saved notes from db.json file
        fse.readFile("db/db.json", "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            let notes = JSON.parse(data);
            res.json(notes);
        })
    })

    app.post("/api/notes", function(req, res) {
        fse.readFile("db/db.json", "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            let notes = JSON.parse(data);
            let newNote = req.body;
            let uniqueID = uuidv4();

            newNote.id = uniqueID;
            notes.push(newNote);

            fse.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) {
                    throw err;
                }
                console.log("Succesfully added note!");
            })
            res.json(notes);
        })
    })
}