const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const reportController = require('../controller/report.controller');

const router = express.Router();

const uploadPath = path.join(__dirname, '../uploads');

// ✅ Ensure upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log('✅ uploads folder created');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^\w.-]/g, '_');
    cb(null, Date.now() + '-' + safeName);
  },
});

const upload = multer({ storage });

// ✅ Define upload route
router.post('/upload', upload.single('file'), reportController.createReport);
router.get('/', reportController.getAllReports);
module.exports = router;
