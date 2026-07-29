import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Shield, Heart, Award, FileText, Save, CheckCircle2, Stethoscope, AlertTriangle, Key } from 'lucide-react';

export default function ProfileView({ user, role = 'Senior Member', onUpdateProfile }) {
  const isDoctor = role === 'Physiotherapist' || user?.role === 'Physiotherapist';

  // Senior Member State
  const [profileData, setProfileData] = useState({
    name: user?.name || (isDoctor ? 'Dr. Robert Vance, PT' : 'Sarah Jenkins'),
    email: user?.email || (isDoctor ? 'robert.vance@kineticage.clinic' : 'sarah.jenkins@vitality.org'),
    phone: user?.phone || '+91 98765 43210',
    age: user?.age || (isDoctor ? 45 : 68),
    city: 'New Delhi, India',
    emergencyName: 'Mark Jenkins (Son)',
    emergencyPhone: '+91 98123 45678',
    bloodGroup: 'O+',
    medicalConditions: 'Bilateral Osteoarthritis (Grade II), Mild Lower Back Stiffness',
    vitalPassId: 'KA-VITAL-98421',
    insuranceProvider: 'Senior Vitality Subsidized Care',
    specialization: 'Geriatric Rehabilitation & Joint Mechanics',
    licenseNumber: 'DEL-PT-2012-9841',
    experience: '14+ Years Clinical Practice',
    consultationHours: 'Mon - Fri (09:00 AM - 05:00 PM IST)',
    clinicBranch: 'KineticAge Prime Centre, Vasant Kunj, New Delhi'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    if (onUpdateProfile) onUpdateProfile(profileData);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Profile Banner */}
        <div className="glass-card-cream" style={{ padding: '28px 36px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', border: '2px solid var(--primary-container)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <img 
              src={isDoctor ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200" : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
              alt={profileData.name}
              style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-container)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink-primary)' }}>{profileData.name}</h2>
                <span className="badge-pill badge-green">
                  {isDoctor ? <Stethoscope size={14} /> : <Shield size={14} />} {isDoctor ? 'Clinical Lead Specialist' : 'Active Vitality Pass'}
                </span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                {isDoctor ? `${profileData.specialization} • License: ${profileData.licenseNumber}` : `Member ID: KA-89421 • Age: ${profileData.age} yrs • Blood: ${profileData.bloodGroup}`}
              </p>
            </div>
          </div>

          {savedSuccess && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 18px', borderRadius: 'var(--radius-pill)', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> Profile Saved Successfully!
            </div>
          )}
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '28px' }}>
            
            {/* Account & Personal Information */}
            <div className="glass-card" style={{ padding: '28px', background: '#ffffff' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} style={{ color: 'var(--primary-container)' }} /> Personal Account Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                    Full Legal Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={profileData.name} 
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={profileData.email} 
                      onChange={handleChange}
                      required
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                      Phone Number (India +91)
                    </label>
                    <input 
                      type="text" 
                      name="phone"
                      value={profileData.phone} 
                      onChange={handleChange}
                      required
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                      Age
                    </label>
                    <input 
                      type="number" 
                      name="age"
                      value={profileData.age} 
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                      Location / City
                    </label>
                    <input 
                      type="text" 
                      name="city"
                      value={profileData.city} 
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                    Preferred Clinic Branch
                  </label>
                  <input 
                    type="text" 
                    name="clinicBranch"
                    value={profileData.clinicBranch} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Health Passport or Clinical Credentials */}
            <div className="glass-card" style={{ padding: '28px', background: '#ffffff' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isDoctor ? <Award size={20} style={{ color: 'var(--secondary)' }} /> : <Heart size={20} style={{ color: 'var(--primary-container)' }} />} 
                {isDoctor ? 'Clinical Credentials & Practice Info' : 'Medical Passport & Emergency Contact'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {isDoctor ? (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                        Clinical Specialization
                      </label>
                      <input 
                        type="text" 
                        name="specialization"
                        value={profileData.specialization} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                          Medical Registration / License #
                        </label>
                        <input 
                          type="text" 
                          name="licenseNumber"
                          value={profileData.licenseNumber} 
                          onChange={handleChange}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                          Clinical Experience
                        </label>
                        <input 
                          type="text" 
                          name="experience"
                          value={profileData.experience} 
                          onChange={handleChange}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                        OPD Consultation Hours
                      </label>
                      <input 
                        type="text" 
                        name="consultationHours"
                        value={profileData.consultationHours} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                          Emergency Contact Name
                        </label>
                        <input 
                          type="text" 
                          name="emergencyName"
                          value={profileData.emergencyName} 
                          onChange={handleChange}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                          Emergency Phone
                        </label>
                        <input 
                          type="text" 
                          name="emergencyPhone"
                          value={profileData.emergencyPhone} 
                          onChange={handleChange}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                          Blood Group
                        </label>
                        <input 
                          type="text" 
                          name="bloodGroup"
                          value={profileData.bloodGroup} 
                          onChange={handleChange}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.9rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                          Vital Pass ID
                        </label>
                        <input 
                          type="text" 
                          name="vitalPassId"
                          value={profileData.vitalPassId} 
                          onChange={handleChange}
                          readOnly
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', background: 'var(--surface-cream)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-container)' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
                        Diagnosed Health & Joint Conditions
                      </label>
                      <textarea 
                        name="medicalConditions"
                        rows={3}
                        value={profileData.medicalConditions} 
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Submit Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <button type="submit" className="btn-emerald" style={{ padding: '12px 28px', fontSize: '1rem' }}>
              <Save size={18} /> Save & Update Profile Data
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
