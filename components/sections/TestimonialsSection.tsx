'use client';

import { useEffect, useRef, useState } from 'react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    comment: 'Aldığım yemek masası seti harika! Kaliteli işçilik ve uygun fiyat. Kesinlikle tavsiye ederim.',
    rating: 5,
    initial: 'A',
    color: 'bg-orange-500'
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    comment: 'Koltuk takımımız çok şık ve rahat. Evimize çok yakıştı. Ersan Mobilya\'ya teşekkürler!',
    rating: 5,
    initial: 'A',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    comment: 'Özel tasarım dolabımız tam istediğim gibi oldu. Ölçülere uygun ve kaliteli üretim.',
    rating: 5,
    initial: 'M',
    color: 'bg-green-500'
  },
  {
    id: 4,
    name: 'Zeynep Şahin',
    comment: 'Çalışma masam çok fonksiyonel. Home office için birebir. Hızlı teslimat ve montaj.',
    rating: 5,
    initial: 'Z',
    color: 'bg-purple-500'
  },
  {
    id: 5,
    name: 'Can Öztürk',
    comment: 'Yatak odası takımı muhteşem! Kalite ve estetik bir arada. Çok memnun kaldık.',
    rating: 5,
    initial: 'C',
    color: 'bg-red-500'
  },
  {
    id: 6,
    name: 'Elif Arslan',
    comment: 'TV ünitesi ve sehpa takımı evimize çok yakıştı. Modern tasarım ve sağlam yapı.',
    rating: 5,
    initial: 'E',
    color: 'bg-pink-500'
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 0.5; // Yavaşlatıldı (1 -> 0.5)
    const scrollDelay = 30;

    const autoScroll = () => {
      if (scrollContainer && !isPaused) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        // Sona gelince başa dön
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
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

  return (
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Müşterilerimiz Ne Diyor?</h2>
          <p className="text-gray-300 text-lg">Binlerce mutlu müşterimizin deneyimlerini okuyun</p>
        </div>

        <div 
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {/* Yorumları 2 kez render et (sonsuz scroll efekti için) */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-none w-80 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-orange-500/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-100 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-300">Müşterimiz</p>
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
