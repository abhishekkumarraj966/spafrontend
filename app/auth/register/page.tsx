'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Leaf, Eye, EyeOff, ArrowRight } from 'lucide-react';

const fields = [
  { key: 'name',    label: 'Full Name',          type: 'text',     placeholder: 'Jane Doe',               required: true  },
  { key: 'email',   label: 'Email Address',       type: 'email',    placeholder: 'jane@email.com',          required: true  },
  { key: 'phone',   label: 'Phone (optional)',     type: 'tel',      placeholder: '+1 (555) 000-0000',       required: false },
];

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();
  const [form, setForm]     = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user]);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6)       { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      toast.success('Welcome to Serenity Spa! 🌿');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { background: 'rgba(255,255,255,.1)', color: 'white', borderColor: 'rgba(255,255,255,.2)' };
  const labelStyle = { color: 'rgba(255,255,255,.8)' };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 40%, var(--brown) 100%)' }}
    >
      <div className="w-full" style={{ maxWidth: 460 }}>
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))' }}>
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2 text-sm">Join the Serenity Spa community today</p>
        </div>

        <div className="glass-card p-7 sm:p-9">
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, type, placeholder, required }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={type}
                  required={required}
                  placeholder={placeholder}
                  value={(form as any)[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="spa-input mt-1"
                  style={inputStyle}
                />
              </div>
            ))}

            <div>
              <label style={labelStyle}>Password</label>
              <div className="relative mt-1">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="spa-input pr-12"
                  style={inputStyle}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,.5)' }}>
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" required placeholder="Re-enter password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} className="spa-input mt-1" style={inputStyle} />
            </div>

            <button type="submit" disabled={loading} className="btn btn-gold w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed" style={{ marginTop: '0.5rem' }}>
              {loading ? 'Creating Account…' : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'rgba(255,255,255,.55)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold hover:underline" style={{ color: 'var(--gold)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
