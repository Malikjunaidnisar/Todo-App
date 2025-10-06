const mongoose = require('mongoose'); // Or const { MongoClient } = require('mongodb'); for native driver

// IMPORTANT: Replace with your actual MongoDB Atlas connection string
// const uri = "mongodb+srv://Saya1train:saya1train@cluster0.at06fof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const uri = "mongodb+srv://saya1train:saya1train@blogpostdb.jniaepd.mongodb.net/?retryWrites=true&w=majority&appName=BlogPostDb"
const uri = process.env.MONGO_DB_URI

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true, // Deprecated in newer Mongoose versions, but good to know
      // useUnifiedTopology: true // Deprecated in newer Mongoose versions
    });
    console.log("Connected to MongoDB Atlas!");

  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    // Disconnect after operations (optional, depending on your app)
    // await mongoose.disconnect();
    // console.log("Disconnected from MongoDB Atlas.");
  }
}
//connectDB()
module.exports = {connectDB};
