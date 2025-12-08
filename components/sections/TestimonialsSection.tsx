'use client';

import { useEffect, useRef, useState } from 'react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    comment: 'Paris yemek odası setini aldık, gerçekten çok kaliteli. Masanın ahşabı sağlam, sandalyeler rahat. Montaj ekibi de çok nazikti.',
    rating: 5,
    initial: 'A',
    color: 'bg-orange-500'
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    comment: 'Sandalyelerin kumaşı tam istediğim gibiydi. Hem şık hem rahat. Ailecek çok beğendik.',
    rating: 5,
    initial: 'A',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    comment: 'Konsol modeli harika, dekoratif ve işlevsel. Evin girişine çok yakıştı. Teşekkürler Ersan Mobilya.',
    rating: 5,
    initial: 'M',
    color: 'bg-green-500'
  },
  {
    id: 4,
    name: 'Ömer Can Akgüç',
    comment: 'Sipariş sürecinden teslimat sürecine kadar her şey mükemmeldi. İletişim çok iyiydi, her sorumu cevapladılar.',
    rating: 5,
    initial: 'Ö',
    color: 'bg-purple-500'
  },
  {
    id: 5,
    name: 'Can Öztürk',
    comment: 'Atlas masa takımını aldık. Ahşap işçiliği gerçekten özenli yapılmış, her detay düşünülmüş.',
    rating: 5,
    initial: 'C',
    color: 'bg-red-500'
  },
  {
    id: 6,
    name: 'Elif Arslan',
    comment: 'Yemek masası 6 kişilik tam istediğim ölçüde. Modern tasarımı salonumuza çok uydu.',
    rating: 5,
    initial: 'E',
    color: 'bg-pink-500'
  },
  {
    id: 7,
    name: 'Eren Kol',
    comment: 'Fiyat-performans açısından çok iyi. Kaliteli malzeme kullanılmış, yıllarca kullanabiliriz.',
    rating: 5,
    initial: 'E',
    color: 'bg-indigo-500'
  },
  {
    id: 8,
    name: 'Seda Aydın',
    comment: 'Sandalyelerin sırtlığı tam ayarında, uzun süre otursan bile rahatsız etmiyor. Çok düşünülmüş.',
    rating: 5,
    initial: 'S',
    color: 'bg-teal-500'
  },
  {
    id: 9,
    name: 'Emre Yıldız',
    comment: 'Teslimat çok hızlıydı. Montaj ekibi işini biliyor, kısa sürede kurdular. Profesyonel hizmet.',
    rating: 5,
    initial: 'E',
    color: 'bg-cyan-500'
  },
  {
    id: 10,
    name: 'Fatma Koç',
    comment: 'Pera yemek odası tam aradığımız gibiydi. Modern ve şık. Evde misafir ağırlarken çok beğeniliyor.',
    rating: 5,
    initial: 'F',
    color: 'bg-amber-500'
  },
  {
    id: 11,
    name: 'Mustafa Demircan',
    comment: 'Masa çok sağlam durmuş, sandalyeler de gayet kaliteli. Çocuklarla kullanıma uygun.',
    rating: 5,
    initial: 'M',
    color: 'bg-lime-500'
  },
  {
    id: 12,
    name: 'Gizem Öz',
    comment: 'Renk seçenekleri çok güzeldi, salonumuzun rengine uygun seçim yapabildik. Çok memnunuz.',
    rating: 5,
    initial: 'G',
    color: 'bg-rose-500'
  },
  {
    id: 13,
    name: 'Hakan Kadıoğlu',
    comment: 'Konsol modeli çok şık, dar koridora tam uydu. Kalitesi de çok iyi.',
    rating: 5,
    initial: 'H',
    color: 'bg-violet-500'
  },
  {
    id: 14,
    name: 'Burak Birgül',
    comment: 'İlk defa bu kadar kaliteli bir mobilya aldık. Gerçekten uzun ömürlü olacağından eminiz.',
    rating: 5,
    initial: 'B',
    color: 'bg-fuchsia-500'
  },
  {
    id: 15,
    name: 'Ece Yılmaz',
    comment: 'Müşteri hizmetleri çok ilgiliydi, her aşamada bilgilendirildik. Güler yüzlü ekip, teşekkürler.',
    rating: 5,
    initial: 'E',
    color: 'bg-sky-500'
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollPositionRef = useRef(0);
  const touchStartRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1.5;
    const scrollDelay = 30;

    const autoScroll = () => {
      if (scrollContainer && !isPaused) {
        scrollPositionRef.current += scrollStep;
        scrollContainer.scrollLeft = scrollPositionRef.current;

        // Sona gelince başa dön
        if (scrollPositionRef.current >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollPositionRef.current = 0;
        }
      }
    };

    intervalRef.current = setInterval(autoScroll, scrollDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (scrollRef.current) {
      scrollPositionRef.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
    lastInteractionRef.current = Date.now();
    if (scrollRef.current) {
      scrollPositionRef.current = scrollRef.current.scrollLeft;
    }
  };

  const handleTouchEnd = () => {
    // 2 saniye sonra otomatik scroll'a devam et
    setTimeout(() => {
      if (Date.now() - lastInteractionRef.current >= 2000) {
        setIsPaused(false);
      }
    }, 2000);
  };

  const handleScroll = () => {
    lastInteractionRef.current = Date.now();
    if (scrollRef.current) {
      scrollPositionRef.current = scrollRef.current.scrollLeft;
    }
  };

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Müşterilerimiz </span>
            <span className="text-[#FF6B00]">Ne Diyor?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Binlerce mutlu müşterimizin deneyimlerini okuyun
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar py-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          <div className="flex gap-6 pb-8" style={{ width: 'max-content' }}>
            {/* Yorumları 2 kez render et (sonsuz scroll efekti için) */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-none w-80 group relative backdrop-blur-xl rounded-3xl border border-white/5 p-8 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#FF6B00] hover:shadow-2xl hover:shadow-[#FF6B00]/20"
                style={{backgroundColor: 'rgba(25, 28, 45, 0.8)'}}
              >
                <div className="relative z-10">
                  {/* Stars without glow */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed text-base min-h-[96px]">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 flex-shrink-0 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl`}>
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="font-bold text-white text-base group-hover:text-[#FF6B00] transition-colors duration-300">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">Müşterimiz</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    </section>
  );
}
