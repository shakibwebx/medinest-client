'use client';

import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import {
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  User,
  Facebook,
  Instagram,
} from 'lucide-react';
import SearchBar from '../Search/SearchBar';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;

  return (
    <header className="w-full shadow sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-[#f5f5f5] px-4 lg:px-12 py-2 text-sm text-gray-700 hidden md:flex justify-between items-center gap-2">
  <div className="flex flex-wrap items-center gap-4">
    <div className="flex items-center gap-1">
      <Mail className="h-4 w-4" />
      <span>info@medinest.com</span>
    </div>
    <div className="flex items-center gap-1">
      <Phone className="h-4 w-4" />
      <span>+1 234 567 890</span>
    </div>
    <div className="flex items-center gap-1">
      <MapPin className="h-4 w-4" />
      <span>123 Medi Street, Health City</span>
    </div>
  </div>
  <div className="flex items-center gap-3">
    <Link href="https://facebook.com" target="_blank">
      <Facebook className="h-5 w-5 hover:text-blue-600" />
    </Link>
    <Link href="https://instagram.com" target="_blank">
      <Instagram className="h-5 w-5 hover:text-pink-600" />
    </Link>
  </div>
</div>


      {/* Row 1: Logo, Search, Icons */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-primary px-4 lg:px-12 py-3">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
        <Image
  src="/medinist.png"
  alt="MediNest Logo"
  width={160}
  height={50}
  className="h-12 w-auto object-contain"
/>

</Link>

        {/* Search Bar */}
        <div className="flex-1 w-full sm:max-w-xl">
          <SearchBar />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-6 w-6 text-white" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <User className="h-6 w-6 text-white" />
          </Link>

          {/* Logout */}
          {session && (
            <button onClick={() => signOut()} className="text-red-600 hover:text-red-500">
              <LogOut className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Sticky Nav Links */}
      <nav className=" bg-primary border-t border-white">
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 py-3 text-sm font-medium">
          <li>
            <Link href="/" className="text-white hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="text-white hover:text-accent">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-accent">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
