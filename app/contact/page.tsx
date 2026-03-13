'use client';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_top]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pt-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-6 animate-fade-in"
            style={{ background: 'rgba(201,169,110,.18)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,.35)', backdropFilter: 'blur(8px)' }}
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 animate-fade-up">
            Contact <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-light)]" style={{ WebkitTextFillColor: 'initial' }}>Us</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100 opacity-90">
            We'd love to hear from you. Reach out with any questions or to schedule a consultation.
          </p>
        </div>
      </section>

      <section className="section-pad relative z-20 -mt-16 sm:-mt-24">
        <div className="container-spa max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
            {/* Info */}
            <div className="animate-fade-up">
              <h2 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: 'var(--dark)' }}>We're Here for <span style={{ color: 'var(--gold)' }}>You</span></h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">Have questions about our services, want to make a group booking, or simply want to say hello? Reach out — our team is always happy to assist you.</p>
              
              <div className="space-y-6">
                {[
                  { Icon: MapPin, title: 'Our Location', detail: 'Tarabari Araria Bihar 854313' },
                  { Icon: Phone, title: 'Phone', detail: '+916207368893' },
                  { Icon: Mail, title: 'Email', detail: 'support@serenityspa.com' },
                  { Icon: Clock, title: 'Opening Hours', detail: 'Mon–Sat: 9AM–8PM\nSunday: 10AM–6PM' },
                ].map(({ Icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-5 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-lg mb-1" style={{ color: 'var(--dark)' }}>{title}</p>
                      <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map */}
              <div className="mt-8 rounded-[2rem] overflow-hidden h-64 bg-gray-200 flex items-center justify-center border border-gray-100 shadow-sm">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98823492426502!3d40.74844097138941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </div>
            
            {/* Form */}
            <div className="animate-fade-up delay-100">
              <div className="spa-card p-8 sm:p-12 rounded-[2rem] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 h-full">
                <h3 className="text-2xl sm:text-3xl font-black mb-8 pb-4 border-b border-gray-100" style={{ color: 'var(--dark)' }}>Send Us a Message</h3>
                <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">First Name</label>
                      <input type="text" required className="spa-input !py-4 !rounded-xl" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Last Name</label>
                      <input type="text" required className="spa-input !py-4 !rounded-xl" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Email Address</label>
                    <input type="email" required className="spa-input !py-4 !rounded-xl" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Subject</label>
                    <input type="text" required className="spa-input !py-4 !rounded-xl" placeholder="Booking inquiry, feedback, etc." />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-gray-500">Message</label>
                    <textarea required className="spa-input !py-4 !rounded-xl" rows={6} placeholder="Write your message here..." />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="btn btn-gold w-full btn-xl shadow-2xl hover:shadow-[0_20px_40px_rgba(201,169,110,0.3)] transition-all font-black text-lg hover:-translate-y-1">Send Message ✦</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
