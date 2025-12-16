'use client';

import { useState } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="p-8 rounded-3xl border border-white/5" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
      <h2 className="text-3xl font-bold mb-8">
        <span className="text-white">Mesaj </span>
        <span className="text-[#FF6B00]">Gönderin</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-white font-medium mb-2">Adınız Soyadınız</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none transition-colors"
            placeholder="Ad Soyad"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-white font-medium mb-2">E-posta</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none transition-colors"
            placeholder="ornek@email.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white font-medium mb-2">Telefon</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none transition-colors"
            placeholder="+90 XXX XXX XX XX"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-white font-medium mb-2">Mesajınız</label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-[#FF6B00] focus:outline-none transition-colors resize-none"
            placeholder="Mesajınızı buraya yazın..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#FF6B00]/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Gönderiliyor...
            </>
          ) : status === 'success' ? (
            <>
              <FiCheckCircle className="w-5 h-5" />
              Gönderildi!
            </>
          ) : (
            <>
              <FiSend className="w-5 h-5" />
              Mesaj Gönder
            </>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="text-green-400 text-center text-sm">Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-center text-sm">Bir hata oluştu. Lütfen tekrar deneyin.</p>
        )}
      </form>
    </div>
  );
}
