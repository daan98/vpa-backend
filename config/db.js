import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // const mongooseUri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.s8dx1.mongodb.net/?retryWrites=true&w=majority`;
        // ABOVE IS ANOTHER OPTION FOR CONNECTING TO DB
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser   : true,
            useUnifiedTopology : true
        });

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB's connected at: ${url}`);
    } catch (error) {
        console.log(`Error while connecting to database: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;