'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import type { ContactInfo } from '@/lib/types/strapi';

interface FooterProps {
  contactInfo: ContactInfo | null;
}

export function Footer({ contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-400 border-t border-white/5" style={{backgroundColor: 'rgba(15, 17, 28, 1)'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo_withoutbg.png"
                alt="Ersan Mobilya"
                width={200}
                height={66}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ersan Mobilya, yemek odası mobilyaları konusunda uzmanlaşmış, 
              kaliteli ve estetik masa, sandalye ve konsol üretimiyle öne çıkan 
              bir mobilya üreticisidir. Her ürünümüz, evinize şıklık ve konfor katmak 
              için özenle tasarlanır ve üretilir.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog"
                  className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm"
                >
                  Katalog
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-gray-400 hover:text-[#FF6B00] transition-colors text-sm"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">İletişim</h3>
            {contactInfo ? (
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <FiPhone className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF6B00]" />
                  <a href={`tel:${contactInfo.phone}`} className="text-sm text-gray-400 hover:text-[#FF6B00] transition-colors">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <FiMail className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF6B00]" />
                  <a href={`mailto:${contactInfo.email}`} className="text-sm text-gray-400 hover:text-[#FF6B00] transition-colors">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF6B00]" />
                  <span className="text-sm text-gray-400">
                    {contactInfo.address}
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <FiPhone className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-400">Yükleniyor...</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {currentYear} Ersan Mobilya. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
