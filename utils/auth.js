const withAuth = (req, res, next) => {
  if (!req.session.account) {
    res.redirect("/api/user/login");
  } else {
    next();
  }
};

module.exports = withAuth;
