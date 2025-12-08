'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Katalog', href: '/katalog' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/15 backdrop-blur-md shadow-lg rounded-b-2xl' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10">
            <Image
              src="/logo_withoutbg.png"
              alt="Ersan Mobilya"
              width={272}
              height={90}
              className="h-[50px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium transition-all duration-200 relative group text-white hover:text-orange-300"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={scrolled ? 'text-gray-700' : 'text-white'}
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden py-4 border-t border-white/10 rounded-b-2xl backdrop-blur-xl shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, rgba(25, 28, 45, 0.95) 0%, rgba(15, 18, 35, 0.98) 100%)',
              borderTop: '1px solid rgba(255, 107, 0, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-4 px-6 text-white hover:bg-gradient-to-r hover:from-[#FF6B00]/20 hover:to-[#FF8533]/10 hover:text-[#FF6B00] font-medium transition-all duration-300 border-b border-white/5 last:border-b-0 relative group"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#FF6B00] transition-all duration-300 group-hover:h-full opacity-0 group-hover:opacity-100"></div>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
