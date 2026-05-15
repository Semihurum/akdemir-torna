import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akdemirler Tornacılık | Endüstriyel Hassasiyet & CNC Torna",
  description:
    "Akdemirler Tornacılık - 25+ yıllık tecrübemizle CNC torna, kalıp işleme, hassas ölçüm ve özel üretim çözümleri sunuyoruz. Metal işleme sektöründe güvenilir çözüm ortağınız.",
  keywords:
    "torna, CNC, metal işleme, hassas üretim, kalıp işleme, tornacılık, endüstriyel üretim, İstanbul",
  authors: [{ name: "Akdemirler Tornacılık" }],
  openGraph: {
    title: "Akdemirler Tornacılık | Endüstriyel Hassasiyet",
    description:
      "Çeyrek asırlık tecrübemizle metal işleme ve hassas üretim çözümleri sunuyoruz.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased overflow-x-hidden">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {children}
      </body>
    </html>
  );
}
