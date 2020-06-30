const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
let bodyParser = require("body-parser");
const { query } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(200);
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "checkpoint",
});

app.get("/query", (req, res) => {
  let title = req.query.title;
  let genre = req.query.genre;
  let artist = req.query.artist;
  let conditions = [title, genre, artist];
  let wheres = [];

  let count = 0;
  for (let i = 0; i < 3; i++) {
    if (conditions[i] !== undefined) {
      count++;
    }
  }

  if (count === 0) {
    return res.sendStatus(400);
  }else if (count === 1) {
    connection.query(
      `SELECT * FROM checkpoint.playlist
         inner join checkpoint.track on playlist.id = track.playlist_id
         where ${
           title !== undefined
             ? `playlist.title = "${title}"`
             : genre !== undefined
             ? `genre = "${genre}"`
             : `artist = "${artist}"`
         } `,
      function (error, results, fields) {
        if (error) {
          res.send(error);
        } else {
          console.log(results);
          res.send(results);
        }
      }
    );
  }else if( count === 2){
    connection.query(
        `SELECT * FROM checkpoint.playlist
           inner join checkpoint.track on playlist.id = track.playlist_id
           where ${
             title !== undefined
               ? `playlist.title = "${title}"`
               : genre !== undefined
               ? `genre = "${genre}"`
               : `artist = "${artist}"`
           } and ${
            title !== undefined
              ? `playlist.title = "${title}"`
              : genre !== undefined
              ? `genre = "${genre}"`
              : `artist = "${artist}"`
          }`,
        function (error, results, fields) {
          if (error) {
            res.send(error);
          } else {
            console.log(results);
            res.send(results);
          }
        }
      );
  }else if (count === 3){
    connection.query(
        `SELECT * FROM checkpoint.playlist
           inner join checkpoint.track on playlist.id = track.playlist_id
           where ${
             title !== undefined
               ? `playlist.title = "${title}"`
               : genre !== undefined
               ? `genre = "${genre}"`
               : `artist = "${artist}"`
           } and ${
            title !== undefined
              ? `playlist.title = "${title}"`
              : genre !== undefined
              ? `genre = "${genre}"`
              : `artist = "${artist}"`
          }and ${
            title !== undefined
              ? `playlist.title = "${title}"`
              : genre !== undefined
              ? `genre = "${genre}"`
              : `artist = "${artist}"`
          } `,
        function (error, results, fields) {
          if (error) {
            res.send(error);
          } else {
            console.log(results);
            res.send(results);
          }
        }
      );
  }

  
});

app.post("/playlist/add", (req, res) => {
  let query = {};
  query = req.body;
  console.log(query);

  if (query.title === undefined || query.genre === undefined) {
    return res.sendStatus(400);
  }

  connection.query(
    `INSERT INTO playlist (title, genre) VALUES ("${query.title}", "${query.genre}")`,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.sendStatus(200);
      }
    }
  );

  //insert playlist into database
});

app.get("/playlist/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (typeof id !== "number") {
    return res.sendStatus(400);
  }
  connection.query(
    `SELECT * FROM checkpoint.playlist where id = ${id} `,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.post("/playlist/:id", (req, res) => {
  let query = {};
  let id = req.params.id;
  query = req.body;

  if (query === undefined) {
    return res.sendStatus(400);
  }
  connection.query(
    `INSERT INTO track (playlist_id, title, artist, album_picture, youtube_url)
     VALUES ("${id}", "${query.title}", "${query.artist}", "${query.album_picture}", "${query.youtube_url}")`,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );

  //insert into playlist
});

app.get("/playlist/:id/songs", (req, res) => {
  let id = parseInt(req.params.id);

  if (typeof id !== "number") {
    return res.send(400);
  }
  connection.query(
    `SELECT * FROM checkpoint.track where playlist_id = ${id} `,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.delete("/playlist/:id/", (req, res) => {
  let id = parseInt(req.params.id);
  if (typeof id !== "number") {
    return res.sendStatus(400);
  }
  connection.query(
    `DELETE from checkpoint.playlist where id = ${id}`,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.put("/playlist/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let query = req.body;

  if (typeof id !== "number") {
    return res.send(400);
  }
  if (query === undefined) {
    return res.send(400);
  }
  connection.query(
    `UPDATE checkpoint.playlist set title = "${query.title}", genre = "${query.genre}" where id = ${id}`,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.delete("/playlist/:id/:songid", (req, res) => {
  let id = parseInt(req.params.id);
  let songId = parseInt(req.params.songid);

  let query = req.body;

  if (typeof id !== "number") {
    return res.send(400);
  }
  if (typeof songId !== "number") {
    return res.send(400);
  }

  if (query === undefined) {
    return res.send(400);
  }
  connection.query(
    `DELETE FROM checkpoint.track where playlist_id = ${id} and id = ${songId}`,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.put("/playlist/:id/:songid", (req, res) => {
  let id = parseInt(req.params.id);
  let songId = parseInt(req.params.songid);

  let query = req.body;

  if (typeof id !== "number") {
    return res.send(400);
  }
  if (typeof songId !== "number") {
    return res.send(400);
  }

  if (query === undefined) {
    return res.send(400);
  }
  connection.query(
    `UPDATE checkpoint.track 
    set title = "${query.title}",
     artist = "${query.genre}",
      album_picture = "${query.album_picture}",
      youtube_url= "${query.youtube_url}" 
       where id = ${songId} and playlist_id=${id} `,
    function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.use(cors());

app.listen(3000, () => console.log(3000));
