'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = ['All', 'Massage', 'Facial', 'Body Treatment', 'Hair', 'Nail Care', 'Other'];

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search)            params.append('search', search);
    if (category !== 'All') params.append('category', category);
    api.get(`/services?${params}`)
      .then(({ data }) => setServices(data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_30%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pt-20">
          <span className="section-label" style={{ color: 'var(--gold)' }}>What We Offer</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 animate-fade-up">
            Our <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-light)]" style={{ WebkitTextFillColor: 'initial' }}>Services</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100 opacity-90">
            Indulge in our carefully curated selection of spa services designed for total rejuvenation.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-spa max-w-6xl mx-auto">
          {/* Search + Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center">
            <div className="relative w-full lg:w-96 flex-shrink-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services…"
                className="spa-input !pl-14 !py-3.5 !rounded-full shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="btn btn-sm !rounded-full transition-all duration-300 shadow-sm"
                  style={
                    category === cat
                      ? { background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))', color: '#fff', border: '2px solid transparent' }
                      : { background: '#fff', color: 'var(--text-muted)', border: '2px solid var(--border)' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-[420px] rounded-[2rem]" />)}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[2rem] border border-gray-100 shadow-sm mx-auto max-w-3xl">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl font-bold">No services found.</p>
              <p className="text-gray-400 mt-2">Try a different search term or category.</p>
              <button onClick={() => {setSearch(''); setCategory('All');}} className="btn btn-outline-gold mt-6 !rounded-full">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((s) => (
                <article key={s._id} className="spa-card group overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white border border-gray-100 rounded-[2rem]">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={s.imageUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600'}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span
                      className="absolute top-5 right-5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md border border-white/20"
                      style={{ background: 'rgba(201,169,110,0.85)' }}
                    >
                      {s.category}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-black mb-3 group-hover:text-[var(--gold)] transition-colors duration-300" style={{ color: 'var(--dark)' }}>{s.name}</h3>
                    <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed flex-1">{s.description}</p>
                    <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price Starts</span>
                        <div className="price-tag !text-2xl">
                          <span className="currency">$</span>
                          <span className="amount">{s.price}</span>
                          <span className="duration !text-xs !text-gray-400"> / {s.duration}</span>
                        </div>
                      </div>
                      <Link 
                        href={`/booking?service=${encodeURIComponent(s.name)}`} 
                        className="btn btn-gold btn-sm px-6 py-3 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all font-bold group-hover:scale-105"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
