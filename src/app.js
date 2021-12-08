const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
// testing out the use of handlebars // new
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const freeRouter = require('../src/routers/all');
const loggedRouter = require('../src/routers/logged');
const unloggedRouter = require('../src/routers/unlogged');
const { verifyToken } = require('../src/middleware/auth');
const compression = require('compression');
// const MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();

// Create app, set port number to 5000 for dev:
const app = express();

// all application to run on Heroku or localhost:5000
const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

// connect to Mongo Database
const MONGODB_URI = process.env.MONGODB_URL;

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	family: 4,
  };

// Set HTTP to HTTPS redirection:
// https://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect/23894573#23894573
// https://www.tonyerwin.com/2014/09/redirecting-http-to-https-with-nodejs.html
app.enable('trust proxy');
if (process.env.NODE_ENV === 'production') {
	app.use((req, res, next) => {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(301, ['https://', req.get('Host'), req.baseUrl].join(''));
		}
		return next();
	});
}


// Use cookie-parser middleware:
app.use(cookieParser());
// use compression middleware by calling function
app.use(compression());

// Allow json and x-www-form-urlencoded as body parsers for POST method:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Local paths:
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars. Set views and partials locations:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set static directory:
app.use(express.static(pubDir));

// Use routers:
app.use(freeRouter);
app.use(loggedRouter);
app.use(unloggedRouter);

// Route for 404 page:
app.get('*', verifyToken, (req, res) => {
	res.render('message', {
		user: req.user,
		message: 'Page not found!'
	});
});



mongoose
  .connect(MONGODB_URI, options)
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });