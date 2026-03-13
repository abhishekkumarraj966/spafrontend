'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Star, Send } from 'lucide-react';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/reviews').then(({ data }) => { setReviews(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to submit a review'); return; }
    setSubmitting(true);
    try {
      await api.post('/reviews', { rating, comment });
      toast.success('Review submitted! It will appear after admin approval.');
      setComment(''); setRating(5);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_10%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pt-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-6 animate-fade-in"
            style={{ background: 'rgba(201,169,110,.18)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,.35)', backdropFilter: 'blur(8px)' }}
          >
            <Star className="w-4 h-4 fill-current" />
            Client Testimonials
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 animate-fade-up">
            Our <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-light)]" style={{ WebkitTextFillColor: 'initial' }}>Reviews</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100 opacity-90">
            What our deeply cherished guests say about their transformative experiences.
          </p>
        </div>
      </section>

      <section className="section-pad z-20 relative -mt-16 sm:-mt-24">
        <div className="container-spa max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Review Form */}
            <div className="lg:col-span-1 animate-fade-up">
              <div className="spa-card p-8 sm:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.08)] sticky top-28">
                <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--dark)' }}>Share Your Experience</h3>
                <p className="text-gray-500 text-sm mb-8">Your feedback helps us continuously elevate our services.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-400">Your Rating *</label>
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button" 
                          onClick={() => setRating(star)} 
                          onMouseEnter={() => setHover(star)} 
                          onMouseLeave={() => setHover(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-10 h-10 transition-colors duration-300 ${
                              (hover || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-400">Your Review *</label>
                    <textarea 
                      required 
                      className="spa-input !py-4 !rounded-xl" 
                      rows={5} 
                      placeholder="Tell us about your relaxing session..." 
                      value={comment} 
                      onChange={e => setComment(e.target.value)} 
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={submitting || !user} 
                      className="btn btn-gold w-full btn-xl shadow-xl hover:shadow-[0_20px_40px_rgba(201,169,110,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-black"
                    >
                      <Send className="w-5 h-5" />
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                  {!user && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Please <a href="/auth/login" className="font-bold underline" style={{ color: 'var(--gold)' }}>login</a> to share your experience.
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="lg:col-span-2 animate-fade-up delay-100">
              {loading ? (
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-48 rounded-[2rem]" />)}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2rem] border border-gray-100 shadow-sm border-dashed">
                  <Star className="w-16 h-16 mx-auto mb-6 text-gray-200 fill-gray-100" />
                  <p className="text-gray-500 text-2xl font-black mb-2">No Approved Reviews Yet</p>
                  <p className="text-gray-400 max-w-sm mx-auto">Be the first to share your wonderful experience with our community!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((r) => (
                    <div key={r._id} className="spa-card p-8 sm:p-10 rounded-[2rem] bg-white border border-gray-100 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative group overflow-hidden">
                      {/* Decorative quote mark */}
                      <span className="absolute top-4 right-6 text-9xl font-serif text-gray-50 select-none group-hover:text-amber-50/50 transition-colors duration-500 z-0">"</span>
                      
                      <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl flex-shrink-0 shadow-lg shadow-gold/20" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                            <p className="font-black text-xl" style={{ color: 'var(--dark)' }}>{r.name}</p>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full w-max">
                              {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          
                          <div className="flex mb-5 gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100'}`} />
                            ))}
                          </div>
                          
                          <p className="text-gray-600 leading-relaxed text-lg" style={{ fontStyle: 'italic' }}>
                            "{r.comment}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
