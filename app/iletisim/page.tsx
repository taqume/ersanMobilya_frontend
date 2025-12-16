import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { getContactInfo } from '@/lib/api';
import { ContactForm } from './ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Ersan Mobilya',
  description: 'Ersan Mobilya ile iletişime geçin. Sorularınız için bize ulaşın.',
};

// ISR: Her 1 saatte bir revalidate (3600 saniye)
export const revalidate = 3600;

export default async function IletisimPage() {
  const contactInfo = await getContactInfo();

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
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
