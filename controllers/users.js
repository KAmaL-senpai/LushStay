const User = require("../models/user");

module.exports.signUpFormRender = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postSignupRoute = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Signup Successfully!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.loginFormRender = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLoginRoute = async (req, res) => {
  req.flash("success", "Welcome Back");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  return res.redirect(redirectUrl);
};

module.exports.logoutRoute = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    return res.redirect("/listings");
  });
};
