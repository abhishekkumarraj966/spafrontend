'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Users as UsersIcon, Ban, Trash2, Check, Clock } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users').then(({ data }) => { setUsers(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const toggleBlock = async (id: string, current: boolean) => {
    try {
      const { data } = await api.put(`/users/${id}/block`, {});
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isBlocked: data.isBlocked } : u));
      toast.success(data.isBlocked ? 'User blocked' : 'User unblocked');
    } catch { toast.error('Failed to update user'); }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Permanently delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
            <UsersIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>User <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Management</span></h1>
            <p className="text-gray-500 mt-1 font-bold">{users.length} registered user{users.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="spa-card p-0 overflow-hidden bg-white border border-gray-100 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] mt-8">
        {loading ? (
          <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
        ) : users.length === 0 ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center">
            <UsersIcon className="w-12 h-12 mb-4 text-gray-300" />
            <p className="font-bold text-lg">No users registered yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto p-2">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  {['User', 'Email', 'Phone', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="pb-4 pt-4 px-6 font-bold text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-base font-black shadow-sm" style={{ background: u.isBlocked ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>{u.name.charAt(0).toUpperCase()}</div>
                        <span className="font-black text-base" style={{ color: 'var(--dark)' }}>{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 font-medium text-gray-500">{u.phone || '—'}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {u.isBlocked ? (
                        <span className="px-4 py-1.5 rounded-full text-xs font-black border tracking-wide uppercase bg-red-100 text-red-800 border-red-200">Blocked</span>
                      ) : (
                        <span className="px-4 py-1.5 rounded-full text-xs font-black border tracking-wide uppercase bg-green-100 text-green-800 border-green-200">Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => toggleBlock(u._id, u.isBlocked)}
                          className={`p-2 rounded-xl border border-transparent transition-colors shadow-sm hover:shadow ${u.isBlocked ? 'text-green-600 hover:bg-green-50 hover:border-green-100' : 'text-amber-500 hover:bg-amber-50 hover:border-amber-100'}`}
                          title={u.isBlocked ? 'Unblock User' : 'Block User'}>
                          {u.isBlocked ? <Check className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                        </button>
                        <button onClick={() => deleteUser(u._id)} className="p-2 ml-2 rounded-xl border border-transparent shadow-sm text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors hover:shadow" title="Delete User">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
