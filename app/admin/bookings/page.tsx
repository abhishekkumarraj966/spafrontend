'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  notes?: string;
}

const statusClass: Record<string, string> = { 
  Pending: 'bg-amber-100 text-amber-800 border-amber-200', 
  Approved: 'bg-blue-100 text-blue-800 border-blue-200', 
  Completed: 'bg-green-100 text-green-800 border-green-200', 
  Cancelled: 'bg-red-100 text-red-800 border-red-200' 
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.get('/bookings').then(({ data }) => { setBookings(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await api.put(`/bookings/${id}`, { status });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: data.status } : b));
      toast.success(`Booking ${status}!`);
    } catch { toast.error('Failed to update booking'); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
      toast.success('Booking deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>Booking <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Management</span></h1>
          <p className="text-gray-500 mt-2 text-lg">Manage and update all customer bookings.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {['All', 'Pending', 'Approved', 'Completed', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${filter === f ? 'text-white shadow-md hover:-translate-y-0.5' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:-translate-y-0.5'}`}
            style={filter === f ? { background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' } : {}}>
            {f} <span className="opacity-80 ml-1">{f !== 'All' ? `(${bookings.filter(b => b.status === f).length})` : `(${bookings.length})`}</span>
          </button>
        ))}
      </div>

      <div className="spa-card p-0 overflow-hidden bg-white border border-gray-100 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        {loading ? (
          <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center">
            <Clock className="w-12 h-12 mb-4 text-gray-300" />
            <p className="font-bold text-lg">No bookings found for "{filter}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto p-2">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  {['Customer', 'Service', 'Date & Time', 'Phone', 'Status', 'Actions'].map(h => (
                    <th key={h} className="pb-4 pt-4 px-6 font-bold text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-black text-base" style={{ color: 'var(--dark)' }}>{b.name}</p>
                      <p className="text-gray-400 text-xs font-semibold">{b.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{b.serviceName}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-700">{b.date}</p>
                      <p className="text-gray-400 text-xs">{b.time}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-500">{b.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black border tracking-wide uppercase ${statusClass[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {b.status === 'Pending' && (
                          <button onClick={() => updateStatus(b._id, 'Approved')} className="p-2 rounded-xl text-green-600 hover:bg-green-50 transition-colors border border-transparent hover:border-green-100 shadow-sm hover:shadow" title="Approve">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {b.status === 'Approved' && (
                          <button onClick={() => updateStatus(b._id, 'Completed')} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 shadow-sm hover:shadow" title="Mark Complete">
                            <Clock className="w-5 h-5" />
                          </button>
                        )}
                        {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                          <button onClick={() => updateStatus(b._id, 'Cancelled')} className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100 shadow-sm hover:shadow" title="Cancel">
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button onClick={() => deleteBooking(b._id)} className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors border border-transparent shadow-sm hover:shadow ml-2" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
