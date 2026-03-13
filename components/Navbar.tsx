'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Leaf, LogOut, LayoutDashboard, Shield, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/reviews',  label: 'Reviews' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();

  /* close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isTransparent = !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
      >
        <div className="container-spa">
          <div className="flex items-center justify-between" style={{ height: '70px' }}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-xl font-bold"
                style={{ color: isTransparent ? 'white' : 'var(--dark)' }}
              >
                Serenity<span style={{ color: 'var(--gold)' }}> Spa</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      active ? 'after:content-[""] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-[var(--gold)]' : ''
                    }`}
                    style={{
                      color: active
                        ? 'var(--gold)'
                        : isTransparent
                        ? 'rgba(255,255,255,.88)'
                        : 'var(--text-main)',
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="btn btn-sm" style={{ background: 'rgba(201,169,110,.15)', color: 'var(--gold)' }}>
                      <Shield className="w-4 h-4" /> Admin
                    </Link>
                  )}
                  <Link href="/dashboard" className="btn btn-sm btn-outline-gold">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button onClick={logout} className="btn btn-sm btn-dark flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    style={{ color: isTransparent ? 'rgba(255,255,255,.88)' : 'var(--text-main)' }}
                  >
                    Login
                  </Link>
                  <Link href="/booking" className="btn btn-sm btn-gold px-6">
                    Book Now ✦
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-colors"
              style={{
                color: isTransparent ? 'white' : 'var(--dark)',
                background: menuOpen ? 'var(--cream-dark)' : 'transparent',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col lg:hidden transition-all duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '100%', background: '#fff' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: 'var(--gold)' }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--dark)' }}>
              Serenity <span style={{ color: 'var(--gold)' }}>Spa</span>
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all border border-transparent"
                  style={{
                    background: active ? 'rgba(201,169,110,.08)' : 'transparent',
                    color: active ? 'var(--gold)' : 'var(--dark)',
                    borderColor: active ? 'rgba(201,169,110,0.15)' : 'transparent',
                  }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-[var(--gold)] transition-transform ${active ? 'scale-100' : 'scale-0'}`} />
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="pt-8 space-y-4 border-t border-gray-100 mt-8">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link href="/admin" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold" style={{ background: 'rgba(201,169,110,.1)', color: 'var(--gold)' }}>
                    <Shield className="w-6 h-6" /> Admin Panel
                  </Link>
                )}
                <Link href="/dashboard" className="flex items-center gap-4 px-6 py-4  rounded-2xl text-base font-bold bg-gray-50 text-gray-700">
                  <LayoutDashboard className="w-6 h-6" /> My Dashboard
                </Link>
                <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold text-red-500 hover:bg-red-50 transition-colors border border-red-100">
                  <LogOut className="w-6 h-6" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/auth/login" className="block px-6 py-4 rounded-2xl text-center text-base font-bold bg-gray-50 text-gray-700">
                  Login
                </Link>
                <Link href="/auth/register" className="block px-6 py-4 rounded-2xl text-center text-base font-bold text-white shadow-md shadow-gold/20" style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}>
                  Register Account
                </Link>
                <Link href="/booking" className="block px-6 py-4 rounded-2xl text-center text-base font-bold text-white shadow-lg" style={{ background: 'var(--dark)' }}>
                  Book Appointment ✦
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* User info at bottom */}
        {user && (
          <div className="p-6 bg-gray-50/50 border-t border-gray-100">
            <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-sm" style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}>
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold truncate" style={{ color: 'var(--dark)' }}>{user.name}</p>
                <p className="text-xs font-medium truncate text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
