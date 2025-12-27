const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Upload folder
const uploadDir = path.join(__dirname, "uploads");
console.log('Running,',uploadDir)
// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Folder created at ${uploadDir}`);
} else {
  console.log(`Folder already exists at ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
