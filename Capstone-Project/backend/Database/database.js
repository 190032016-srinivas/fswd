import mongoose from "mongoose";
const connectionString =
  "mongodb+srv://srinivas-bodduru:Srinivas%402001@capstone-project-databa.acwhv.mongodb.net/?retryWrites=true&w=majority&appName=Capstone-Project-Database";

console.log("MongoDB Connection String:", connectionString); // Log the connection string

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));
