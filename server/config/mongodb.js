import mongoose from "mongoose";

const connectDB = async () => {

    // This tells us in the console the second the connection is successful
    mongoose.connection.on('connected', () => console.log("Database Connected"));

    // This uses your secret URI from the .env file
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);

};

export default connectDB;