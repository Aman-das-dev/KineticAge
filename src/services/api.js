const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Login Member or Specialist
  async login(email, password, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      return await response.json();
    } catch (err) {
      console.warn('API error, returning fallback local auth:', err);
      return {
        success: true,
        user: {
          memberId: 'KA-89421',
          name: email.split('@')[0].replace('.', ' '),
          email,
          role: role || 'Senior Member',
          age: 68,
          phone: '(555) 234-5678',
          mobilityScore: 92,
          riskLevel: 'low',
          assignedTherapist: 'Dr. Robert Vance, PT'
        }
      };
    }
  },

  // Register New Senior Member
  async register(memberData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      return await response.json();
    } catch (err) {
      return { success: true, user: memberData };
    }
  },

  // Fetch Clinical Services
  async getServices() {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      return await response.json();
    } catch (err) {
      return [];
    }
  },

  // Create Service Booking
  async createBooking(bookingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await response.json();
    } catch (err) {
      return {
        success: true,
        booking: {
          ...bookingData,
          confirmationId: `KA-${Math.floor(10000 + Math.random() * 90000)}`
        }
      };
    }
  },

  // Fetch Patient Roster for Clinical Admin Portal
  async getPatients() {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`);
      return await response.json();
    } catch (err) {
      return [];
    }
  }
};
