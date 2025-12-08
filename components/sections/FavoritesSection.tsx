'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useFavoritesStore } from '@/lib/store/favorites';
import { FiHeart, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export function FavoritesSection() {
  const { favorites, loadFavorites } = useFavoritesStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFavorites();
    setIsLoaded(true);
  }, [loadFavorites]);

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [favorites]);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 368; // 360px card + 8px gap
      const targetScroll = container.scrollLeft + (direction === 'left' ? -cardWidth : cardWidth);
      
      // Smooth scroll with custom animation
      const startScroll = container.scrollLeft;
      const distance = targetScroll - startScroll;
      const duration = 500; // 500ms animation
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const easeInOutQuad = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        container.scrollLeft = startScroll + distance * easeInOutQuad;
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          checkScrollability();
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  };

  if (!isLoaded) return null;

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Favori</span>
            <span className="text-[#FF6B00]">lerim</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Beğendiğiniz ürünleri favorilerinize ekleyin
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 backdrop-blur-xl rounded-3xl border border-white/5 shadow-xl" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-[#FF6B00]/20 rounded-full blur-xl"></div>
              <FiHeart className="w-20 h-20 text-[#FF6B00]/60 relative" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Henüz favori ürününüz yok</h3>
            <p className="text-gray-400 mb-8 px-4">Beğendiğiniz ürünleri favorilerinize ekleyerek buradan kolayca ulaşabilirsiniz</p>
            <Link
              href="/katalog"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-[#FF6B00]/50 hover:scale-105 transition-all duration-300"
            >
              Katalog İncele
            </Link>
          </div>
        ) : (
          <div className="relative max-w-[1270px] mx-auto px-4 md:px-12">
            {/* Left Scroll Button */}
            {favorites.length > 3 && canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg hover:bg-[#FF8533] transition-all z-10"
                aria-label="Sola kaydır"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Scroll Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={checkScrollability}
              className="overflow-x-auto overflow-y-visible pb-8 pt-8 hide-scrollbar"
            >
              <div className="flex gap-8 px-2">
                {favorites.map((product) => (
                  <Link
                    key={product.documentId}
                    href={`/katalog/${product.slug}`}
                    className="flex-none w-[360px] group relative rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#FF6B00] hover:shadow-2xl hover:shadow-[#FF6B00]/20"
                    style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
                  >
                    {/* Kalp - Sağ Üst Köşe */}
                    <div className="absolute top-4 right-4 z-20">
                      <FiHeart className="w-12 h-12 text-[#FF6B00] fill-[#FF6B00] animate-heart-beat drop-shadow-lg" />
                    </div>

                    {/* Full Image with Overlay */}
                    <div className="aspect-[3/2] relative overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <span className="text-gray-600 text-6xl">🪑</span>
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      
                      {/* Text on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-3xl font-bold text-white group-hover:text-[#FF6B00] transition-colors duration-300 drop-shadow-lg">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Scroll Button */}
            {favorites.length > 3 && canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg hover:bg-[#FF8533] transition-all z-10"
                aria-label="Sağa kaydır"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
