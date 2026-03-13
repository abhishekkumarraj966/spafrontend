import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white' }}>
      <div className="container-spa" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}>
                <Leaf className="w-5.5 h-5.5 text-white" />
              </div>
              <span className="text-2xl font-bold">Serenity<span style={{ color: 'var(--gold)' }}> Spa</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              Your sanctuary of wellness and beauty. Experience luxury treatments crafted to revitalize your body and soul.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                  style={{ background: 'rgba(201,169,110,.15)', color: 'var(--gold)' }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-7" style={{ color: 'var(--gold)' }}>Quick Links</h4>
            <ul className="space-y-4">
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/services', 'Services'],
                ['/gallery', 'Gallery'],
                ['/booking', 'Book Appointment'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm inline-flex items-center gap-2 group">
                    <span className="w-5 h-px bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-7" style={{ color: 'var(--gold)' }}>Services</h4>
            <ul className="space-y-4">
              {['Swedish Massage', 'Deep Tissue Massage', 'Hydrating Facial', 'Body Scrub & Wrap', 'Hot Stone Therapy', 'Nail Care'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-7" style={{ color: 'var(--gold)' }}>Contact Us</h4>
            <ul className="space-y-5">
              {[
                { Icon: MapPin, text: 'Tarabari Araria Bihar 854313' },
                { Icon: Phone, text: '+916207368893' },
                { Icon: Mail,  text: 'support@serenityspa.com' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-4 text-sm text-gray-400">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 rounded-xl text-sm" style={{ background: 'rgba(201,169,110,.1)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--gold)' }}>Opening Hours</p>
              <p className="text-gray-400">Mon – Sat: 9AM – 8PM</p>
              <p className="text-gray-400">Sunday: 10AM – 6PM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Serenity Spa. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors font-semibold">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors font-semibold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
