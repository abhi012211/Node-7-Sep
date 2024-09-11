const express = require("express");
const app = express();

const fs = require("fs");
const users = require("./users.json");

app.use(express.json());

//http://localhost:3000/users
app.get("/users", (req, res) => {
  res.json(users);
});

//http://localhost:3000/user/10
app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((user) => user.id === parseInt(id));
  console.log(user);
  res.json(user);
});

//http://localhost:3000/add/user
app.post("/add/user", (req, res) => {
  console.log(req.body);
  req.body.id = 32;
  users.push(req.body);
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data added successfully");
      res.end("data added successfully....");
    }
  });
  res.end("data added successfully");
});

app.put("/edit/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let index = users.findIndex((user) => user.id === parseInt(id));
  users[index].first_name = "kotlin";
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data added successfully");
      res.end("data added successfully....");
    }
  });
  res.end("updation in progress..");
});

app.delete("/delete/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let index = users.findIndex((user) => user.id === parseInt(id));
  users.splice(index, 1);
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data added successfully");
      res.end("data added successfully....");
    }
  });
  res.end("delete in progress..");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is started");
  }
});
