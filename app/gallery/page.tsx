'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Trash2, ImageIcon } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const placeholders = [
    { _id: '1', title: 'Relaxation Suite', imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80' },
    { _id: '2', title: 'Massage Room', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80' },
    { _id: '3', title: 'Facial Treatment', imageUrl: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80' },
    { _id: '4', title: 'Hot Stone Therapy', imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80' },
    { _id: '5', title: 'Spa Pool', imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80' },
    { _id: '6', title: 'Body Treatment', imageUrl: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80' },
    { _id: '7', title: 'Reception Area', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
    { _id: '8', title: 'Inner Peace', imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
  ];

  useEffect(() => {
    api.get('/gallery').then(({ data }) => {
      setImages(data.length > 0 ? data : placeholders);
      setLoading(false);
    }).catch(() => { setImages(placeholders); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_10%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80')" }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center pt-20">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Visual Journey</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 animate-fade-up">
            Our <span className="gradient-text !from-[var(--gold)] !to-[var(--gold-light)]" style={{ WebkitTextFillColor: 'initial' }}>Gallery</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100 opacity-90">
            Glimpses of your luxurious experience and our tranquil sanctuary.
          </p>
        </div>
      </section>

      {/* Gallery Masonry Grid */}
      <section className="section-pad bg-white">
        <div className="container-spa">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton rounded-[2rem] w-full" style={{ height: `${200 + (i % 3) * 80}px` }} />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {images.map((img) => (
                <div key={img._id} className="group relative overflow-hidden rounded-[2rem] bg-gray-100 break-inside-avoid cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white font-bold text-xl mb-2">{img.title}</p>
                      <div className="h-1 w-12 rounded-full" style={{ background: 'var(--gold)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
