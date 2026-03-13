'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Calendar, Users, Star, Scissors, TrendingUp, Clock, CheckCircle, Image } from 'lucide-react';

interface Stats {
  totalBookings: number;
  totalUsers: number;
  totalReviews: number;
  totalServices: number;
  recentBookings: any[];
}

const statusClass: Record<string, string> = { 
  Pending: 'bg-amber-100 text-amber-800 border-amber-200', 
  Approved: 'bg-blue-100 text-blue-800 border-blue-200', 
  Completed: 'bg-green-100 text-green-800 border-green-200', 
  Cancelled: 'bg-red-100 text-red-800 border-red-200' 
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/stats').then(({ data }) => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: '#c9a96e' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: '#7b9e87' },
    { label: 'Total Reviews', value: stats.totalReviews, icon: Star, color: '#e8b4b8' },
    { label: 'Total Services', value: stats.totalServices, icon: Scissors, color: '#8b5e52' },
  ] : [];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>
            Admin <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Welcome back! Here's what's happening at Serenity Spa.</p>
        </div>
        <div className="text-sm font-bold text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 w-max">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-36 rounded-[2rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="spa-card p-6 rounded-[2rem] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500" style={{ background: color }} />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: `${color}15` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <p className="text-4xl font-black mb-1 relative z-10" style={{ color: 'var(--dark)' }}>{value}</p>
              <p className="text-gray-500 text-sm font-bold tracking-wide relative z-10">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
        {[
          { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
          { href: '/admin/services', label: 'Services', icon: Scissors },
          { href: '/admin/gallery', label: 'Gallery', icon: Image },
          { href: '/admin/reviews', label: 'Reviews', icon: Star },
          { href: '/admin/users', label: 'Users', icon: Users },
          { href: '/booking', label: 'Live Site ↗', icon: CheckCircle },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="spa-card p-5 rounded-[1.5rem] flex flex-col items-center justify-center gap-3 bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
              <Icon className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            </div>
            <span className="font-bold text-sm text-center" style={{ color: 'var(--dark)' }}>{label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      {stats?.recentBookings && stats.recentBookings.length > 0 && (
        <div className="spa-card p-0 rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--dark)' }}>Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-bold hover:underline" style={{ color: 'var(--gold)' }}>View All →</Link>
          </div>
          <div className="overflow-x-auto p-2">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  {['Customer', 'Service', 'Date & Time', 'Status'].map((h) => (
                    <th key={h} className="pb-4 pt-4 px-6 font-bold text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentBookings.map((b: any) => (
                  <tr key={b._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-6">
                      <p className="font-black text-base" style={{ color: 'var(--dark)' }}>{b.name}</p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-600">{b.serviceName}</td>
                    <td className="py-4 px-6 text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">{b.date}</span>
                        <span className="text-xs">{b.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black border tracking-wide uppercase ${statusClass[b.status]}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
