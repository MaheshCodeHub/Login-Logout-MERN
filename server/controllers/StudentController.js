const express = require("express")
const studentModel = require("../models/studentModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");






//add student 
const addStudent = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new studentModel(req.body);
    const student = await newuser.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500);
    // throw new Error(error.message);
  }
};


//get all Student Recoreds
const getAllStudent = async (req, res) => {
  try {
    const students = await studentModel.find();
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: "Unable to get students" });
    // throw new Error(error.message);
  }
}

// get all User
const getAllUser = async (req, res) => {
  try {
    const allUser = await studentModel.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
}


// userData
// const userData = async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     studentModel
//       .findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) { }
// }



module.exports = {
  addStudent,
  getAllStudent,
  getAllUser,
  // userData,

};
