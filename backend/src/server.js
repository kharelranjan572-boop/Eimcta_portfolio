const express = require("express")
require("dotenv").config({ path: './src/.env' })
const connectDB = require('./config/db');
const cors = require('cors')
const CookieParser = require('cookie-parser')
const UserRouter = require('./router/userRouter')
const path = require('path');
const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: '50mb' }));
app.use(CookieParser());
app.use(cors());

app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));
// Connect DB
connectDB();

app.use('/', UserRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/facebook', require('./router/fbRouter'))
app.use('/tiktok', require('./router/tiktokRouter'))

console.log(process.env.PORT)
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
