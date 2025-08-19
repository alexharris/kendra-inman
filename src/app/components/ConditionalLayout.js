'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Hide header and footer on studio pages
  const isStudioPage = pathname.startsWith('/studio');

  return (
    <>
      {!isStudioPage && <Header />}
      <div id="wrapper" className={isStudioPage ? "studio" : "not-studio"}>{children}</div>
      {!isStudioPage && <Footer />}
    </>
  );
}
