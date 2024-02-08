var mongoose = require('mongoose');
const morgan = require('morgan');
var dotenv = require('dotenv');
var app = require('./app');

dotenv.config();

var PORT = process.env.PORT || 4000;
var HOST = process.env.DB_HOST;

if (!HOST) {
  console.error('DB_HOST is not defined in the environment variables.');
  process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose
  .connect(HOST)
  .then(function () {
    console.log('Connected to MongoDB');
    app.listen(PORT, function () {
      console.log('Node API app is running on port ' + PORT);
      app.use(morgan('combined'));
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
