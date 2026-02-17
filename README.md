# Ersan Mobilya - Web Sitesi

Ersan Mobilya, yemek odası mobilyaları konusunda uzmanlaşmış bir üretim atölyesidir. Bu proje, firmanın ürünlerini müşterilere sergilemek için geliştirilmiş modern web uygulamasıdır.

## Teknoloji

- **Next.js 16** - React framework
- **TypeScript** - Tip güvenli geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state yönetimi
- **Zustand** - Client state yönetimi

## Özellikler

- Ürün kataloğu ve detay sayfaları
- Kategori bazlı filtreleme
- Favorilere ekleme
- İletişim formu (Resend entegrasyonu)
- Responsive tasarım
- Görsel optimizasyonu (Cloudinary)
- SEO optimizasyonu

## Gereksinimler

- Node.js 20.x veya üzeri
- Backend API (Strapi)

## Kurulum

```bash
npm install
```

`.env.local` dosyası oluşturun ve gerekli environment variable'ları ekleyin. `.env.example` dosyasını referans alabilirsiniz.

## Kullanım

Development modunda çalıştırmak için:

```bash
npm run dev
```

Site `http://localhost:3000` adresinde çalışacaktır.

Production build oluşturmak için:

```bash
npm run build
npm start
```

## Sayfa Yapısı

- **Ana Sayfa** - Öne çıkan ürünler ve müşteri yorumları
- **Katalog** - Tüm kategoriler
- **Ürün Detay** - Ürün görselleri ve bilgileri
- **Hakkımızda** - Firma bilgileri
- **İletişim** - İletişim formu ve bilgileri

## Environment Variables

```env
NEXT_PUBLIC_API_URL=          # Strapi backend URL
NEXT_PUBLIC_SITE_URL=         # Site URL (SEO için)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=  # Cloudinary hesap adı
RESEND_API_KEY=               # Email servisi API key
```

## Lisans

MIT License - Detaylar için LICENSE dosyasına bakınız.
