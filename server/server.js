const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [
  {
    id: "1",
    username: "maman",
    password: "maman123",
    isAdmin: true,
  },
  {
    id: "2",
    username: "kolan",
    password: "kolan123",
    isAdmin: false,
  },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  const accessToken = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    "mySecretKey"
  );

  user
    ? res.json({ username: user.username, isAdmin: user.isAdmin, accessToken })
    : res.status(400).json("Incorrect username or password");
});

app.listen(5000, () => console.log("Server Run on Port : 5000"));
