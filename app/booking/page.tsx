'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, Sparkles } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
}

const TIME_SLOTS = [
  '9:00 AM','10:00 AM','11:00 AM','12:00 PM',
  '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM',
];

function BookingForm() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceName: searchParams.get('service') || '',
    serviceId: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please login to access the booking page');
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    api.get('/services').then(({ data }) => setServices(data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Should be handled by redirect, but just in case
    if (!form.serviceName || !form.date || !form.time) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const selected = services.find(s => s.name === form.serviceName);
      await api.post('/bookings', { ...form, serviceId: selected?._id });
      setSuccess(true);
      toast.success('Booking confirmed! 🌿');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success State ── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ backgroundColor: 'var(--cream)', backgroundImage: `radial-gradient(circle at top right, rgba(201,169,110,0.1) 0%, transparent 40%)` }}>
        <div className="text-center spa-card p-10 sm:p-14 w-full animate-fade-up rounded-[2rem] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.08)] bg-white relative overflow-hidden" style={{ maxWidth: 520 }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-50 rounded-tr-full -z-10" />
          
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--dark)' }}>Booking Confirmed!</h2>
          <p className="text-gray-500 mb-10 leading-relaxed text-lg">
            Your appointment request has been successfully received. We'll be in touch shortly to confirm your session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="btn btn-gold flex-1 shadow-lg hover:-translate-y-1">View My Bookings</Link>
            <button
              onClick={() => { setSuccess(false); setForm(f => ({ ...f, serviceName: '', date: '', time: '', notes: '' })); }}
              className="btn btn-outline-gold flex-1 hover:-translate-y-1 bg-white"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Booking Form ── */
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_top]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pt-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-6 animate-fade-in"
            style={{ backgroundColor: 'rgba(201,169,110,.18)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,.35)', backdropFilter: 'blur(8px)' }}
          >
            <Sparkles className="w-4 h-4" />
            Reserve Your Spot
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 animate-fade-up">
            Book an <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-light)]" style={{ WebkitTextFillColor: 'initial' }}>Appointment</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100 opacity-90">
            Schedule your perfect spa experience in seconds.
          </p>
        </div>
      </section>

      <section className="section-pad relative z-20 -mt-16 sm:-mt-24">
        <div className="container-spa" style={{ maxWidth: 860 }}>

          <div className="spa-card p-6 sm:p-12 rounded-[2rem] border border-gray-100 bg-white shadow-2xl shadow-black/5 animate-fade-up delay-100">
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-black mb-6 pb-4 border-b border-gray-100 flex items-center gap-3" style={{ color: 'var(--dark)' }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white" style={{ background: 'var(--gold)' }}>1</span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500"><User className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Full Name *</label>
                    <input
                      required
                      className="spa-input !py-4 !rounded-xl"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500"><Mail className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Email *</label>
                    <input
                      required
                      type="email"
                      className="spa-input !py-4 !rounded-xl"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500"><Phone className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Phone Number *</label>
                    <input
                      required
                      className="spa-input !py-4 !rounded-xl"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                    />
                    <p className="text-xs text-gray-400 mt-2 ml-1 font-bold">Used for WhatsApp confirmation.</p>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-xl font-black mb-6 pb-4 border-b border-gray-100 flex items-center gap-3" style={{ color: 'var(--dark)' }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white" style={{ background: 'var(--gold)' }}>2</span>
                  Appointment Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Service *</label>
                    <select
                      required
                      className="spa-input !py-4 !rounded-xl cursor-pointer"
                      value={form.serviceName}
                      onChange={e => set('serviceName', e.target.value)}
                    >
                      <option value="">— Select a service —</option>
                      {services.map(s => (
                        <option key={s._id} value={s.name}>
                          {s.name} — ${s.price} · {s.duration}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500"><Calendar className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Preferred Date *</label>
                    <input
                      required
                      type="date"
                      className="spa-input !py-4 !rounded-xl cursor-pointer"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.date}
                      onChange={e => set('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500"><Clock className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Preferred Time *</label>
                    <select
                      required
                      className="spa-input !py-4 !rounded-xl cursor-pointer"
                      value={form.time}
                      onChange={e => set('time', e.target.value)}
                    >
                      <option value="">— Select a time slot —</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-xl font-black mb-6 pb-4 border-b border-gray-100 flex items-center gap-3" style={{ color: 'var(--dark)' }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white" style={{ background: 'var(--gold)' }}>3</span>
                  Special Notes
                </h3>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500"><FileText className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Notes (optional)</label>
                <textarea
                  className="spa-input !py-4 !rounded-xl"
                  rows={4}
                  placeholder="Any special requests, allergies, or health conditions we should know about…"
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !user}
                  className="btn btn-gold w-full btn-xl shadow-2xl hover:shadow-[0_20px_40px_rgba(201,169,110,0.3)] disabled:opacity-50 disabled:shadow-none disabled:hover:-translate-y-0 transition-all font-black text-lg"
                >
                  {loading ? 'Confirming…' : 'Confirm Appointment ✦'}
                </button>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-up delay-200">
            {[
              { icon: '🕐', title: 'Opening Hours', info: 'Mon–Sat: 9AM–8PM\nSun: 10AM–6PM' },
              { icon: '📱', title: 'WhatsApp Us', info: '+91 62073 68893' },
              { icon: '📍', title: 'Location', info: '123 Serenity Lane,\nWellness District' },
            ].map(({ icon, title, info }) => (
              <div key={title} className="spa-card p-8 text-center rounded-[2rem] border border-gray-100 bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4 bg-amber-50 w-20 h-20 mx-auto rounded-[1.5rem] flex items-center justify-center shadow-inner">{icon}</div>
                <p className="font-black text-xl mb-2" style={{ color: 'var(--dark)' }}>{title}</p>
                <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed font-medium">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
