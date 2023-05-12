// const jwt = require("jsonwebtoken");
// const BlackListModel = require("../models/blacklist.model");
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));
// const authentication = async (req, res, next) => {
//   try {
//     //verify accessToken
//     //check if it is not blacklisted
//     //then call next
//     const { pscAccessToken } = req.cookies;
//     const isTokenBlacklisted = await BlackListModel.findOne({
//       token: pscRefreshToken,
//     });

//     if (isTokenBlacklisted) {
//       return res
//         .status(400)
//         .send({ msg: "Refresh token expired, Please login again" });
//     }

//     const isTokenValid = jwt.verify(pscAccessToken, process.env.JWT_SECRET);
//     if (!isTokenValid) {
//       //   return res.send({
//       //     msg: "token expired, generate a new token using refresh-token endPoint",
//       //   });

//       const newAccessToken = await fetch(
//         "http://localhost:4500/users/refresh-token",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: req.cookies.pscRefreshToken,
//           },
//         }
//       ).then((res) => res.json());

//       res.cookies("pscAccessToken", newAccessToken, { maxAge: 1000 * 60 });
//       next();
//     }

//     //call using fetch refresh-token
//     //call from frontend using fetch

//     // req.payload = isTokenValid;
//     req.body.email = isTokenValid.email;
//     req.body.role = isTokenValid.role;
//     next();
//   } catch (error) {}
// };
// module.exports = { authentication };

const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../models/blacklist.model");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//authentication middleware will check and authenticate the user data before authorize for the protected routes

//it will first get if the accesstoken and refreshtoken from the cookies
//we are saving the tokens in the cookies when we are logging in
// then it will check if the token is blacklisted or not
//if black listed then it will tell to login again
//if the token is not black listed it will check if the accesstoken is valid or expired
//if the access token is valid it will directly will send us to the next page of protected route along with the payload saving

//if the access token is expired it will generate a new token from refresh token via "/refresh-token" route using fetch

const authentication = async (req, res, next) => {
  const { pscAccessToken, pscRefreshToken } = req.cookies;

  // check if it is not blacklisted
  const isTokenBlacklisted = await BlackListModel.findOne({
    token: pscAccessToken,
  });
  if (isTokenBlacklisted) {
    return res.status(400).send({ msg: "Please login..." });
  }

  // verify accessToken
  jwt.verify(pscAccessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      //if it gets the error as the token is expired it will generate a new token from refresh token

      console.log(err);
      if (err.message == "jwt expired") {
        console.log("refresh token is generated here");
        const newAccessToken = await fetch(
          "http://localhost:4500/users/refreshToken",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: pscRefreshToken,
            },
          }
        ).then((res) => res.json());
        // res.cookie("pscAccessToken", newAccessToken.msg, { maxAge: 1000 * 10 });
        console.log("newtokengenerated", res);
        next();
      } else {
        res.status(400).send({ msg: err.message });
      }
    } else {
      // then call next
      console.log(decoded);
      next();
    }
  });
};

module.exports = { authentication };
