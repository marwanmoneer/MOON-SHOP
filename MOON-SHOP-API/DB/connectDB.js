// Importing the Mongoose library
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Establishing the connection using the provided connection string
    const connection = await mongoose.connect(process.env.CONNECTION_STRING, {});

    // Logging a successful connection
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    // Handling connection errors
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // Exiting the process with a failure code in case of an error
    process.exit(1);
  }
};

// Exporting the connectDB function
module.exports = connectDB;
