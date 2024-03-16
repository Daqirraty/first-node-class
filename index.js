require("dotenv").config();
// Install and requires an express package
const express = require("express");
// Create an instance of express
const app = express();
// create a port to spin server on
const PORT = process.env.PORT || 3000;

// Use the express middleware "use"
app.use(express.json());

//Use an event listener to listen
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

let datas = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Alice" },
  { id: 4, name: "Bob" },
];

// This is the base endpoint for our API
// app.get(path, callback_function)
app.get("/", function (req, res) {
  res.status(200).json({
    status: "success",
    message: "Welcome to the landing page.",
  });
});

app.get("/users", function (req, res) {
  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: datas,
  });
});

app.post("/users/create", function (req, res) {
  const firstname = req.body.firstname;
  const othername = req.body.othername;
  const email = req.body.email;

//   const {firstname ,othername, email} = req.body;

//   const {body} = req;



  datas.push({
    id: datas.length+1,
    firstname: firstname,
    othername: othername,
    email: email,
  });
  res.status(200).json({
    status: "success",
    message: "User account created successfully",
    data: datas,
  });
});

app.get("/user/:id", function (req, res) {
  const userId = parseInt(req.params.id); // Extract user ID from request params
  const data = datas.find((data) => data.id === userId); // Find user by ID
  if (!data) {
    res.status(404).send("User not found");
  } else {
    res.json(data); // Send user data as JSON response
  }
  res.status(200).json({
    status: "success",
    message: "Single user gotten successfully",
    data: data,
  });
});
