const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');


	exports.signup = async (req, res) => {
        try {
          const { email, password, username, role } = req.body;
      
          const user = await User.findOne({ email });
      
          if (user) {
            throw new Error("User already exits.");
          }
      
          if (!email) {
            throw new Error("Please provide email");
          }
          if (!password) {
            throw new Error("Please provide password");
          }
          if (!username) {
            throw new Error("Please provide name");
          }
          
          const salt = bcryptjs.genSaltSync(10);
          const hashPassword = await bcryptjs.hashSync(password, salt);
      
          if (!hashPassword) {
            throw new Error("Something went wrong");
          }
      
          const payload = {
            ...req.body,
            password: hashPassword,
          };
      
          const userData = new User(payload);
          const saveUser = await userData.save();
      
          res.status(201).json({
            status: 'success',
            data: saveUser,
            message: "User Signed Up Successfully!",
          });
        } catch (err) {
          res.status(400).json({
            status: 'failed',
			message: err.message
            
          });
        }
      };

      exports.login = async (req, res) => {
        try {
          const { email, password } = req.body;
    
      
          if (!email) {
            throw new Error("Please provide email");
          }
          if (!password) {
            throw new Error("Please provide password");
          }
         
          const user = await User.findOne({ email });

          if(!user){
            throw new Error("User not found");

          }
      const checkPassword = await bcryptjs.compare(password, user.password)
      
        if (checkPassword) {
          const tokenData = {
            _id: user._id,
            email: user.email,
          };
          const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          res.status(201).json({
            status: 'success',
            data: user,
            message: "User Signed Up Successfully!",
            token: token
          });
        }
      
         
        } catch (err) {
          res.status(400).json({
            status: 'failed',
			      message: err.message
            
          });
        }
      };

