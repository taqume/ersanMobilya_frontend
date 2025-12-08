import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      <div className="text-center px-4">
        <h1 className="text-7xl font-bold mb-4">
          <span className="text-white">4</span>
          <span className="text-[#FF6B00]">0</span>
          <span className="text-white">4</span>
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">Ürün Bulunamadı</h2>
        <p className="text-gray-400 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link
          href="/katalog"
          className="inline-block px-8 py-3 bg-[#FF6B00] text-white font-semibold rounded-full hover:bg-[#FF8533] transition-colors"
        >
          Kataloga Dön
        </Link>
      </div>
    </div>
  );
}
