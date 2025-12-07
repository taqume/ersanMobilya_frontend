import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Ersan Mobilya
            </h3>
            <p className="text-sm">
              Kaliteli ve özel tasarım mobilya üretiminde uzman. Her projede
              müşteri memnuniyeti önceliğimizdir.
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
                  className="hover:text-white transition-colors text-sm"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog"
                  className="hover:text-white transition-colors text-sm"
                >
                  Katalog
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="hover:text-white transition-colors text-sm"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="hover:text-white transition-colors text-sm"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+90 XXX XXX XX XX</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">info@ersanmobilya.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Kayseri, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Ersan Mobilya. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
