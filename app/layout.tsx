import {GlobalRouterLayout} from '@/shared/globalRouter'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'swiper/css';
import style from './home.module.scss';
import Footer from "@/components/organisms/layout/footer/Footer";
import Header from "@/components/organisms/layout/Header/Header";
// import Link from "next/link";
import Quickbar from "@/components/molecules/Layout/quickbar/Quickbar";
import {TanstackQueryProvider} from "@/shared/axios";
import Auth_provider from "@/components/organisms/layout/Auth_provider";

const wantedSans = localFont({src: '../public/fonts/WantedSansVariable.woff2', display: 'swap'});

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
    <GlobalRouterLayout>
      <TanstackQueryProvider>
        <Auth_provider>
          <div className={style.container}>
            <Header/>
            {children}
            <Footer/>
          </div>

          <Quickbar/>
          <div id={'modal-root'}></div>
        </Auth_provider>
      </TanstackQueryProvider>
    </GlobalRouterLayout>
    </body>
    </html>
  );
}
