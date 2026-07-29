import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import ServicesSection from './components/ServicesSection';
import FullLoginView from './components/FullLoginView';
import FullRegisterView from './components/FullRegisterView';
import FullServiceDetailsView from './components/FullServiceDetailsView';
import FullPaymentView from './components/FullPaymentView';
import FullConfirmationView from './components/FullConfirmationView';
import FullSuccessView from './components/FullSuccessView';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { apiService } from './services/api';

export default function App() {
  // Current Active Page View ('landing'|'login'|'register'|'services'|'slot-picker'|'payment'|'confirmation'|'success'|'dashboard'|'admin')
  const [currentStep, setCurrentStep] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@vitality.org',
    role: 'Senior Member',
    id: 'KA-89421'
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleOpenBooking = (service = null) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    
    if (userData.role === 'Physiotherapist' || userData.role === 'Admin') {
      setCurrentStep('admin');
    } else {
      setCurrentStep('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentStep('landing');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      {/* Header Navigation Bar */}
      <Header 
        currentView={currentStep}
        setCurrentView={(view) => {
          if (view === 'home') setCurrentStep('landing');
          else if (view === 'services') setCurrentStep('services');
          else setCurrentStep(view);
        }}
        onOpenAuth={() => setCurrentStep('login')}
        onOpenBooking={() => handleOpenBooking()}
        user={user}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Page View Renderer */}
      <main style={{ flex: 1 }}>
        {/* Landing Page */}
        {currentStep === 'landing' && (
          <>
            <HeroSection 
              onExploreServices={() => setCurrentStep('services')}
              onBookNow={() => handleOpenBooking()}
            />
            <WhyChooseSection 
              onLearnMore={() => setCurrentStep('services')}
            />
            <ServicesSection 
              onBookService={(service) => {
                setSelectedService(service);
                setCurrentStep('slot-picker');
              }}
            />
          </>
        )}

        {/* KineticAge Login View */}
        {currentStep === 'login' && (
          <FullLoginView 
            onLoginSuccess={handleLoginSuccess}
            onGoToRegister={() => setCurrentStep('register')}
          />
        )}

        {/* KineticAge Registration View */}
        {currentStep === 'register' && (
          <FullRegisterView 
            onRegisterSuccess={handleLoginSuccess}
            onGoToLogin={() => setCurrentStep('login')}
          />
        )}

        {/* KineticAge Services Catalog */}
        {currentStep === 'services' && (
          <div style={{ paddingTop: '20px' }}>
            <ServicesSection 
              onBookService={(service) => {
                setSelectedService(service);
                setCurrentStep('slot-picker');
              }}
            />
          </div>
        )}

        {/* Service Details & Slots View */}
        {currentStep === 'slot-picker' && (
          <FullServiceDetailsView 
            onProceedToPayment={() => setCurrentStep('payment')}
          />
        )}

        {/* Payment Details View */}
        {currentStep === 'payment' && (
          <FullPaymentView 
            onProceedToConfirmation={() => setCurrentStep('confirmation')}
            onBackToDetails={() => setCurrentStep('slot-picker')}
          />
        )}

        {/* Booking Confirmation Pass View */}
        {currentStep === 'confirmation' && (
          <FullConfirmationView 
            onProceedToSuccess={() => setCurrentStep('success')}
          />
        )}

        {/* Booking Success Screen */}
        {currentStep === 'success' && (
          <FullSuccessView 
            onGoToDashboard={() => setCurrentStep('dashboard')}
          />
        )}

        {/* Authenticated Senior Member Dashboard */}
        {currentStep === 'dashboard' && (
          <UserDashboard 
            user={user}
            onBookSession={() => handleOpenBooking()}
          />
        )}

        {/* Authenticated Clinical Admin Portal */}
        {currentStep === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setCurrentView={(view) => {
          if (view === 'home') setCurrentStep('landing');
          else setCurrentStep(view);
        }}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Quick Booking Modal */}
      {isBookingOpen && (
        <BookingModal 
          selectedService={selectedService}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={async (bookingData) => {
            await apiService.createBooking(bookingData);
          }}
        />
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
