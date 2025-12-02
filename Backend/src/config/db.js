import mongoose from 'mongoose';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const connectDB = async () => {
  // prefer MONGO_URI, but support MONGODB_URI env name if used elsewhere
  const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rentalsdb';
  const retries = parseInt(process.env.DB_CONNECT_RETRIES || '5', 10);
  const delayMs = parseInt(process.env.DB_CONNECT_RETRY_DELAY_MS || '2000', 10);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(mongoURI, {
        // recommended options can be passed here, mongoose 6+ uses defaults
      });
      console.log(`MongoDB connected to ${mongoURI}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, error.message || error);
      if (attempt < retries) {
        console.log(`Retrying in ${delayMs}ms...`);
        await sleep(delayMs);
      } else {
        console.error('Could not connect to MongoDB after retries, exiting.');
        process.exit(1);
      }
    }
  }
};

export default connectDB;
