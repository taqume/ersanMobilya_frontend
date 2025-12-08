import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import { getCloudinaryUrl } from '@/lib/api';
import { FavoritesSection } from '@/components/sections/FavoritesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default async function Home() {
  // En sevilen ürünleri çek (admin Strapi'den yönetecek)
  const featuredProducts = await getProducts({ pageSize: 3 });

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

      {/* En Sevilenler Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">En Sevilenler</h2>
            <p className="text-gray-300 text-lg">Müşterilerimizin en çok tercih ettiği ürünler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/urun/${product.slug}`}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20"
              >
                <div className="aspect-square relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={getCloudinaryUrl(product.images[0].url, { width: 800, height: 800, quality: 90 })}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600 text-6xl">🪑</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  )}
                  {product.price && (
                    <p className="text-2xl font-bold text-orange-400">
                      {new Intl.NumberFormat('tr-TR', { 
                        style: 'currency', 
                        currency: 'TRY',
                        minimumFractionDigits: 0
                      }).format(product.price)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Favorilerim Section */}
      <FavoritesSection />

      {/* Müşterilerimiz Ne Diyor Section */}
      <TestimonialsSection />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber="+905384753781" />
    </div>
  );
}
