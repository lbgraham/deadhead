const express = require('express')
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../database/index.js');

const app = express();
const port = 8080;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log(user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password !== password) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.send(`${JSON.stringify(req.query.username)}`);
  });

app.get('/search/:query', (req, res) => {
  console.log(req.params.query);
  let query = encodeURIComponent(req.params.query.trim());
  axios.get(`https://archive.org/advancedsearch.php?q=${query}&output=json`, {
  })
  .then(response => {
      res.send(response.data);
  })
  .catch(err => {
    res.status(500).send('Unable to retrieve data.');
  })
});

app.use('/', express.static(path.join(__dirname + '/../dist')), (err) => console.log());

app.listen(port, () => {
  console.log(`Deadhead server is running on port ${port}`);
});






