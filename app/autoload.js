const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const loadConfig = (app) => {
  const dir = path.join(__dirname, 'config');
  let config = {};
  fs.readdirSync(dir).forEach(file => {
    let names = file.split('.');
    config[names[0]] = require('./config/' + file);
  });
  return config;
};

const loadControllers = (app) => {
  const dir = path.join(__dirname, 'controllers');
  fs.readdirSync(dir).forEach(file => {
    require('./controllers/' + file)(app);
  });
};

const loadViews = (app) => {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
};

const loadServices = (app) => {
  const dir = path.join(__dirname, 'services');
  let services = {};
  fs.readdirSync(dir).forEach(file => {
    let names = file.split('.');
    services[names[0]] = require('./services/' + file)(app);
  });
  return services;
};

module.exports.run = (app) => {

  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(session({
    secret: 'something',
    cookie: {maxAge: 1000 * 50 * 5},
    resave: true,
    saveUninitialized: true
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));// lấy thông tin từ form HTML
  app.use(bodyParser.json());
  // const config = loadConfig(app);
  // app.config = config;
  app.services = loadServices(app);
  loadControllers(app);
  loadViews(app);

  return app;
};
