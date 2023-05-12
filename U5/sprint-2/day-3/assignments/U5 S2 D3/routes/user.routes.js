const Router = require("express");

const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
const { BlackListModel } = require("../models/blacklist.model");
//sign up route
userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const isUserPresent = await userModel.findOne({ email });
    if (isUserPresent) {
      return res.status(400).send({ msg: "already a user, please login" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(200).send({ msg: "signup sucessful" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserPresent = await userModel.findOne({ email });
    //if user is not present
    if (!isUserPresent) {
      return res.status(400).send({ msg: "not a user, please signup" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      isUserPresent.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send({ msg: "Wrong Credentials" });
    }

    //generate tokens: accesstoken and refreshToken

    const accesstoken = jwt.sign(
      { email: isUserPresent.email, role: isUserPresent.role },
      process.env.JWT_SECRET,
      { expiresIn: "10s" }
    );
    // console.log(accesstoken);

    const refreshtoken = jwt.sign(
      { email: isUserPresent.email, role: isUserPresent.role },
      process.env.REFRESH_SECRET,
      { expiresIn: "2m" }
    );

    //storing these tokens in
    //in teh cookie

    res.cookie("pscAccessToken", accesstoken, { maxAge: 1000 * 60 });
    res.cookie("pscRefreshToken", refreshtoken, { maxAge: 1000 * 60 * 10 });
    // console.log(res.cookie());
    res.status(200).send({ msg: "Login Successfull" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//logout route
userRouter.get("/logout", async (req, res) => {
  try {
    //store that users tokens in the blacklisted database
    //tokens cookie

    const { pscAccessToken, pscRefreshToken } = req.cookies;
    // console.log(req.cookies);
    console.log("pscAccessToken  ", pscAccessToken);
    console.log("pscRefreshToken ", pscRefreshToken);
    const blacklistAccessToken = new BlackListModel({ token: pscAccessToken });
    const blacklistRefreshToken = new BlackListModel({
      token: pscRefreshToken,
    });

    await blacklistAccessToken.save();
    await blacklistRefreshToken.save();
    res.status(200).send({ msg: "Logout successfull" });
  } catch (error) {
    // console.log(error);
    res.status(400).send({ msg: error.message });
  }
});

//get new token
userRouter.get("/refreshToken", async (req, res) => {
  //getting the refresh token from cookie
  //check if it is valid or not
  //generate a new access token

  try {
    const pscRefreshToken =
      req.cookies.pscRefreshToken || req?.headers?.authorization;
    const isTokenBlacklisted = await BlackListModel.find({
      token: pscRefreshToken,
    });
    console.log(pscRefreshToken);
    console.log(isTokenBlacklisted);
    if (isTokenBlacklisted.length > 0) {
      return res
        .status(400)
        .send({ msg: "Refresh token expired, Please login again" });
    }
    const isTokenValid = jwt.verify(
      pscRefreshToken,
      process.env.REFRESH_SECRET
    );

    if (!isTokenValid) {
      return res.status(400).send({ msg: "Token Expired, Login again " });
    }

    const newAccessToken = jwt.sign(
      { email: isTokenValid.email, role: isTokenValid.role },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("pscAccessToken", newAccessToken, { maxAge: 1000 * 60 });
    res.status(200).send({ msg: newAccessToken });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { userRouter };
