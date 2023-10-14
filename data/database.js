import mongoose from "mongoose";

export const conneteDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("Database connected");
    } else {
      console.log("something error");
    }
  };
 