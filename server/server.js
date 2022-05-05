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

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Invalid Token");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not Authenticated");
  }
};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(401).json("Not Allowed");
  }
});

app.listen(5000, () => console.log("Server Run on Port : 5000"));
