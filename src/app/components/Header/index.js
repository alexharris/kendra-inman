'use client';
import './Header.scss';
import { usePathname } from 'next/navigation';
import Menu from '../Menu';

export default function Header() {

  return (
    <div className="justify-between items-center flex h-16 px-4 fixed w-full bg-transparent z-40">
      <span></span>
      <a href="/">KENDRA INMAN</a>
      <Menu />
    </div>
  );
}
