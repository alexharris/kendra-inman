'use client';
import './Header.scss';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <div className={`kendra-header ${isHomepage ? 'animate' : ''}`}>
      KENDRA INMAN
    </div>
  );
}
