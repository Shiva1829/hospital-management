import mongoose from 'mongoose';
import { User } from './models/userSchema.js';

mongoose.connect('mongodb://localhost:27017/hospitalDB').then(async () => {
  const user = await User.findOne({ email: 'admin@hospital.com' }).select('+password');
  console.log(JSON.stringify(user, null, 2));
  mongoose.disconnect();
}).catch(err => console.log(err));