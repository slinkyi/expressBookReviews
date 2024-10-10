const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
let userCheck = users.filter((user)=>user.username ===username)
if(userCheck.length>0){
  return false;
}
else{
  return true
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
let user = username;
let userCheck = users.filter((i)=>i.username === user)
if(userCheck.length>0 && userCheck[0].password === password ){
  return true
}
else
{
  return false
}}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
  let user = req.body.username
  if(authenticatedUser(user, req.body.password)){
  
      let token = jwt.sign({data: req.body.password},'secret_key',{expiresIn: 60*10})
      req.session.authorization = {token,user}
      res.status(200).json({message: "You are logged in succcessfully"})
   
  }
  else{
    return res.status(404).json({message: `${user} not found or something went wrong`});
  }
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
