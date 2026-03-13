'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Star, ChevronRight, Award, Heart, Sparkles, Clock, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import api from '@/lib/api';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
}

const FALLBACK_REVIEWS = [
  { _id: 'r1', name: 'Emily R.', rating: 5, comment: 'Absolutely divine experience! The Swedish massage left me feeling completely renewed. The therapists are so skilled and attentive.' },
  { _id: 'r2', name: 'Sarah M.', rating: 5, comment: 'The best facial I\'ve ever had! My skin looks radiant and the atmosphere was so calming. I\'ll definitely be back.' },
  { _id: 'r3', name: 'Jessica L.', rating: 5, comment: 'Visited for the hot stone therapy and it was phenomenal. Every detail was perfect. Serenity Spa truly lives up to its name.' },
];

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get('/services'),
      api.get('/reviews'),
    ]).then(([sRes, rRes]) => {
      if (sRes.status === 'fulfilled') setServices(sRes.value.data.slice(0, 6));
      if (rRes.status === 'fulfilled' && rRes.value.data.length > 0) setReviews(rRes.value.data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 flex flex-col items-center text-center px-2 w-full gap-6 p-2" style={{ maxWidth: 860, margin: '0 auto' }}>
          <div
            className="inline-flex items-center mt-20 gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-2 animate-fade-in"
            style={{ background: 'rgba(201,169,110,.18)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,.35)' }}
          >
            <Sparkles className="w-4 h-4" />
            Welcome to Luxury Wellness
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-0 animate-fade-up">
            Your Sanctuary of<br />
            <span style={{ color: 'var(--gold)' }}>Peace & Beauty</span>
          </h1>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-2 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100 p-2">
            Escape the ordinary. Experience world-class spa treatments crafted to rejuvenate your mind, body, and soul.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-up delay-200 mt-2">
            <Link href="/booking" className="btn btn-gold btn-xl shadow-lg">
              Book Appointment ✦
            </Link>
            <Link href="/services" className="btn btn-outline-gold btn-xl">
              Explore Services
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2  sm:grid-cols-4 gap-8 sm:gap-16  animate-fade-up delay-300 w-full">
            {[
              ['500+', 'Happy Clients'],
              ['15+', 'Expert Therapists'],
              ['50+', 'Treatments'],
              ['10+', 'Years Experience'],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold" style={{ color: 'var(--gold)' }}>{num}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </button>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className="section-pad bg-white ">
        <div className="container-spa">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>The <span className="gradient-text">Serenity</span> Difference</h2>
            <div className="divider-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 ">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Only the finest organic products and expert therapists for your ultimate comfort and wellbeing.' },
              { icon: Heart, title: 'Personalized Care', desc: 'Every treatment is tailored to your unique needs, skin type, and personal wellness goals.' },
              { icon: Clock, title: 'Flexible Booking', desc: 'Simple online booking with flexible time slots that fit even the busiest schedules.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group text-center p-10  rounded-3xl transition-all hover:-translate-y-2 hover:shadow-xl"
                style={{ background: 'var(--cream)' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--dark)' }}>{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-spa gap-4">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2>Our Signature <span className="gradient-text">Treatments</span></h2>
            <div className="divider-gold" />
            <p className="mt-4">Indulge in our carefully curated selection of spa services designed for total rejuvenation.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-80 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s) => (
                <article key={s._id} className="spa-card group">
                  <div className="relative img-zoom h-56 overflow-hidden ">
                    <img
                      src={s.imageUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600'}
                      alt={s.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                      style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}
                    >
                      {s.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark)' }}>{s.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{s.description}</p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="price-tag">
                        <span className="currency">$</span>
                        <span className="amount">{s.price}</span>
                        <span className="duration">· {s.duration}</span>
                      </div>
                      <Link href={`/booking?service=${encodeURIComponent(s.name)}`} className="btn btn-gold btn-sm px-5">Book Now</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-outline-gold btn-lg">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ───────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-spa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80" alt="Spa" className="w-full h-52 sm:h-64 object-cover rounded-2xl" />
                <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=500&q=80" alt="Facial" className="w-full h-52 sm:h-64 object-cover rounded-2xl mt-6" />
              </div>
              <div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-4 sm:p-5 rounded-2xl text-white shadow-xl hidden sm:block"
                style={{ background: 'var(--gold)' }}
              >
                <p className="text-3xl sm:text-4xl font-extrabold">10+</p>
                <p className="text-sm text-white/90">Years of Excellence</p>
              </div>
            </div>

            {/* Content side */}
            <div className="order-1 lg:order-2">
              <span className="section-label">About Serenity Spa</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight" style={{ color: 'var(--dark)' }}>
                A Haven of Peace<br />and Wellness
              </h2>
              <p className="text-gray-500 mb-5 leading-relaxed text-lg">
                Founded in 2014, Serenity Spa has been dedicated to providing an unparalleled wellness experience. Our expert therapists use the finest organic products.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We believe in holistic wellbeing — nurturing not just the body, but the mind and spirit. Each visit is a personalized journey designed exclusively for you.
              </p>
              <ul className="space-y-4 mb-10">
                {['Certified Expert Therapists', 'Premium Organic Products', 'Tranquil Private Suites', 'Customized Treatment Plans'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-gray-600 font-medium">
                    <CheckCircle className="w-5.5 h-5.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn btn-gold btn-lg shadow-lg">Discover Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-spa">
          <div className="section-header">
            <span className="section-label">What Clients Say</span>
            <h2>Loved by <span className="gradient-text">Thousands</span></h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {reviews.map((r) => (
              <div key={r._id} className="spa-card p-4 sm:p-6 flex flex-col">
                <div className="flex mb-2 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'star-filled' : 'star-empty'}`} />
                  ))}
                </div>
                <p className="text-gray-600 italic text-base leading-relaxed flex-1">"{r.comment}"</p>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,var(--gold),var(--brown))' }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-base" style={{ color: 'var(--dark)' }}>{r.name}</p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Verified Guest</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/reviews" className="btn btn-outline-gold btn-lg">
              Read More Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center text-white px-4">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Ready to Relax?</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2 mb-4">
            Your Perfect Escape Awaits
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto text-center">
            Book your appointment today and begin a journey to total relaxation and renewal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn btn-gold btn-xl">
              Book Now — It's Free ✦
            </Link>
            <a href="tel:+916207368893" className="btn btn-outline-gold btn-xl">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
