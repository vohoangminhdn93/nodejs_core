module.exports = (app) => {
  const auth = app.services.auth;
  app.get('/users', auth.roles('admin'), (req, res, next) => {
    res.send('some thing load');
  });

  app.get('/login', (req, res, next) => {
    res.render('users/login', {title: 'Express ngu a'});
  });

  app.post('/login', auth.passport.authenticate('local', {
    successRedirect: '../',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/register', (req, res, next) => {
  });

  app.get('/logout', function (req, res, next) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
        else {
          return res.redirect('/');
        }
      });
    }
  });
};