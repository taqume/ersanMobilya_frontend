import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold mb-4">
          <span className="text-white">4</span>
          <span className="text-[#FF6B00]">0</span>
          <span className="text-white">4</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#FF6B00]/50 hover:scale-105 transition-all"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/katalog"
            className="inline-block px-8 py-3 border-2 border-[#FF6B00] text-[#FF6B00] font-semibold rounded-full hover:bg-[#FF6B00] hover:text-white transition-all"
          >
            Katalog İncele
          </Link>
        </div>
      </div>
    </div>
  );
}
