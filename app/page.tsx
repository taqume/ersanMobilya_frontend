import Link from 'next/link';
import Image from 'next/image';
import { FavoritesSection } from '@/components/sections/FavoritesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getFeaturedProducts } from '@/lib/api';

export default async function Home() {
  // Öne çıkan ürünleri çek
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero-bg.png"
          alt="Ersan Mobilya"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Yaşam Alanlarınıza
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Değer Katan Mobilyalar
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Kaliteli işçilik ve modern tasarımlarla hayalinizdeki mekanı oluşturun
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/katalog"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
              >
                <span className="relative z-10">Katalog İncele</span>
              </Link>

              <Link
                href="/hakkimizda"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Hakkımızda
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt Bölümler Container */}
      <div style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
        {/* En Sevilenler Section */}
        <section className="py-20 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-white">En </span>
                  <span className="text-[#FF6B00]">Sevilenler</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Müşterilerimizin en çok tercih ettiği ürünler
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
                {featuredProducts.map((product, index) => {
                  const firstImage = product.images?.[0];
                  // Cloudinary URL'i zaten tam URL, diğer durumlarda API URL ekle
                  const imageUrl = firstImage?.url 
                    ? (firstImage.url.startsWith('http') 
                        ? firstImage.url 
                        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${firstImage.url}`)
                    : '/hero-bg.png';

                  return (
                    <Link 
                      key={product.documentId}
                      href={`/katalog/${product.slug}`}
                      className="group relative rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#FF6B00] hover:shadow-2xl hover:shadow-[#FF6B00]/20" 
                      style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
                    >
                      {/* Yıldız - Sağ Üst Köşe */}
                      <div className="absolute top-4 right-4 z-20">
                        <svg className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-star-pulse drop-shadow-lg" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>

                      {/* Full Image with Overlay */}
                      <div className="aspect-[3/2] relative overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
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
                  );
                })}
              </div>
            </div>
        </section>

        {/* Favorilerim Section */}
        <FavoritesSection />

        {/* Müşterilerimiz Ne Diyor Section */}
        <TestimonialsSection />
      </div>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber="+905384753781" />
    </div>
  );
}
