const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
let colors = require('./colors.js');

const app = express();
const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(CORS());

let nextId = 12;

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Lambda School" && password === "i<3Lambd4") {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/colors", authenticator, (req, res) => {
  res.send(colors);
});

app.post("/api/colors", authenticator, (req, res) => {
  if (req.body.color !== undefined && req.body.code !== undefined) {
    const newcolor = req.body;
    newcolor.id = nextId;
    colors.push(newcolor);
  }
  nextId = nextId + 1;
  res.status(201).json(colors);
});

app.put("/api/colors/:id", authenticator, (req, res) => {

  console.log('req.params.id', req.params.id, 'req.body', req.body);

  if (!req.params.id)
    res.status(400).send("Your request is missing the color id");
  if (req.body.id === undefined || !req.body.color || !req.body.code) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  colors = colors.map(color => {
    if (`${color.id}` === req.params.id) {
      return req.body;
    }
    return color;
  });
  res.status(200).send(req.body);
});

app.delete("/api/colors/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the color id");
  colors = colors.filter(color => `${color.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
