const mongoose = require("mongoose");
// const config = require("config");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function () {
  const db = process.env.MONGO_URI || "";

  if (!db) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  //Connect to DB
  // mongoose.connect(db).then(() => console.log(`Connected to ${db}.....`));

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
};
