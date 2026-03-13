import { CheckCircle, Heart, Leaf, Users, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Serenity Spa',
  description: 'Learn about Serenity Spa — our story, our mission, and our team of expert therapists.',
};

const team = [
  { name: 'Dr. Amara Johnson', role: 'Lead Therapist & Founder', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', specialty: 'Swedish & Deep Tissue Massage' },
  { name: 'Mei Lin', role: 'Senior Esthetician', img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400', specialty: 'Advanced Facial Treatments' },
  { name: 'Sophia Rossi', role: 'Body Treatment Specialist', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', specialty: 'Aromatherapy & Body Wraps' },
  { name: 'Kenji Tanaka', role: 'Hot Stone & Sports Therapist', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', specialty: 'Hot Stone & Sports Massage' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_top]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pt-16">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-8 animate-fade-in"
            style={{ background: 'rgba(201,169,110,.18)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,.35)', backdropFilter: 'blur(8px)' }}
          >
            <Leaf className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-up">
            About <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-light)]" style={{ WebkitTextFillColor: 'initial' }}>Serenity Spa</span>
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-up delay-100 opacity-90">
            A decade of crafting unforgettable wellness journeys for thousands of guests who seek peace, beauty, and restored vitality.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container-spa">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {[
              ['10+', 'Years of Excellence'],
              ['500+', 'Happy Clients Monthly'],
              ['15+', 'Expert Therapists'],
              ['50+', 'Signature Treatments']
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center text-center group">
                <div className="text-4xl sm:text-5xl font-black transition-transform group-hover:scale-110" style={{ color: 'var(--gold)' }}>{num}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-3 font-bold uppercase tracking-[0.2em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container-spa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80" alt="Spa" className="w-full h-56 sm:h-72 object-cover rounded-[2rem] shadow-lg" />
                <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=500&q=80" alt="Facial" className="w-full h-56 sm:h-72 object-cover rounded-[2rem] shadow-lg mt-8 sm:mt-12" />
                <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&q=80" alt="Hot Stone" className="w-full h-56 sm:h-72 object-cover rounded-[2rem] shadow-lg -mt-8 sm:-mt-12" />
                <img src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&q=80" alt="Relaxation" className="w-full h-56 sm:h-72 object-cover rounded-[2rem] shadow-lg" />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="section-label">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight" style={{ color: 'var(--dark)' }}>
                Healing Through the <br/><span className="gradient-text">Art of Touch</span>
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed text-lg">
                Serenity Spa was founded in 2014 by Dr. Amara Johnson with a simple yet powerful vision: to create a sanctuary where every guest can escape the demands of daily life and reconnect with their inner peace.
              </p>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                We blend ancient wellness traditions with modern therapeutic techniques, using only certified organic products to ensure your safety and the highest quality of care.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { Icon: Heart, label: 'Holistic Care' },
                  { Icon: Leaf, label: 'Organic Products' },
                  { Icon: Users, label: 'Expert Team' }
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-3 p-6 rounded-[1.5rem] bg-white shadow-sm border border-gray-50 hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm" style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-sm text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-white">
        <div className="container-spa">
          <div className="section-header">
            <span className="section-label">Meet Our Experts</span>
            <h2>Our <span className="gradient-text">Therapists</span></h2>
            <div className="divider-gold" />
            <p className="mt-4">Certified professionals dedicated to your wellness journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="spa-card group overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white border border-gray-100 rounded-[2rem]">
                <div className="relative h-72 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 text-center flex flex-col flex-1 relative z-10 bg-white">
                  <h3 className="text-xl font-black mb-1 group-hover:text-[var(--gold)] transition-colors duration-300" style={{ color: 'var(--dark)' }}>{member.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>{member.role}</p>
                  <p className="text-gray-500 text-sm mt-auto border-t border-gray-100 pt-4">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Ready to Begin Your Journey?</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2 mb-6">
            Your Perfect Escape Awaits
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-lg mx-auto">
            Let our expert therapists guide you toward total wellness and rejuvenation.
          </p>
          <Link href="/booking" className="btn btn-gold btn-xl shadow-2xl scale-105 hover:scale-110 transition-transform">
            Book Your Appointment ✦
          </Link>
        </div>
      </section>
    </div>
  );
}
