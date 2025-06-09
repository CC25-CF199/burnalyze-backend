const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../upload');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const uploadSingle = (req, res, next) => {
  return upload.single('wound-img')(req, res, async error => {
    if (error) {
      return next(createError(400, error));
    }
    next();
  });
};

const checkFileType = (file, cb) => {
  const fileFormat = /jpeg|jpg|png/;
  const extname = fileFormat.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = fileFormat.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Filetype: Images only! (jpeg, jpg, png)'));
  }
};

module.exports = { uploadSingle };
