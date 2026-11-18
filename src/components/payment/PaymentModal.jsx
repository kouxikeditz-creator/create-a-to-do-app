import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const PaymentModal = () => {
  const { paymentModal, setPaymentModal, completeEnrollment } = useApp();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('student@oksbi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!paymentModal.isOpen || !paymentModal.course) return null;

  const { course } = paymentModal;

  let finalPrice = course.price;
  if (appliedCoupon === 'RANK100') {
    finalPrice = 0;
  } else if (appliedCoupon === 'MISSION50') {
    finalPrice = Math.round(course.price * 0.5);
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'RANK100') {
      setAppliedCoupon('RANK100');
      setCouponError('');
    } else if (code === 'MISSION50') {
      setAppliedCoupon('MISSION50');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try RANK100 or MISSION50');
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let methodLabel = 'UPI';
      if (paymentMethod === 'upi') methodLabel = `UPI (${selectedUpiApp})`;
      else if (paymentMethod === 'card') methodLabel = 'Credit/Debit Card';
      else methodLabel = `Net Banking (${selectedBank})`;

      completeEnrollment(course, methodLabel);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-750 p-6 sm:p-8 space-y-6 my-auto text-slate-900 dark:text-white">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Razorpay Secure Checkout</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">256-Bit SSL Encrypted Indian Payment Gateway</p>
            </div>
          </div>

          <button
            onClick={() => setPaymentModal({ isOpen: false, course: null })}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Details Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-gold-600 dark:text-gold-400">
            Selected Batch
          </span>
          <h4 className="font-extrabold text-sm text-navy-950 dark:text-white">
            {course.title}
          </h4>
          <p className="text-slate-500 dark:text-slate-400">
            {course.duration} • Includes All Live Classes, Notes & CBT Tests
          </p>

          <div className="pt-2 border-t border-slate-200 dark:border-navy-700 flex items-baseline justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Course Fee:</span>
            <div className="flex items-baseline gap-2">
              {appliedCoupon && (
                <span className="line-through text-slate-400">₹{course.price.toLocaleString('en-IN')}</span>
              )}
              <span className="text-lg font-black text-navy-950 dark:text-white">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Coupon Code Input */}
        <div className="space-y-1.5">
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo Code (try RANK100 or MISSION50)"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-navy-950 dark:text-white uppercase font-bold placeholder-slate-400 focus:outline-none focus:border-gold-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-navy-900 dark:bg-navy-800 text-white font-bold text-xs hover:bg-navy-850"
            >
              Apply
            </button>
          </form>
          {appliedCoupon && (
            <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Coupon {appliedCoupon} applied successfully!
            </p>
          )}
          {couponError && (
            <p className="text-[11px] text-red-500 font-bold">{couponError}</p>
          )}
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
            Select Payment Method:
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentMethod === 'upi'
                  ? 'border-gold-500 bg-gold-500/15 font-extrabold text-gold-600 dark:text-gold-400'
                  : 'border-slate-200 dark:border-navy-750 bg-slate-50 dark:bg-navy-850 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Smartphone className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">UPI / GPay</span>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentMethod === 'card'
                  ? 'border-gold-500 bg-gold-500/15 font-extrabold text-gold-600 dark:text-gold-400'
                  : 'border-slate-200 dark:border-navy-750 bg-slate-50 dark:bg-navy-850 text-slate-600 dark:text-slate-300'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Debit / Card</span>
            </button>

            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentMethod === 'netbanking'
                  ? 'border-gold-500 bg-gold-500/15 font-extrabold text-gold-600 dark:text-gold-400'
                  : 'border-slate-200 dark:border-navy-750 bg-slate-50 dark:bg-navy-850 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Building2 className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Net Banking</span>
            </button>
          </div>

          {/* Conditional Method Details */}
          {paymentMethod === 'upi' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-3">
              <span className="text-[11px] font-bold text-slate-500 block">Instant UPI Apps:</span>
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map((app) => (
                  <button
                    key={app}
                    onClick={() => setSelectedUpiApp(app)}
                    className={`p-2 rounded-xl border text-center text-[11px] transition-all ${
                      selectedUpiApp === app
                        ? 'border-gold-500 bg-white dark:bg-navy-900 text-gold-600 dark:text-gold-400 font-bold'
                        : 'border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <label className="text-[11px] text-slate-400 block mb-1">Or enter UPI ID / VPA</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@oksbi"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2.5 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block">Card Number</label>
                <input
                  type="text"
                  defaultValue="4111 •••• •••• 8842"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-700 font-mono text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block">Valid Thru</label>
                  <input
                    type="text"
                    defaultValue="08 / 28"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-700 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">CVV</label>
                  <input
                    type="password"
                    defaultValue="894"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-700 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-2 text-xs">
              <label className="text-[11px] text-slate-400 block">Select Your Bank:</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs font-semibold text-navy-950 dark:text-white"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
              </select>
            </div>
          )}

        </div>

        {/* Submit Button */}
        <button
          disabled={isProcessing}
          onClick={handlePayNow}
          className="w-full py-4 rounded-2xl gold-gradient-bg text-navy-950 font-black text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold-500/25 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span>Securing Enrollment...</span>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Pay ₹{finalPrice.toLocaleString('en-IN')} & Unlock Course</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-slate-400 text-center">
          By completing this payment, you agree to Mission Rank Academy's Academic Terms & 100% Satisfaction Guarantee.
        </p>

      </div>
    </div>
  );
};
