'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiHeart, FiMaximize2, FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);

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
    
    loadFavorites();
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

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
    <div className="min-h-screen pt-24" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      <div className="container mx-auto px-4 pb-4 md:pb-12">
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
            
            {/* Fullscreen/Maximize Button */}
            <button
              onClick={openFullscreen}
              className="absolute top-3 md:top-6 right-3 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors z-10 shadow-lg"
              aria-label="Tam ekran"
            >
              <FiMaximize2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>

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

          {/* Thumbnail Gallery - Below Main Image */}
          {images.length > 1 && (
            <>
              {/* Mobile: Grid Layout */}
              <div className="grid grid-cols-4 gap-2 py-3 md:hidden">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-visible border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-[#FF6B00] scale-105 shadow-lg shadow-[#FF6B00]/30'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
                    aria-label={`Resim ${index + 1}`}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
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

              {/* Desktop: Horizontal Scroll */}
              <div className="hidden md:flex gap-4 justify-start overflow-x-auto py-3 px-1 hide-scrollbar">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-28 h-28 lg:w-32 lg:h-32 rounded-xl overflow-visible border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-[#FF6B00] scale-105 shadow-lg shadow-[#FF6B00]/30'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
                    aria-label={`Resim ${index + 1}`}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
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
            </>
          )}
        </div>
      </div>
    </div>

    {/* Fullscreen Modal */}
    {isFullscreen && (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={closeFullscreen}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors z-50"
          aria-label="Kapat"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Uzaklaştır"
          >
            <FiZoomOut className="w-6 h-6" />
          </button>
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center font-medium">
            {Math.round(zoomLevel * 100)}%
          </div>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Yakınlaştır"
          >
            <FiZoomIn className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors z-50"
              aria-label="Önceki resim"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#FF6B00] transition-colors z-50"
              aria-label="Sonraki resim"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium z-50">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Image Container with Zoom */}
        <div 
          className="w-full h-full flex items-center justify-center overflow-auto p-4"
          style={{
            touchAction: 'pan-x pan-y pinch-zoom',
          }}
        >
          <div
            className="relative transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
          >
            <Image
              src={images[selectedImageIndex]}
              alt={name}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    )}
    </>
  );
}
