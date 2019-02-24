const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//settings routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//FIXING CORS ISSUES
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//passport middleware
app.use(passport.initialize());

//passport configuration
require('./config/passport')(passport);

//connection to db with mongoose
const dbURI = require('./config/keys').mongodbURI;

mongoose.connect(dbURI, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(`WE GOT ISSUES: ${err} `);
  } else console.log('db connected!');
});

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//for prod deployment
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`we are live on ${port}`));
