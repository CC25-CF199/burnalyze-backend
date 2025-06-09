require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('Path');
const createError = require('http-errors');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');

const app = express();

app.use(cors());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

const PORT = process.env.PORT || 3000;
const routes = require('./routes/v1');

app.use(express.json());
app.use('/v1', routes);

// Catch 404 error
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error handler middleware
app.use(errorHandler);

// Create upload dir
const uploadDir = path.join(__dirname, '../upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
