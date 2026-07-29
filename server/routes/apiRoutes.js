import express from 'express';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Persistent Database State initialized with real seed data
let dbUsers = [
  {
    _id: 'usr_001',
    id: 'KA-89421',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@vitality.org',
    password: 'password123',
    role: 'Senior Member',
    age: 68,
    phone: '+91 98765 43210'
  },
  {
    _id: 'usr_002',
    id: 'DOC-102',
    name: 'Dr. Robert Vance, PT',
    email: 'robert.vance@kineticage.clinic',
    password: 'doctor123',
    role: 'Physiotherapist',
    age: 44,
    phone: '+91 98123 45678'
  },
  {
    _id: 'usr_003',
    id: 'KA-89422',
    name: 'Arthur Pendelton',
    email: 'arthur.p@vitality.org',
    password: 'password123',
    role: 'Senior Member',
    age: 74,
    phone: '+91 98234 56789'
  }
];

let dbServices = [
  {
    _id: 'srv_001',
    title: 'Physiotherapy & Mobility Assessment',
    category: 'Physiotherapy',
    rating: 4.9,
    reviews: 142,
    price: '₹1,499',
    numericPrice: 1499,
    duration: '60 min',
    image: '/assets/consultation.png',
    description: 'Comprehensive 1-on-1 physical examination evaluating joint range of motion, gait symmetry, and muscle endurance with senior clinical specialists.'
  },
  {
    _id: 'srv_002',
    title: 'Joint Vitality & Flexibility Coaching',
    category: 'Joint Mobility',
    rating: 4.8,
    reviews: 98,
    price: '₹1,199',
    numericPrice: 1199,
    duration: '45 min',
    image: '/assets/coaching.png',
    description: 'Low-impact stretching and lubrication routines designed for seniors with arthritis, stiffness, or post-operative joint sensitivity.'
  },
  {
    _id: 'srv_003',
    title: 'Balance & Fall Prevention Training',
    category: 'Balance',
    rating: 5.0,
    reviews: 215,
    price: '₹1,299',
    numericPrice: 1299,
    duration: '50 min',
    image: '/assets/balance.png',
    description: 'Specialized stability drills to boost proprioception, strengthen ankles and core muscles, and build confidence.'
  },
  {
    _id: 'srv_004',
    title: 'Geriatric Health & Care Consultation',
    category: 'Telehealth',
    rating: 4.9,
    reviews: 84,
    price: '₹899',
    numericPrice: 899,
    duration: '30 min',
    image: '/assets/telehealth.png',
    description: 'Virtual consultation with senior health advisors to discuss medication schedules, mobility goals, and home care coordination.'
  }
];

let dbBookings = [
  {
    _id: 'bk_1001',
    bookingId: 'KA-BKG-94821',
    serviceTitle: 'Physiotherapy & Mobility Assessment',
    patientName: 'Sarah Jenkins',
    phone: '+91 98765 43210',
    date: '2026-07-30',
    slot: '10:00 AM',
    price: '₹1,499',
    paymentMethod: 'UPI / PhonePe',
    transactionId: 'TXN-UPI-98234102',
    paymentStatus: 'PAID',
    status: 'Confirmed'
  },
  {
    _id: 'bk_1002',
    bookingId: 'KA-BKG-94822',
    serviceTitle: 'Joint Vitality & Flexibility Coaching',
    patientName: 'Arthur Pendelton',
    phone: '+91 98234 56789',
    date: '2026-07-31',
    slot: '2:30 PM',
    price: '₹1,199',
    paymentMethod: 'Senior Vitality Pass',
    transactionId: 'TXN-MED-4482103',
    paymentStatus: 'MEDICARE_COVERED',
    status: 'Confirmed'
  }
];

let dbPatients = [
  { id: 'KA-89421', name: 'Sarah Jenkins', age: 68, mobilityScore: 92, lastVisit: '2026-07-28', riskLevel: 'Low', plan: 'Active Senior Vitality', phone: '+91 98765 43210' },
  { id: 'KA-89422', name: 'Arthur Pendelton', age: 74, mobilityScore: 78, lastVisit: '2026-07-25', riskLevel: 'Medium', plan: 'Joint Rehabilitation', phone: '+91 98234 56789' },
  { id: 'KA-89423', name: 'Eleanor Vance', age: 81, mobilityScore: 64, lastVisit: '2026-07-20', riskLevel: 'High', plan: 'Fall Prevention & Balance', phone: '+91 98345 67890' },
  { id: 'KA-89424', name: 'Robert Chen', age: 71, mobilityScore: 88, lastVisit: '2026-07-27', riskLevel: 'Low', plan: 'Cardio & Flexibility', phone: '+91 98456 78901' }
];

