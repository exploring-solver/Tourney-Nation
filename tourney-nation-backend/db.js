const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
