import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Ersan Mobilya Website <onboarding@resend.dev>', // Resend default sender
      to: ['ersanmobilyaa@gmail.com'],
      replyTo: email,
      subject: `Yeni İletişim Formu Mesajı - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF6B00 0%, #FF8533 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Yeni İletişim Formu Mesajı</h1>
          </div>
          
          <div style="background: #f5f5f5; padding: 30px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="color: #FF6B00; margin-top: 0;">Gönderen Bilgileri</h3>
              <p><strong>Ad Soyad:</strong> ${name}</p>
              <p><strong>E-posta:</strong> ${email}</p>
              <p><strong>Telefon:</strong> ${phone}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #FF6B00; margin-top: 0;">Mesaj</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px;">
            <p>Bu mesaj ersanmobilya.com web sitesinden gönderilmiştir.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Email gönderilemedi' },
      { status: 500 }
    );
  }
}
