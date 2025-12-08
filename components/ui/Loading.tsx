import Image from 'next/image';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ text = 'Yükleniyor...', fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(19, 21, 33, 1)'}}>
        <div className="text-center">
          <div className="relative w-48 h-16 mb-6 mx-auto">
            <Image
              src="/logo_withoutbg.png"
              alt="Ersan Mobilya"
              fill
              className="object-contain animate-pulse"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <p className="text-gray-400 mt-4">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative w-32 h-12 mb-4 mx-auto">
          <Image
            src="/logo_withoutbg.png"
            alt="Ersan Mobilya"
            fill
            className="object-contain animate-pulse"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
        <p className="text-gray-400 text-sm mt-3">{text}</p>
      </div>
    </div>
  );
}

// Spinner variant
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`${sizeClasses[size]} border-[#FF6B00]/30 border-t-[#FF6B00] rounded-full animate-spin`}></div>
  );
}
