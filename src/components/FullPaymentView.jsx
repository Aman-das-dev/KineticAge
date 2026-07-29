import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, QrCode, Lock, Check } from 'lucide-react';
import { apiService } from '../services/api';

export default function FullPaymentView({ onProceedToConfirmation, onBackToDetails, bookingDetails }) {
  const [method, setMethod] = useState('upi'); // 'upi' | 'card' | 'pass'
  const [upiId, setUpiId] = useState('sarah@okicici');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8942');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('782');
  
  const [processing, setProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  const amountStr = bookingDetails ? bookingDetails.price || '₹1,499' : '₹1,499';

  const handleProcessPayment = async () => {
    setProcessing(true);
    
    // Simulate real bank/UPI gateway latency
    setTimeout(async () => {
      const generatedTxn = 'TXN-' + (method === 'upi' ? 'UPI-' : method === 'card' ? 'CARD-' : 'PASS-') + Math.floor(10000000 + Math.random() * 90000000);
      setTxnId(generatedTxn);
      setProcessing(false);
      setPaidSuccess(true);

      // Persist to MongoDB API
      await apiService.createBooking({
        serviceTitle: bookingDetails?.serviceTitle || 'Physiotherapy & Mobility Assessment',
        patientName: bookingDetails?.patientName || 'Sarah Jenkins',
        phone: bookingDetails?.phone || '+91 98765 43210',
        date: bookingDetails?.date || '2026-07-30',
        slot: bookingDetails?.slot || '10:00 AM',
        price: amountStr,
        paymentMethod: method === 'upi' ? `UPI (${upiId})` : method === 'card' ? 'Credit/Debit Card' : 'Senior Vitality Pass',
        transactionId: generatedTxn,
        paymentStatus: method === 'pass' ? 'MEDICARE_COVERED' : 'PAID'
      });

    }, 1500);
  };

  return (
    <div style={{ padding: '36px 24px', background: 'var(--surface)', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '36px', background: '#ffffff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e6f4ea', color: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--ink-primary)' }}>Razorpay / UPI Secure Checkout</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)' }}>256-Bit SSL Encryption • PCI-DSS Certified</div>
            </div>
          </div>
          <span className="badge-pill badge-green">REAL MERN DB CONNECTED</span>
        </div>

        {!paidSuccess ? (
          <>
            {/* Payment Fee Breakdown */}
            <div style={{ background: 'var(--surface-cream)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--outline-variant)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                <span>Clinical Session Fee:</span>
                <strong>{amountStr}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--primary-container)' }}>
                <span>Senior Health Subsidy / Pass:</span>
                <strong>{method === 'pass' ? `-${amountStr}` : '₹0.00'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '8px', marginTop: '6px', fontSize: '1.2rem', fontWeight: 800 }}>
                <span>Total Amount Payable:</span>
                <span style={{ color: 'var(--primary-container)' }}>{method === 'pass' ? '₹0.00' : amountStr}</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '10px' }}>
                Select Payment Method (India)
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* Option 1: UPI */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)', border: method === 'upi' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)', background: method === 'upi' ? '#e6f4ea' : '#ffffff', cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={method === 'upi'} onChange={() => setMethod('upi')} style={{ marginTop: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.92rem' }}>UPI / Google Pay / PhonePe / Paytm</strong>
                      <div style={{ display: 'flex', gap: '6px', fontSize: '0.7rem', fontWeight: 700, background: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--outline-variant)' }}>
                        <QrCode size={14} /> SCAN & PAY
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>Instant 0% transaction fee via Virtual Payment Address</span>

                    {method === 'upi' && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>Enter VPA / UPI ID</label>
                        <input 
                          type="text" 
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          placeholder="username@okicici"
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }}
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 2: Debit/Credit Card */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)', border: method === 'card' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)', background: method === 'card' ? '#e6f4ea' : '#ffffff', cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={method === 'card'} onChange={() => setMethod('card')} style={{ marginTop: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '0.92rem' }}>Credit / Debit Card & Netbanking</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>Visa, MasterCard, RuPay, SBI, HDFC, ICICI supported</span>

                    {method === 'card' && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          placeholder="Card Number"
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }} />
                          <input type="text" value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="CVV" style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', fontSize: '0.88rem' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 3: Senior Pass */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)', border: method === 'pass' ? '2px solid var(--primary-container)' : '1px solid var(--outline-variant)', background: method === 'pass' ? '#e6f4ea' : '#ffffff', cursor: 'pointer' }}>
                  <input type="radio" name="payment" checked={method === 'pass'} onChange={() => setMethod('pass')} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem' }}>Senior Vitality Pass / Medicare (₹0 Co-Pay)</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>Full subsidy verification for registered KineticAge members</span>
                  </div>
                </label>

              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button className="btn-secondary" onClick={onBackToDetails} disabled={processing}>
                <ArrowLeft size={16} /> Back
              </button>
              
              <button 
                className="btn-emerald" 
                style={{ padding: '12px 28px', fontSize: '1rem', flex: 1, justifyContent: 'center' }} 
                onClick={handleProcessPayment}
                disabled={processing}
              >
                {processing ? 'Connecting Gateway...' : `Pay ${method === 'pass' ? '₹0.00 (Pass Verified)' : amountStr} & Confirm`} <ArrowRight size={18} />
              </button>
            </div>
          </>
        ) : (
          /* Payment Success Confirmation Box */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e6f4ea', color: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={40} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              Payment Successful!
            </h2>

            <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', marginBottom: '16px' }}>
              Transaction Hash: <strong style={{ color: 'var(--primary-container)' }}>{txnId}</strong>
            </p>

            <div style={{ background: 'var(--surface-cream)', padding: '16px', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', textAlign: 'left', marginBottom: '24px', border: '1px solid var(--outline-variant)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Method:</span> <strong>{method.toUpperCase()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Status:</span> <strong style={{ color: 'var(--primary-container)' }}>SAVED TO MONGODB</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Amount Charged:</span> <strong>{method === 'pass' ? '₹0.00' : amountStr}</strong>
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '1rem' }}
              onClick={onProceedToConfirmation}
            >
              View Booking Ticket Pass <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
