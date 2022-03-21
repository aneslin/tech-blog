const express = require('express');
const sequelize = require('./config/connection')
const routes = require('./controllers')
const exphbs = require ('express-handlebars')
const helpers = require('./utils/helpers')
const hbs = exphbs.create( { helpers } )
const session = require ('express-session')
const path = require('path')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express();
const PORT =  process.env.PORT || 3001
const sess = {
  secret: 'super secret secret',
  cookie: {maxAge: 360000},
  resave: false,
  saveUninitialized: true,
  rolling: true,
  
  store: new SequelizeStore({
    db: sequelize
  })
}
app.use(session(sess))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});