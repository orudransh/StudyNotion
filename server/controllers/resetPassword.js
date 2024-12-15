const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

//reset Password token
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }

    //Generate Token 
    const token = crypto.randomBytes(20).toString("hex")

    //update user by adding token and expiration time 
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    // const url = `http://localhost:3000/update-password/${token}`
    const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`


    //Send mail containing the url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    //Return Response
      return res.json({ 
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

//Reset password  
exports.resetPassword = async (req, res) => {
  try {

    //Data fetch 
    const { password, confirmPassword, token } = req.body
    //Validation 
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    //get userDetails from db using Token 
    const userDetails = await User.findOne({ token: token })
    //if no entry - invalid Token 
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }
    // Token time Check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    } 
    //Hashed Password
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    //Return Response
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
}
