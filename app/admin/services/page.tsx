'use client';
import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
}

const categories = ['Massage', 'Facial', 'Body Treatment', 'Hair', 'Nail Care', 'Other'];
const emptyForm = { name: '', description: '', price: '', duration: '60 min', category: 'Massage' };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.get('/services').then(({ data }) => { setServices(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const openModal = (service?: Service) => {
    if (service) {
      setEditing(service);
      setForm({ name: service.name, description: service.description, price: String(service.price), duration: service.duration, category: service.category });
    } else {
      setEditing(null);
      setForm(emptyForm);
    }
    setImage(null);
    setModal(true);
  };

  const closeModal = () => { setModal(false); setEditing(null); setImage(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);

      if (editing) {
        const { data } = await api.put(`/services/${editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        setServices(prev => prev.map(s => s._id === editing._id ? data : s));
        toast.success('Service updated!');
      } else {
        const { data } = await api.post('/services', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        setServices(prev => [data, ...prev]);
        toast.success('Service created!');
      }
      closeModal();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(prev => prev.filter(s => s._id !== id));
      toast.success('Service deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>Service <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Management</span></h1>
          <p className="text-gray-500 mt-2 text-lg">Add, edit, or remove spa services.</p>
        </div>
        <button onClick={() => openModal()} className="btn btn-gold flex items-center gap-2 group shadow-lg hover:shadow-[0_15px_30px_rgba(201,169,110,0.3)] hover:-translate-y-1 transition-all">
          <Plus className="w-5 h-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" /> <span className="font-bold">Add Service</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-80 rounded-[2rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map(s => (
            <div key={s._id} className="spa-card p-0 overflow-hidden bg-white border border-gray-100 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-50 flex-shrink-0">
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center text-gray-300">
                    <span className="text-5xl mb-2">🌿</span>
                    <span className="text-xs uppercase tracking-widest font-black">No Image</span>
                  </div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black text-white backdrop-blur-md shadow-sm" style={{ background: 'rgba(201,169,110,0.95)' }}>{s.category}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-black text-xl mb-2" style={{ color: 'var(--dark)' }}>{s.name}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">{s.description}</p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black" style={{ color: 'var(--gold)' }}>${s.price}</span>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">/ {s.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(s)} className="p-2.5 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors border border-transparent hover:border-blue-100 shadow-sm hover:shadow" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteService(s._id)} className="p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors border border-transparent hover:border-red-100 shadow-sm hover:shadow" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 sm:p-10 w-full max-w-xl max-h-[90vh] overflow-y-auto animate-fade-up">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--dark)' }}>{editing ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Service Name *</label>
                <input required className="spa-input !rounded-xl !py-4" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Swedish Massage" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Description *</label>
                <textarea required rows={3} className="spa-input !rounded-xl !py-4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Service description..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Price ($) *</label>
                  <input required type="number" className="spa-input !rounded-xl !py-4" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="80" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Duration</label>
                  <input className="spa-input !rounded-xl !py-4" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="60 min" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Category</label>
                <select className="spa-input !rounded-xl !py-4 cursor-pointer" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Service Image</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-amber-50 rounded-[1.5rem] p-8 text-center cursor-pointer hover:border-amber-300 transition-colors">
                  {image ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mb-3 shadow-inner">✓</div>
                      <p className="text-green-700 text-sm font-bold tracking-wide">{image.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3 text-gray-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-gray-500 font-bold mb-1">Click to upload image</p>
                      <p className="text-xs text-gray-400">Optional, recommended 800x600px</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setImage(e.target.files?.[0] || null)} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={closeModal} className="btn btn-outline-gold flex-1 !font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-gold flex-[2] shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 !font-black text-lg">
                  {saving ? 'Saving...' : editing ? 'Update Service ✦' : 'Create Service ✦'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
