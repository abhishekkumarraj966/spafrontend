'use client';
import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Upload, Trash2, ImageIcon, Plus, Image as LucideImage } from 'lucide-react';

interface GalleryItem { _id: string; title: string; imageUrl: string; }

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.get('/gallery').then(({ data }) => { setImages(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error('Please select an image'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('title', title || 'Spa Gallery');
      const { data } = await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImages(prev => [data, ...prev]);
      toast.success('Image uploaded!');
      setFile(null); setTitle('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      setImages(prev => prev.filter(i => i._id !== id));
      toast.success('Image deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
            <LucideImage className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>Gallery <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-dark)]" style={{ WebkitTextFillColor: 'initial' }}>Management</span></h1>
            <p className="text-gray-500 mt-1 font-bold">Upload and manage spa gallery images.</p>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="spa-card p-6 sm:p-8 mb-10 border border-gray-100 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-50" />
        <h3 className="text-xl font-black mb-6 relative z-10" style={{ color: 'var(--dark)' }}>Upload New Image</h3>
        <form onSubmit={uploadImage} className="flex flex-col md:flex-row gap-5 items-end relative z-10">
          <div className="flex-1 w-full">
            <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Image Title</label>
            <input className="spa-input !py-4 !rounded-xl w-full" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Relaxation Suite" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500">Image File *</label>
            <div onClick={() => fileRef.current?.click()} className="spa-input !py-4 !rounded-xl cursor-pointer flex items-center gap-3 text-gray-500 hover:border-amber-300 transition-colors bg-gray-50/50">
              <Upload className="w-5 h-5" />
              {file ? <span className="text-green-600 font-bold tracking-wide text-sm truncate">{file.name}</span> : <span className="text-sm font-semibold">Choose image file...</span>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" disabled={uploading} className="btn w-full md:w-auto btn-gold btn-xl shadow-lg hover:shadow-[0_15px_30px_rgba(201,169,110,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 !px-8">
            <Plus className="w-5 h-5" /> <span className="font-black text-base">{uploading ? 'Uploading...' : 'Upload'}</span>
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton rounded-[2rem] h-56" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-400 font-bold text-lg">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {images.map(img => (
            <div key={img._id} className="group relative rounded-[2rem] overflow-hidden h-56 sm:h-64 bg-gray-50 shadow-sm border border-gray-100 cursor-pointer">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                <p className="text-white font-black text-lg text-center mb-4 tracking-wide shadow-black drop-shadow-md">{img.title}</p>
                <button onClick={(e) => { e.stopPropagation(); deleteImage(img._id); }} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/90 text-white hover:bg-red-500 backdrop-blur-md transition-all shadow-lg hover:shadow-[0_10px_20px_rgba(239,68,68,0.4)] hover:-translate-y-1" title="Delete Image">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
