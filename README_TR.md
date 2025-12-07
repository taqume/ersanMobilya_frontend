# Ersan Mobilya - Frontend (Next.js)

Modern, hızlı ve responsive mobilya katalog sitesi. Next.js 16 + TypeScript + Tailwind CSS.

---

## 🚀 Kurulum

### 1. Dependencies Yükle
```bash
npm install
```

### 2. Environment Variables
`.env.local` dosyasını oluştur (`.env.example` dosyasını referans al):

```bash
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Ersan Mobilya
RESEND_API_KEY=your_resend_api_key
```

### 3. Development Server
```bash
npm run dev
```

Site: `http://localhost:3000`

---

## 📁 Proje Yapısı

```
ersanMobilya_frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Ana sayfa
│   ├── katalog/             # Katalog sayfaları
│   ├── favoriler/           # Favoriler sayfası
│   ├── hakkimizda/          # Hakkımızda
│   ├── iletisim/            # İletişim formu
│   └── api/                 # API routes (contact form)
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Reusable UI komponentleri
│   └── providers/           # React Query, vb.
├── lib/
│   ├── api.ts               # Strapi API fonksiyonları
│   ├── favorites.ts         # Favoriler LocalStorage
│   ├── types/               # TypeScript type definitions
│   └── store/               # Zustand stores
└── public/                  # Static files
```

---

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: Axios + TanStack Query
- **Forms**: React Hook Form + Zod
- **Icons**: React Icons
- **Image Slider**: Swiper
- **Notifications**: Sonner

---

## 📦 Özellikler

### ✅ Tamamlanan
- [x] Next.js kurulumu (TypeScript + Tailwind)
- [x] Strapi API entegrasyonu
- [x] Favoriler sistemi (LocalStorage + Zustand)
- [x] Header & Footer komponentleri
- [x] Responsive navigation
- [x] TypeScript type definitions

### 🔄 Devam Eden
- [ ] ProductCard, CategoryCard UI komponentleri
- [ ] Ana sayfa (Hero + Kategoriler + Ürünler)
- [ ] Katalog sayfası (filtreleme + grid)
- [ ] Ürün detay sayfası (gallery + bilgi)
- [ ] Favoriler sayfası
- [ ] Hakkımızda sayfası
- [ ] İletişim formu + Resend API

---

## 🌐 Deployment (Vercel)

### 1. GitHub'a Push
```bash
git add .
git commit -m "Frontend: Initial setup"
git push origin main
```

### 2. Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com) → New Project
2. GitHub repo'yu seç: `ersanMobilya_frontend`
3. Framework Preset: Next.js (otomatik algılanır)
4. Environment Variables ekle:
   ```
   NEXT_PUBLIC_API_URL=https://ersan-mobilya-api.onrender.com
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloudinary_name>
   RESEND_API_KEY=<resend_key>
   ```
5. Deploy butonuna tıkla

### 3. Custom Domain (Opsiyonel)
- Vercel Settings → Domains → Add Domain
- DNS ayarları: Domain provider'da CNAME kaydı ekle

---

## 📝 API Kullanımı

```typescript
import { getProducts, getCategories } from '@/lib/api';

// Tüm ürünleri çek
const products = await getProducts();

// Kategorileri çek
const categories = await getCategories();

// Slug ile ürün çek
const product = await getProductBySlug('ahsap-masa');
```

---

## 🎨 Tailwind Config

Proje, modern ve temiz bir tasarım için Tailwind CSS kullanıyor. Custom renkler ve font ayarları `tailwind.config.ts` dosyasında.

---

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

---

## 📚 Dokümantasyon

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs/)
