module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/favork',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'YOUR_RAZORPAY_KEY_SECRET',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretjwttoken',
};
