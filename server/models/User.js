import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['Senior Member', 'Physiotherapist', 'Admin'], default: 'Senior Member' },
  age: { type: Number },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
