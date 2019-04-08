var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const users = [
  {id: '2f24vvg', username: 'admin', password: 'asdf1234'}
];


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  {
    passReqToCallback: false
  },
  (req, username, password, done) => authenticate(username, password, done)
));

passport.use('login', new LocalStrategy({passReqToCallback: true},
  (req, username, password, done) => authenticate(req, username, password, done)
));


const authenticate = (req, username, password, done) => {
  let user = users[0];
  console.log(username);
  if (username === user.username && password === user.password) {
    return done(null, user);
  }
};


const roles = (...allowedRoles) => {
  return (req, res, next) => {
    // if (req.headers.roleUser && allowedRoles.includes(req.headers.roleUser)) {
    //   return next();
    // }
    return next(new Error('No acceptable'));
  }
};


module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  return {roles, passport: passport}
};