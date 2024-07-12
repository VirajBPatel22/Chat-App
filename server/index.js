// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// require("dotenv").config();

// app.use(cors())
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser:true,
//     useUnifiedToopology:true,
// })

// const server = app.listen(process.env.PORT,()=>{
//     console.log(`Server Started on port ${process.env.PORT}`);

// });
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4500;
const encodedPassword = encodeURIComponent('Viraj2204@');
const mongoURL = `mongodb+srv://virajbpatel2204:${encodedPassword}@chatapplication.hg2m56n.mongodb.net/?retryWrites=true&w=majority&appName=chatApplication`;

if (!mongoURL) {
  console.error('MONGOURL is not defined in .env file');
  process.exit(1);
}

// Middleware
app.use(cors())

app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Routes
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
