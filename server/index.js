// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");


// // const app = express();
// // require("dotenv").config();

// // app.use(cors())
// // app.use(express.json());

// // mongoose.connect(process.env.MONGO_URL,{
// //     useNewUrlParser:true,
// //     useUnifiedToopology:true,
// // })
// // const server = app.listen(process.env.PORT,()=>{
// //     console.log(`Server Started on port ${process.env.PORT}`);

// // });

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// require("dotenv").config();

// app.use(cors());
// app.use(express.json());

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true, // useUnifiedTopology is not required
//     });
//     console.log('MongoDB connected...');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// connectDB();

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server Started on port ${process.env.PORT}`);
// });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // No options needed
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
