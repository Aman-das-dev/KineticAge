import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kineticage';
  
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2000 // Quick timeout to check local MongoDB
    });
    console.log(`[MERN Stack Backend] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`[MERN Stack Backend] Local MongoDB daemon not detected at ${MONGO_URI}.`);
    console.log(`[MERN Stack Backend] Initializing MERN In-Memory Database Store...`);
    return false;
  }
};
