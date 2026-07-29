import React from 'react';
import { Star, Clock, Check, ArrowRight, Activity, Heart, Shield, Sparkles } from 'lucide-react';

export default function ServicesSection({ onBookService }) {
  const services = [
    {
      id: 'srv_001',
      title: 'Physiotherapy & Mobility Assessment',
      category: 'Physiotherapy',
      rating: 4.9,
      reviews: 142,
      price: '₹1,499',
      duration: '60 min',
      image: '/assets/consultation.png',
      badge: 'MOST POPULAR',
      features: ['Joint range of motion check', 'Gait & stride balance evaluation', 'Customized 4-week recovery plan'],
      description: 'Comprehensive 1-on-1 physical examination evaluating joint range of motion, gait symmetry, and muscle endurance with senior clinical specialists.'
    },
    {
      id: 'srv_002',
      title: 'Joint Vitality & Flexibility Coaching',
      category: 'Joint Mobility',
      rating: 4.8,
      reviews: 98,
      price: '₹1,199',
      duration: '45 min',
      image: '/assets/coaching.png',
      badge: 'ARTHRITIS CARE',
      features: ['Gentle synovial fluid stretches', 'Cartilage pain relief techniques', 'Morning stiffness reduction'],
      description: 'Low-impact stretching and lubrication routines designed for seniors with arthritis, stiffness, or post-operative joint sensitivity.'
    },
    {
      id: 'srv_003',
      title: 'Balance & Fall Prevention Training',
      category: 'Balance',
      rating: 5.0,
      reviews: 215,
      price: '₹1,299',
      duration: '50 min',
      image: '/assets/balance.png',
      badge: 'HIGH SAFETY',
      features: ['Proprioception ankle drills', 'Vestibular balance enhancement', 'Home hazard safety audit'],
      description: 'Specialized stability drills to boost proprioception, strengthen ankles and core muscles, and build confidence.'
    },
    {
      id: 'srv_004',
      title: 'Geriatric Health & Care Consultation',
      category: 'Telehealth',
      rating: 4.9,
      reviews: 84,
      price: '₹899',
      duration: '30 min',
      image: '/assets/telehealth.png',
      badge: 'VIRTUAL VISIT',
      features: ['Medication timeline review', 'Family caregiver guidance', 'Telehealth video follow-up'],
      description: 'Virtual consultation with senior health advisors to discuss medication schedules, mobility goals, and home care coordination.'
    }
  ];

  return (
    <section style={{ padding: '40px 40px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge-pill badge-green" style={{ marginBottom: '8px' }}>CLINICAL SERVICES</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              Tailored Programs for Every Mobility Goal
            </h2>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', fontWeight: 600 }}>
            Showing 4 Clinical Care Pathways • <span style={{ color: 'var(--primary-container)' }}>All Subsidized via Senior Vitality</span>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {services.map((srv) => (
            <div 
              key={srv.id} 
              className="glass-card" 
              style={{ padding: '20px', background: '#ffffff', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Service Card Image */}
                <div style={{ position: 'relative', marginBottom: '14px' }}>
                  <img 
                    src={srv.image} 
                    alt={srv.title}
                    style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <span className="badge-pill badge-green" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.7rem' }}>
                    {srv.badge}
                  </span>
                </div>

                {/* Rating & Duration */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', fontWeight: 700 }}>
                    <Star size={14} fill="#eab308" /> {srv.rating} ({srv.reviews})
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Clock size={14} /> {srv.duration}
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                  {srv.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', lineHeight: 1.45, marginBottom: '14px' }}>
                  {srv.description}
                </p>

                {/* Feature Bullet Points */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {srv.features.map((feat, i) => (
                    <li key={i} style={{ fontSize: '0.78rem', color: 'var(--ink-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={14} style={{ color: 'var(--primary-container)' }} /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action Button */}
              <div style={{ borderTop: '1px solid var(--surface-container)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)', textTransform: 'uppercase' }}>Session Price</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-container)' }}>{srv.price}</div>
                </div>

                <button 
                  className="btn-emerald" 
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  onClick={() => onBookService(srv)}
                >
                  Book Slot <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
