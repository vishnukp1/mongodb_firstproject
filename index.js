const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Hi there! Welcome to the API service",
  });
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "john1f",
    email: "john@h.com",
  };
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
  
});

app.listen(3005, () => {
  console.log("Server running on port 3005");
});