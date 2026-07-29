import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 4.9 },
  reviews: { type: Number, default: 100 },
  price: { type: String, required: true },
  numericPrice: { type: Number, required: true },
  duration: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true }
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;
