import * as mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      dbName: 'share_prompt',
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error);
  }
};