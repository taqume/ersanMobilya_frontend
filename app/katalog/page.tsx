import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/api';

export default async function KatalogPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Ürün </span>
              <span className="text-[#FF6B00]">Kataloğu</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Kaliteli ve şık mobilya koleksiyonlarımızı keşfedin
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category) => {
              const imageUrl = category.image?.url
                ? (category.image.url.startsWith('http')
                    ? category.image.url
                    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${category.image.url}`)
                : '/hero-bg.png';

              return (
                <Link
                  key={category.documentId}
                  href={`/katalog/${category.slug}`}
                  className="group relative rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#FF6B00] hover:shadow-2xl hover:shadow-[#FF6B00]/20"
                  style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
                >
                  {/* Category Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    
                    {/* Category Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-3xl font-bold text-white group-hover:text-[#FF6B00] transition-colors duration-300 drop-shadow-lg">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-300 mt-2 text-sm line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-8 rounded-3xl border border-white/5" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
                <p className="text-gray-400 text-lg">
                  Henüz kategori eklenmemiş.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
