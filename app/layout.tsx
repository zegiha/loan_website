import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'swiper/css';
import style from './home.module.scss';
import Footer from "@/components/organisms/layout/footer/Footer";
import Header from "@/components/organisms/layout/Header/Header";

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
    <body className={`${wantedSans.className}`}>
    <div className={style.container}>
      <Header/>
      {children}
      <Footer/>
    </div>
    <div id={'modal-root'}></div>
    </body>
    </html>
  );
}
