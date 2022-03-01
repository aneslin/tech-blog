const express = require('express');
const sequelize = require('./config/connection')
const routes = require('./controllers')
const exphbs = require ('express-handlebars')
//const hbs = exphbs.create( { helpers } )
const session = require ('express-session')
const app = express();
const path = require('path')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  rolling: true,
  maxAge = 20000,
  store: new SequelizeStore({
    db: sequelize
  })
}
app.use(session(sess))
//app.engine('handlebars', hbs.engine)
//app.set('view engine', 'handlebars')

const PORT =  3001;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});