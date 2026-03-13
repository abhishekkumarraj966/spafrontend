import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f8f5f0] rounded-full blur-[80px] translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6" style={{ color: 'var(--dark)' }}>
            Terms of <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Service</span>
          </h1>
          <p className="text-gray-500 font-bold tracking-wide uppercase text-sm">Last Updated: March 2026</p>
        </div>

        <div className="spa-card p-8 sm:p-12 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-[4rem] -z-0" />
          
          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using Serenity Spa&apos;s services, website, and booking platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>2. Appointments & Cancellations</h2>
            <p className="text-gray-600 leading-relaxed">
              We highly recommend booking appointments in advance to secure your preferred time. If you need to cancel or reschedule, we kindly request a minimum of 24 hours&apos; notice. Failure to do so may incur a cancellation fee.
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>3. Spa Etiquette</h2>
            <p className="text-gray-600 leading-relaxed">
              To ensure a peaceful environment for all guests, we ask that you arrive to your appointment on time and keep mobile devices on silent. We reserve the right to refuse service to anyone demonstrating inappropriate behavior.
            </p>
          </section>

          <section className="relative z-10">
            <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--dark)' }}>4. Pricing & Payments</h2>
            <p className="text-gray-600 leading-relaxed">
              All prices are subject to change without prior notice. Payment is due at the time of service. We accept major credit cards, cash, and spa gift certificates.
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
