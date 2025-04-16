const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.signUpFormRender)
  .post(wrapAsync(userController.postSignupRoute));

router
  .route("/login")
  .get(userController.loginFormRender)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.postLoginRoute
  );

router.get("/logout", userController.logoutRoute);

module.exports = router;
