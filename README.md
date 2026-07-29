# 🌿 KineticAge — Senior Wellness & Mobility Platform (MERN Stack)

KineticAge is an enterprise-grade full-stack MERN application engineered specifically for senior physical rehabilitation, joint vitality, and clinical care management in the Indian healthcare market. Built with a modern 1600px grid system, real-time Express & MongoDB REST API synchronization, Indian Rupee (₹ INR) localization, and role-based portals for Senior Members and Clinical Specialists.

---

## 🌟 Key Features

### 1. 🧘‍♂️ Senior Member Vitality Portal
* **Mobility Vitality Index (92/100)**: Real-time telemetry tracking joint fluidity, stride symmetry, and daily physical milestones.
* **Prescribed Daily Routines**: Interactive exercises with completion state persistence (e.g., *Seated Ankle Pumps*, *Chair Squat Fluidity*).
* **My Health Passport & Profile**: Personal health records, emergency contacts (e.g., son/daughter phone), blood group (`O+`), and Vital Pass ID.
* **Telehealth Care Chat**: 1-on-1 direct care messaging with Lead Physiotherapist **Dr. Robert Vance, PT**.
* **Clinical Records & Payments**: View past session receipts, booking IDs, and payment breakdown in INR (₹).

### 2. 🩺 Clinical Command Portal (Doctor Specialist)
* **Interactive Patient Roster**: Filter seniors by risk levels (*Low*, *Medium*, *High*) and instant keyword search.
* **EHR File Inspector**: Review medical history and update physiotherapist clinical notes in real-time.
* **Doctor Credentials & Practice Profile**: Editable physician profiles including Medical Registration/License (`DEL-PT-2012-9841`), OPD hours, and specialization.
* **Practice Telemetry & Analytics**: High-level clinical analytics (1,480+ sessions, +18.4% mobility gain, 99.2% fall prevention rate).

### 3. 💳 10-Step Enterprise User Journey
1. **Landing Page**: Modern Hero banner, "Why Choose KineticAge" grid, and active clinic statistics.
2. **Authentication Modal & Full View**: Express/MongoDB backend integration with 1-click Quick Login demo presets.
3. **Registration Portal**: Dual-role sign-ups for Senior Members and Physiotherapists.
4. **Services Catalog**: Hydrotherapy, Joint Rehabilitation, Fall Prevention, Cardio Vitality.
5. **Details & Slot Picker**: Select preferred date and clinical time slots.
6. **Payment Gateway**: Indian INR (₹) payment integration supporting UPI, Net Banking, and Senior Vitality Pass subsidies.
7. **Booking Confirmation**: Complete invoice breakdown before final booking dispatch.
8. **Booking Success**: Confirmation badge with receipt generation.
9. **Senior Member Dashboard**: Full telemetry, exercises, chat, and health passport.
10. **Doctor Portal**: Clinical roster, EHR inspection, and analytics.

---

## 🏗️ Architecture & Project Structure

```text
kineticage/
├── server/                       # Node.js + Express REST API Backend
│   ├── config/
│   │   └── db.js                 # MongoDB Connection Config
│   ├── models/
│   │   ├── User.js               # Mongoose Schema for Members & Doctors
│   │   ├── Booking.js            # Mongoose Schema for Clinical Sessions
│   │   └── Service.js            # Mongoose Schema for Rehabilitation Packages
│   ├── routes/
│   │   └── apiRoutes.js          # REST API Endpoints (/api/auth, /api/bookings, /api/patients)
│   └── index.js                  # Main Express App Server (Port 5000)
│
├── src/                          # React + Vite Frontend (Port 5173)
│   ├── components/
│   │   ├── Header.jsx            # 1600px Top Navigation Bar & Emergency Care Banner
│   │   ├── HeroSection.jsx       # Main Landing Hero Section
│   │   ├── WhyChooseSection.jsx  # Feature Cards & Vitality Widgets
│   │   ├── ServicesSection.jsx   # Clinical Care Catalog Grid
│   │   ├── FullLoginView.jsx     # Standalone Authentication View
│   │   ├── FullRegisterView.jsx  # Standalone Registration View
│   │   ├── FullServiceDetailsView.jsx # Service Description & Doctor Profiles
│   │   ├── FullPaymentView.jsx   # Razorpay/UPI Payment Gateway (₹ INR)
│   │   ├── FullConfirmationView.jsx # Session Invoice Summary
│   │   ├── FullSuccessView.jsx   # Booking Receipt View
│   │   ├── UserDashboard.jsx     # Senior Member Tabbed Portal
│   │   ├── AdminDashboard.jsx    # Doctor Clinical Command Center
│   │   ├── ProfileView.jsx       # Comprehensive Editable Profile System
│   │   ├── AuthModal.jsx         # Quick Access Login Popup
│   │   ├── BookingModal.jsx      # Quick Booking Drawer
│   │   └── Footer.jsx            # 1600px Normalization Grid Footer
│   │
│   ├── services/
│   │   └── api.js                # Frontend REST API Service Client
│   │
│   ├── App.jsx                   # Central Application Router & State Manager
│   ├── index.css                 # Global HSL Tokens & Design System
│   └── main.jsx                  # React Entry Point
│
├── .gitignore                    # Version Control Exclusions
├── README.md                     # Project Documentation
└── package.json                  # Dependencies & Scripts
```

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite 8 |
| **Styling & Design** | HSL Tokenized Vanilla CSS (1600px Grid, Sage & Cream Palette) |
| **Icons** | Lucide React |
| **Backend Runtime** | Node.js (v18+ / v24+) |
| **Server Framework** | Express.js |
| **Database** | MongoDB (Local `mongodb://127.0.0.1:27017/kineticage` or Atlas) |
| **Object Modeling** | Mongoose |
| **Authentication** | REST API JWT Session Architecture |

---

## 🔌 REST API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new Senior Member or Doctor account |
| `POST` | `/api/auth/login` | Authenticate user and return JWT session token |

### 📅 Clinical Bookings (`/api/bookings`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | Fetch all clinical session bookings |
| `POST` | `/api/bookings` | Create a new session booking with INR payment receipt |

### 🩺 Patient Roster (`/api/patients`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/patients` | Retrieve active senior patient files for the Doctor Portal |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [MongoDB](https://www.mongodb.com/) running locally on port `27017` or a cloud MongoDB Atlas connection URI.

### 1. Clone Repository
```bash
git clone https://github.com/Aman-das-dev/KineticAge.git
cd KineticAge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Backend Server
```bash
node server/index.js
# Express REST API will start on http://localhost:5000
```

### 4. Start Frontend Client
In a new terminal window:
```bash
npm run dev
# Vite server will start on http://localhost:5173
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed for **KineticAge Senior Mobility & Clinical Health Services**.
