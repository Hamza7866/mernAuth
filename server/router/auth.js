const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

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
        user = await User.create({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            })
            res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("some error")
    }
  
      
})

module.exports = router