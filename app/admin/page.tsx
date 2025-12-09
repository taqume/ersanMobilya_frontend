import { redirect } from 'next/navigation';

export default function AdminRedirect() {
  // Backend admin paneline yönlendir
  redirect('https://ersanmobilya-backend.onrender.com/admin');
}
