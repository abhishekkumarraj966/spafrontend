'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Calendar, User, Clock, CheckCircle, XCircle, Loader2, Edit3 } from 'lucide-react';
import Link from 'next/link';

interface Booking {
  _id: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const statusClass: Record<string, string> = {
  Pending: 'badge-pending',
  Approved: 'badge-approved',
  Completed: 'badge-completed',
  Cancelled: 'badge-cancelled',
};

export default function DashboardPage() {
  const { user, loading: authLoading, updateUser } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  const [profile, setProfile] = useState({ name: '', phone: '', password: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, phone: user.phone || '', password: '' });
      api.get('/bookings').then(({ data }) => { setBookings(data); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { name: profile.name, phone: profile.phone };
      if (profile.password) payload.password = profile.password;
      const { data } = await api.put('/auth/profile', payload);
      updateUser(data);
      toast.success('Profile updated successfully!');
      setProfile(p => ({ ...p, password: '' }));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="spinner" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="relative pt-36 pb-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl shadow-gold/20 flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-gray-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-1">Welcome Back</p>
                <h1 className="text-3xl sm:text-5xl font-black text-white">{user.name}</h1>
                <p className="text-gray-300 text-sm mt-2 opacity-80">{user.email}</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              {[
                { label: 'Total', value: bookings.length, icon: Calendar },
                { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length, icon: Clock },
                { label: 'Approved', value: bookings.filter(b => b.status === 'Approved').length, icon: CheckCircle },
                { label: 'Completed', value: bookings.filter(b => b.status === 'Completed').length, icon: CheckCircle },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-[1.5rem] p-4 sm:p-5 flex flex-col items-center justify-center text-center min-w-[100px] backdrop-blur-md border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2 sm:mb-3 opacity-80" style={{ color: 'var(--gold)' }} />
                  <p className="text-2xl sm:text-3xl font-black text-white leading-none mb-1">{value}</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-4 custom-scrollbar">
          {[{ key: 'bookings', label: 'My Bookings', icon: Calendar }, { key: 'profile', label: 'Edit Profile', icon: User }].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === key ? 'shadow-xl scale-105' : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 shadow-sm border border-gray-100'}`}
              style={activeTab === key ? { background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#fff', border: 'transparent' } : {}}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32 rounded-[2rem]" />)}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 shadow-sm max-w-3xl mx-auto">
                <Calendar className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <p className="text-gray-500 text-2xl font-black mb-2">No bookings yet</p>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">You haven't scheduled any appointments yet. Treat yourself to a relaxing spa session today.</p>
                <Link href="/booking" className="btn btn-gold btn-xl shadow-lg hover:scale-105 transition-transform">Book Your First Session ✦</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bookings.map((b) => (
                  <div key={b._id} className="spa-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-[2rem] border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white group">
                    <div className="flex items-start sm:items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-black text-xl mb-1 group-hover:text-[var(--gold)] transition-colors duration-300" style={{ color: 'var(--dark)' }}>{b.serviceName}</p>
                        <p className="text-gray-600 font-medium">{b.date} at {b.time}</p>
                        <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-bold">Booked on {new Date(b.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-t-0">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${statusClass[b.status]}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl animate-fade-in">
            <div className="spa-card p-8 sm:p-12 rounded-[2rem] border border-gray-100 bg-white shadow-lg">
              <h3 className="text-2xl font-black mb-8" style={{ color: 'var(--dark)' }}>Profile Settings</h3>
              <form onSubmit={saveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Full Name</label>
                    <input className="spa-input !py-3.5 !rounded-xl" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Phone Number</label>
                    <input className="spa-input !py-3.5 !rounded-xl" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Email Address <span className="text-gray-400 font-normal lowercase tracking-normal bg-gray-100 px-2 py-0.5 rounded ml-2">Read-only</span></label>
                  <input className="spa-input !py-3.5 !rounded-xl bg-gray-50 cursor-not-allowed opacity-70" value={user.email} readOnly />
                </div>
                
                <div className="pt-4 border-t border-gray-100 mt-6">
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Change Password</label>
                  <input type="password" className="spa-input !py-3.5 !rounded-xl" value={profile.password} onChange={e => setProfile({ ...profile, password: e.target.value })} placeholder="•••••••• (leave blank to keep current)" />
                </div>
                
                <div className="pt-8">
                  <button type="submit" disabled={saving} className="btn btn-gold btn-xl w-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                    {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
