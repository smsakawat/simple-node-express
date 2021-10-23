const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//So here we are telling the app that open the cors policy..by using this 'cors'..there are many type of middleware and cors is one of them...
app.use(cors());
app.use(express.json());

const players = [
  { id: 0, name: "Sakib", role: "all-rounder", age: "35" },
  { id: 1, name: "Tamim", role: "batting", age: "32" },
  { id: 2, name: "Mustafiz", role: "bowling", age: "25" },
  { id: 3, name: "Mahmudullah", role: "all-rounder", age: "38" },
  { id: 4, name: "Rubel", role: "bowler", age: "28" },
];

// app.METHODS
// to get post request
app.post("/players", (req, res) => {
  // akhane middleware use korar korone 'req.body' direct js format'a ashe jacce tai response send korar somoy abar stringify kore pathete hobe...
  const newPlayer = req.body;
  newPlayer.id = players.length;
  players.push(newPlayer);
  console.log("hitting the post method");
  // res.send(JSON.stringify(newUser));
  // we can also convert in json using another rule below here
  res.json(newPlayer);
});

app.get("/", (req, res) => {
  res.send("home page");
});

// search query
app.get("/players", (req, res) => {
  // using search query
  const search = req.query.name;
  if (search) {
    const result = players.filter((player) =>
      player.name.toLowerCase().includes(search)
    );
    res.send(result);
  } else {
    res.send(players);
  }
});

// so here we have to use the same name in req.param.'...' whatever we gave in our parameter
// setting up dynamic api
app.get("/players/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const data = players[id];
  res.send(data);
});

app.listen(port, () => {
  console.log("listening my first ever node", port);
});
