import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const wantedSans = localFont({src: '../public/fonts/WantedSansVariable.woff2'});

export const metadata: Metadata = {
  title: '대출 정보',
  description: '인터넷 대출 중개 직거래 전문 사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
    <head>
      <link rel="icon" href="./favicon.ico"/>
    </head>
    <body className={`${wantedSans.className}`}>
    {children}
    </body>
    </html>
  );
}