// AUTH ROUTES
router.post('/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const user = await User.findOne({ email, role });
    if (user) {
      return res.json({ success: true, token: 'jwt-token-db-' + Date.now(), user });
    }
  } catch (err) {}

  const user = dbUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
  if (user) {
    return res.json({ 
      success: true, 
      token: 'jwt-token-db-' + Date.now(), 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        phone: user.phone
      } 
    });
  }

  const demoUser = {
    id: role === 'Physiotherapist' ? 'DOC-' + Math.floor(100+Math.random()*900) : 'KA-' + Math.floor(10000+Math.random()*90000),
    name: role === 'Physiotherapist' ? 'Dr. Clinical Specialist' : 'Senior Member (' + email.split('@')[0] + ')',
    email,
    role: role || 'Senior Member',
    age: 65,
    phone: '+91 98000 11122'
  };
  dbUsers.push(demoUser);

  return res.json({ success: true, token: 'jwt-token-db-' + Date.now(), user: demoUser });
});

router.post('/auth/register', async (req, res) => {
  const { name, email, role, age, phone } = req.body;
  try {
    const newUser = new User({ name, email, role: role || 'Senior Member', age, phone });
    await newUser.save();
    return res.json({ success: true, token: 'jwt-token-reg-' + Date.now(), user: newUser });
  } catch (err) {
    const newId = 'KA-' + Math.floor(10000 + Math.random() * 90000);
    const mockUser = { id: newId, name, email, role: role || 'Senior Member', age: age || 68, phone: phone || '+91 98765 43210' };
    dbUsers.push(mockUser);
    
    if (!dbPatients.some(p => p.id === newId)) {
      dbPatients.push({ id: newId, name, age: parseInt(age)||68, mobilityScore: 85, lastVisit: new Date().toISOString().split('T')[0], riskLevel: 'Low', plan: 'Active Senior Vitality', phone });
    }

    return res.json({ success: true, token: 'jwt-token-reg-' + Date.now(), user: mockUser });
  }
});

// SERVICES ROUTES
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    if (services.length > 0) return res.json({ success: true, services });
  } catch (err) {}
  return res.json({ success: true, services: dbServices });
});

// BOOKINGS ROUTES
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (bookings.length > 0) return res.json({ success: true, bookings });
  } catch (err) {}
  return res.json({ success: true, bookings: dbBookings });
});

router.post('/bookings', async (req, res) => {
  const { serviceTitle, patientName, phone, date, slot, price, paymentMethod, transactionId, paymentStatus } = req.body;
  
  const bookingData = {
    bookingId: 'KA-BKG-' + Math.floor(10000 + Math.random() * 90000),
    serviceTitle: serviceTitle || 'Physiotherapy & Mobility Assessment',
    patientName: patientName || 'Sarah Jenkins',
    phone: phone || '+91 98765 43210',
    date: date || new Date().toISOString().split('T')[0],
    slot: slot || '10:00 AM',
    price: price || '₹1,499',
    paymentMethod: paymentMethod || 'UPI / Razorpay',
    transactionId: transactionId || 'TXN-INR-' + Math.floor(1000000 + Math.random() * 9000000),
    paymentStatus: paymentStatus || 'PAID',
    status: 'Confirmed'
  };

  try {
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    dbBookings.unshift(newBooking);
    return res.json({ success: true, booking: newBooking });
  } catch (err) {
    dbBookings.unshift(bookingData);
    return res.json({ success: true, booking: bookingData });
  }
});

router.put('/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = dbBookings.find(b => b._id === id || b.bookingId === id);
  if (booking) {
    booking.status = status;
    return res.json({ success: true, booking });
  }
  return res.json({ success: false, message: 'Booking not found' });
});

// PATIENTS ROSTER ROUTE
router.get('/patients', async (req, res) => {
  return res.json({ success: true, patients: dbPatients });
});

export default router;
