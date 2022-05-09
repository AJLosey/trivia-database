const express = require('express'); // https://www.npmjs.com/package/express
const session = require('express-session'); // https://www.npmjs.com/package/express-session
const path = require('path');
// Handlebars - view engine for Express
const exphbs = require('express-handlebars'); //https://www.npmjs.com/package/express-handlebars


const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/config'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Create a session middleware
const sess = {
    secret: "Here we go super super secret key do the magic", //process.env.SECRET, - removed for heroku
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
app.use(session(sess));
// creating ExpressHandlebars instances
const hbs = exphbs.create();

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});