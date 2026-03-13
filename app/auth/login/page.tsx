'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Leaf, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (user) router.push(user.role === 'admin' ? '/admin' : '/dashboard');
  }, [user]);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🌿');
      router.push(email === 'admin@spa.com' ? '/admin' : '/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 40%, var(--brown) 100%)' }}
    >
      <div className="w-full" style={{ maxWidth: 440 }}>

        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}
          >
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your Serenity Spa account</p>
        </div>

        {/* Card */}
        <div className="glass-card p-7 sm:p-9">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label style={{ color: 'rgba(255,255,255,.8)' }}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="spa-input mt-1"
                style={{ background: 'rgba(255,255,255,.1)', color: 'white', borderColor: 'rgba(255,255,255,.2)' }}
              />
            </div>

            <div>
              <label style={{ color: 'rgba(255,255,255,.8)' }}>Password</label>
              <div className="relative mt-1">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="spa-input pr-12"
                  style={{ background: 'rgba(255,255,255,.1)', color: 'white', borderColor: 'rgba(255,255,255,.2)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,.5)' }}
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? 'Signing in…' : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          {/* Demo hint */}
          <div
            className="mt-5 p-4 rounded-xl text-xs leading-relaxed"
            style={{ background: 'rgba(201,169,110,.12)', color: 'var(--gold)' }}
          >
            <p className="font-bold mb-1">Demo Credentials</p>
            <p>Admin: <code className="opacity-80">admin@spa.com</code> / <code className="opacity-80">Admin@1234</code></p>
            <p className="mt-0.5">User: Register a new account below ↓</p>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: 'rgba(255,255,255,.55)' }}>
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-bold transition-colors hover:underline" style={{ color: 'var(--gold)' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
