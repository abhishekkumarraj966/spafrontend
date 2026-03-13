'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Star, CheckCircle, Trash2, Clock, MessageSquareQuote } from 'lucide-react';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reviews').then(({ data }) => { setReviews(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const toggleApprove = async (id: string, current: boolean) => {
    try {
      const { data } = await api.put(`/reviews/${id}`, { approved: !current });
      setReviews(prev => prev.map(r => r._id === id ? { ...r, approved: data.approved } : r));
      toast.success(data.approved ? 'Review approved!' : 'Review hidden');
    } catch { toast.error('Failed to update review'); }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(prev => prev.filter(r => r._id !== id));
      toast.success('Review deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
            <MessageSquareQuote className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>Review <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Management</span></h1>
            <p className="text-gray-500 mt-1 font-bold">Moderate customer reviews before they appear publicly.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-48 rounded-[2rem]" />)}</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
          <MessageSquareQuote className="w-16 h-16 mx-auto mb-4 text-gray-200" />
          <p className="text-gray-400 font-bold text-lg">No reviews submitted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map(r => (
            <div key={r._id} className="spa-card p-6 sm:p-8 flex flex-col rounded-[2rem] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-[4rem] -z-0" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-inner" style={{ background: 'linear-gradient(135deg, var(--gold), #a87d4b)' }}>{r.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="font-black text-lg" style={{ color: 'var(--dark)' }}>{r.name}</p>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${r.approved ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                  {r.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              
              <div className="flex mb-4 relative z-10">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < r.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />)}</div>
              
              <p className="text-gray-600 italic text-base flex-1 mb-6 leading-relaxed relative z-10">"{r.comment}"</p>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 relative z-10 w-full">
                <button onClick={() => toggleApprove(r._id, r.approved)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-colors shadow-sm ${r.approved ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`} title={r.approved ? 'Hide Review' : 'Approve Review'}>
                  {r.approved ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  <span>{r.approved ? 'Hide' : 'Approve'}</span>
                </button>
                <button onClick={() => deleteReview(r._id)} className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 transition-colors shadow-sm font-bold" title="Delete">
                  <Trash2 className="w-5 h-5" /> <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
