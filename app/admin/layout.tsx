'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Calendar, Scissors, Image, Star, Users, LogOut, Leaf, ChevronRight, Menu, X } from 'lucide-react';

const adminLinks = [
  { href: '/admin',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/bookings',  label: 'Bookings',   icon: Calendar },
  { href: '/admin/services',  label: 'Services',   icon: Scissors },
  { href: '/admin/gallery',   label: 'Gallery',    icon: Image },
  { href: '/admin/reviews',   label: 'Reviews',    icon: Star },
  { href: '/admin/users',     label: 'Users',      icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) router.push('/auth/login');
  }, [user, loading]);

  /* close sidebar on route change (mobile) */
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
      <div className="spinner" />
    </div>
  );
  if (!user || user.role !== 'admin') return null;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[1rem] flex items-center justify-center shadow-lg group-hover:shadow-gold/20 transition-all duration-300" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-xl tracking-wide">Serenity<span style={{ color: 'var(--gold)' }}>Admin</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Admin info */}
        <div className="mt-8 p-4 rounded-[1.5rem] flex flex-col relative overflow-hidden" style={{ background: 'rgba(201,169,110,.08)' }}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full" />
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Logged in as</p>
          <p className="text-white font-black text-base truncate">{user.name}</p>
          <p className="text-xs font-bold mt-1" style={{ color: 'var(--gold)' }}>Administrator</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {adminLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 px-4 py-3.5 rounded-[1rem] text-sm font-bold transition-all duration-300 group"
              style={{
                background: active ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'transparent',
                color: active ? 'white' : 'rgba(255,255,255,.55)',
                boxShadow: active ? '0 10px 20px -10px rgba(201,169,110,0.4)' : 'none'
              }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.03)'; (e.currentTarget as HTMLElement).style.color = 'white'; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.55)'; } }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{label}</span>
              {active && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-white/5">
        <button
          onClick={() => { logout(); router.push('/'); }}
          className="flex items-center gap-4 w-full px-4 py-3.5 rounded-[1rem] text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col border-r border-white/5 shadow-2xl"
        style={{
          width: 280,
          background: 'var(--dark)',
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          zIndex: 40,
          overflowY: 'auto',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(5px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col md:hidden transition-transform duration-400 ease-out border-r border-white/5 shadow-2xl"
        style={{
          width: 280,
          background: 'var(--dark)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          overflowY: 'auto',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-[280px]">
        {/* Top bar for mobile */}
        <div
          className="md:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
        >
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors" style={{ color: 'var(--dark)' }}>
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-black text-lg tracking-wide" style={{ color: 'var(--dark)' }}>Serenity<span style={{ color: 'var(--gold)' }}>Admin</span></span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shadow-md" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* content area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 w-full overflow-x-hidden">
          <div className="mx-auto" style={{ maxWidth: 1200 }}>
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
