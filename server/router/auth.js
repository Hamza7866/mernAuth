const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Harry"



 // Creating a user api /api/auth/createuser
router.post("/createuser",[
    body('name',"Enter a Vailder Name").isLength({min:3}),
    body("email" ,"Please Enter a vaild Email ").isEmail(),
    body("password","password length should be 5").isLength({min:5})

],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    try {
        
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({errors :"Sorry a user is already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password,salt)

        user = await User.create({
              name: req.body.name,
              email: req.body.email,
              password: secPass
            })
            const data = {
                user:{
                    id: user.id
                }
            }
           const authToken =  jwt.sign(data,JWT_SECRET);
            res.json({authToken})

    } catch (error) {
        console.log(error)
        res.status(500).send("some error")
    }
  
      
})

//  auth a user Login route
router.post("/login",[
    body('name',"Enter a Vailder Name").isLength({min:3}),
    body("email" ,"Please Enter a vaild Email ").isEmail(),
    body("password","password can't be blank").exists()

],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {email,password} = req.body;
  try {
      let user = await User.findOne({email})
      if(!user){
          return res.status(400).json({errors:"Please try to login with correct credentials" })
      }
      const passwordCompare = await bcrypt.compare(password,user.password)

      if(!passwordCompare){
          return res.status(400).json({errors:"Please try to login with correct credentials"})
      }
      const data  = {
          user:{
              id: user.id
          }
      }
      const authToken = jwt.sign(data,JWT_SECRET)
      res.json({authToken})
  } catch (error) {
    console.log(error)
    res.status(500).send("some error server error")
}
// get user details login required 
})
router.post("/login",[
    body('name',"Enter a Vailder Name").isLength({min:3}),
    body("email" ,"Please Enter a vaild Email ").isEmail(),
    body("password","password length should be 5").isLength({min:5})

],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        userId =  "todo";
        const user = await User.findById(userId).select("-password")
    } catch (error) {
        console.log(error)
        res.status(500).send("some error server error")
    }
})


module.exports = router