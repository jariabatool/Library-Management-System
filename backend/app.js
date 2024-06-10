const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const books = require('./routes/books');
const users = require('./routes/users');
const auth = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

app.use(bodyParser.json());                                          //middleware
app.use(cors());


mongoose.connect('mongodb://localhost:27017/library', {                     //MongoDB connection
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//routes
app.use('/books', books);
app.use('/users', users);
app.use('/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
