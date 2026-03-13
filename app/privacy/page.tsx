import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f8f5f0] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6" style={{ color: 'var(--dark)' }}>
            Privacy <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Policy</span>
          </h1>
          <p className="text-gray-500 font-bold tracking-wide uppercase text-sm">Last Updated: March 2026</p>
        </div>

        <div className="spa-card p-8 sm:p-12 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-[4rem] -z-0" />
          
          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us, including when you create an account, book an appointment, fill out a form, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
            </p>
          </section>
          
          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
              <li>Provide, maintain, and improve our services.</li>
              <li>Process your appointments and bookings.</li>
              <li>Communicate with you about products, services, offers, and events.</li>
              <li>Protect against, identify, and prevent fraud and other illegal activities.</li>
            </ul>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>3. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not share your personal information with third parties except as necessary to provide our services (such as with payment processors) or when required by law.
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>4. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@serenityspa.com" className="font-bold underline text-amber-600 hover:text-amber-700">support@serenityspa.com</a>.
            </p>
          </section>
          
          <div className="pt-8 border-t border-gray-100 text-center relative z-10">
            <Link href="/" className="btn btn-outline-gold inline-flex !font-bold">Return Home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
