'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { getContactInfo } from '@/lib/api';
import type { ContactInfo } from '@/lib/types/strapi';

export default function IletisimPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    getContactInfo().then(setContactInfo);
  }, []);

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
    <div className="min-h-screen pt-24" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">İleti</span>
            <span className="text-[#FF6B00]">şim</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Sorularınız için bize ulaşın. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-white">İletişim </span>
              <span className="text-[#FF6B00]">Bilgileri</span>
            </h2>

            {contactInfo && (
              <div className="space-y-6">
                {/* Phone */}
                <div className="p-6 rounded-2xl border border-white/5 hover:border-[#FF6B00] transition-all" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#FF6B00]/10">
                      <FiPhone className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Telefon</h3>
                      <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-[#FF6B00] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-6 rounded-2xl border border-white/5 hover:border-[#FF6B00] transition-all" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#FF6B00]/10">
                      <FiMail className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">E-posta</h3>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-[#FF6B00] transition-colors break-all">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="p-6 rounded-2xl border border-white/5 hover:border-[#FF6B00] transition-all" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#FF6B00]/10">
                      <FiMapPin className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Adres</h3>
                      <p className="text-gray-400">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                {contactInfo.mapUrl && (
                  <div className="rounded-2xl overflow-hidden border border-white/5 h-64">
                    <iframe
                      src={contactInfo.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Form */}
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
        </div>
      </div>
    </div>
  );
}
