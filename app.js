require("dotenv").config();
// Install and requires an express package
const express = require("express");
// Create an instance of express
const app = express();
// call up the router middleware from express
const router = express.Router();
// create a port to spin server on
const PORT = process.env.PORT || 3000;

// Use the express middleware "use"
app.use(express.json());
//Built-in middleware
app.use(express.urlencoded({ extended: true }));

let datas = [
    { id: 1, surname: "John", othername: "John", email: "John@gmail.com" },
    { id: 2, surname: "Jane", othername: "Josfvhn", email: "Johnfvf@gmail.com" },
    { id: 3, surname: "Alice", othername: "Jofvfhn", email: "Johnfv@gmail.com" },
    { id: 4, surname: "Bob", othername: "Johvfn", email: "Johnfvf@gmail.com" },
  ];
  
  // This is the base endpoint for our API
  // app.get(path, callback_function)
  app.get("/", function (req, res) {
    res.status(200).json({
      status: "success",
      message: "Welcome to the landing page.",
    });
  });
  
  // FETCH ALL USERS
  app.get("/users", function (req, res) {
    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: datas,
    });
  });
  
  // Create New User
  app.post("/users/create", function (req, res) {
    const surname = req.body.surname;
    const othername = req.body.othername;
    const email = req.body.email;
  
    //   const {firstname ,othername, email} = req.body;
    //   const {body} = req;
  
    datas.push({
      id: datas.length + 1,
      surname: surname,
      othername: othername,
      email: email,
    });
  
    const displayNewUser = datas.length - 1;
  
    res.status(200).json({
      status: "success",
      message: "User account created successfully",
      data: datas[displayNewUser],
    });
  });
  
  // Get Single Users
  app.get("/user/:id", function (req, res) {
    const userId = parseInt(req.params.id); // Extract user ID from request params
    const data = datas.find((data) => data.id === userId); // Find user by ID
  
    console.log("rrrrrr: ", data);
  
    if (!data) {
      res.status(404).send("User not found");
    }
    //else {
    //   res.json(data); // Send user data as JSON response
    // }
    // Either of the response
    res.status(200).json({
      status: "success",
      message: "Single user gotten successfully",
      data: data,
    });
  });
  
  // PATCH UPDATE SPECIFIC USER DETAIL FIELD
  app.patch("/user/update/:id", (req, res) => {
    const { id } = req.params;
    console.log("update user", id);
    const userId = parseInt(id);
  
    const { surname, othername, email } = req.body;
  
    if (!surname || !othername || !email) {
      res.json({
        status: "error",
        message: "All fields are required",
      });
    }
    const filteredData = datas.filter((data) => data.id === userId);
    console.log("filteredData", filteredData);
  
    // USING FIND return an object {}
    // filteredData.surname = surname
    // filteredData.othername = othername
    // filteredData.email = email
  
    // USINF FILTER RETURNS AN ARRAY []
    filteredData[0].surname = surname;
    filteredData[0].othername = othername;
    filteredData[0].email = email;
  
    res.json({
      status: "success",
      message: "User Updated ",
      data: datas,
    });
  });
  
  // PUT UPDATE ALL USER DETAILS FIELD
  app.put("/user/update-all/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { surname, othername, email } = req.body;
  
    // Find the user by ID
    const userInfo = datas.filter((data) => data.id === userId);
    console.log("userInfo", userInfo);
  
    // If user not found, send 404 Not Found response
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }
  
    // Update user details
    userInfo[0].surname = surname;
    userInfo[0].othername = othername;
    userInfo[0].email = email;
  
    // Send success response
    res.json({ message: "User details updated successfully", user: datas });
  });
  
  
  // DELETE SINGLE USER DETAILS
  app.delete('/users/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Find the index of the user by ID
    const userIndex = datas.findIndex(user => user.id === userId);
    console.log("objectrrr: ", userIndex)
  
    // If user not found, send 404 Not Found response
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
  
    // Remove the user from the array
    datas.splice(userIndex, 1);
  
    // Send success response
    res.json({ message: 'User deleted successfully' });
  });
  
  
  // DELETE ALL USER 
  app.delete('/users/delete/:id', (req, res) => {
  
    users = [];
  
    // Send success response
    res.json({ message: 'All user details deleted successfully' });
  });
  