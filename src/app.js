const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const routes = require('./routes/v1');

app.use(express.json());
app.use('/v1', routes);
// Serve static model file
app.use(
  '/model',
  express.static(path.join(__dirname, '../ml_model/tfjs_model'))
);

// Catch 404 error
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
