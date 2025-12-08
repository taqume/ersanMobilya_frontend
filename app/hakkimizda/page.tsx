import Image from 'next/image';
import { FiAward, FiHeart, FiTrendingUp, FiUsers } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | Ersan Mobilya - Hikayemiz ve Değerlerimiz',
  description: 'Ersan Mobilya, yıllardır yemek odası mobilyaları üretiminde uzmanlaşmış, kalite ve estetik anlayışıyla öne çıkan bir mobilya üreticisidir.',
  keywords: ['ersan mobilya hakkında', 'mobilya üreticisi', 'firma bilgileri'],
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen pt-24" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Hakkı</span>
              <span className="text-[#FF6B00]">mızda</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Ersan Mobilya, yemek odası mobilyaları konusunda uzmanlaşmış, 
              estetik ve kaliteli üretim anlayışıyla öne çıkan bir mobilya üreticisidir.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="rounded-3xl overflow-hidden border border-white/5" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/aboutUs.png"
                  alt="Ersan Mobilya Atölyesi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">Hikaye</span>
                <span className="text-[#FF6B00]">miz</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Ersan Mobilya, yılların deneyimi ve ustaca işçiliğiyle, her yemek odasını 
                bir sanat eserine dönüştürme vizyonuyla kurulmuştur. Masa, sandalye ve konsol 
                üretiminde uzmanlaşan firmamız, modern tasarım anlayışını geleneksel kaliteyle harmanlayarak 
                benzersiz ürünler ortaya koymaktadır.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Her ürünümüz, ailelerin en değerli anılarına ev sahipliği yapacak 
                dayanıklılık ve zarafete sahiptir. Müşteri memnuniyetini ön planda tutarak, 
                her projeye özel çözümler sunuyoruz.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: FiAward,
                title: 'Kalite',
                description: 'En kaliteli malzemeler ve işçilik garantisi',
              },
              {
                icon: FiHeart,
                title: 'Özenli Üretim',
                description: 'Her detay titizlikle ele alınır',
              },
              {
                icon: FiTrendingUp,
                title: 'Modern Tasarım',
                description: 'Çağdaş ve zamansız estetik',
              },
              {
                icon: FiUsers,
                title: 'Müşteri Odaklı',
                description: 'Memnuniyetiniz bizim önceliğimiz',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-white/5 hover:border-[#FF6B00] transition-all duration-300 group"
                style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
              >
                <value.icon className="w-12 h-12 text-[#FF6B00] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-white/5" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">Misyo</span>
                <span className="text-[#FF6B00]">numuz</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Yemek odalarına estetik, konfor ve kalite katmak. Her ailenin sofrasında, 
                güvenle kullanabileceği, yıllarca dayanacak mobilyalar üretmek. 
                Masa, sandalye ve konsol tasarımında mükemmeliyeti yakalamak bizim misyonumuz.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5" style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">Vizyo</span>
                <span className="text-[#FF6B00]">numuz</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Türkiye'nin önde gelen yemek odası mobilya üreticisi olmak. 
                İnovatif tasarımlar ve üstün kaliteyle sektörde öncü rol oynamak. 
                Her evde Ersan Mobilya imzası taşıyan bir ürünün bulunması hedefimizdir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
