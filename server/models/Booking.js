import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  patientName: { type: String, required: true },
  phone: { type: String },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  price: { type: String, default: '₹1,499' },
  paymentMethod: { type: String, default: 'UPI' },
  transactionId: { type: String },
  paymentStatus: { type: String, default: 'PAID' },
  status: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;
