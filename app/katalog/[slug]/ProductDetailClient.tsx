'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/lib/favorites';
import { useFavoritesStore } from '@/lib/store/favorites';

interface ProductDetailClientProps {
  name: string;
  images: string[];
  categorySlug?: string;
  productId: string;
  productSlug: string;
}

export default function ProductDetailClient({ name, images, categorySlug, productId, productSlug }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const refreshFavorites = useFavoritesStore((state) => state.refresh);

  useEffect(() => {
    setIsFav(isFavorite(productId));
  }, [productId]);

  // Cloudinary thumbnail URL transformation
  const getThumbnailUrl = (url: string) => {
    if (url.includes('cloudinary.com')) {
      // Insert w_200,h_200,c_fill,q_90 transformation
      return url.replace('/upload/', '/upload/w_200,h_200,c_fill,q_90,f_auto/');
    }
    return url;
  };

  const handleFavoriteToggle = () => {
    const firstImage = images[0] || null;
    
    if (isFav) {
      removeFromFavorites(productId);
      setIsFav(false);
    } else {
      addToFavorites({
        documentId: productId,
        name,
        slug: productSlug,
        image: firstImage,
      });
      setIsFav(true);
    }
    
    refreshFavorites();
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen pt-24 overflow-x-hidden" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FF6B00] transition-colors mb-8"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Kataloga Dön</span>
        </Link>

        {/* Product Name and Favorite Button */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-left flex-1">
            {name.split(' ').map((word, index) => {
              const isOdasi = word.toLowerCase() === 'odası';
              return (
                <span key={index} className={isOdasi ? 'text-[#FF6B00]' : 'text-white'}>
                  {word}{index < name.split(' ').length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </h1>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300 border-2 ${
              isFav
                ? 'bg-[#FF6B00] border-[#FF6B00] text-white scale-110'
                : 'bg-transparent border-white/20 text-white/60 hover:border-[#FF6B00] hover:text-[#FF6B00]'
            }`}
            aria-label={isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            <FiHeart 
              className={`w-6 h-6 md:w-7 md:h-7 transition-all ${isFav ? 'fill-white' : ''}`}
            />
          </button>
        </div>

        <div className="w-full">
          {/* Main Image - Maintains Original Aspect Ratio */}
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 mb-4 md:mb-6" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
            <div className="relative w-full" style={{paddingBottom: '56.25%'}}> {/* 16:9 fallback */}
              <Image
                src={images[selectedImageIndex]}
                alt={name}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors z-10 shadow-lg"
                  aria-label="Önceki resim"
                >
                  <FiChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors z-10 shadow-lg"
                  aria-label="Sonraki resim"
                >
                  <FiChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-3 md:bottom-6 right-3 md:right-6 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs md:text-sm font-medium shadow-lg">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip - Below Main Image */}
          {images.length > 1 && (
            <div className="flex gap-3 md:gap-4 justify-start overflow-x-auto pb-2 px-2 hide-scrollbar">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-[#FF6B00] scale-105 shadow-lg shadow-[#FF6B00]/30'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
                  aria-label={`Resim ${index + 1}`}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={getThumbnailUrl(image)}
                      alt={`${name} - ${index + 1}`}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      quality={95}
                      unoptimized={false}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
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
    </div>
  );
}
