'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
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
  Truck,
  LogIn,
  ShieldCheck,
} from 'lucide-react';
import SearchBar from '../Search/SearchBar';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;

  return (
    <header className="sticky top-0 z-50 w-full shadow">
      {/* Top Info Bar */}
      <div className="hidden items-center justify-between gap-2 bg-[#f5f5f5] px-4 py-2 text-sm text-gray-700 md:flex lg:px-12">
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

      {/* Main Navbar */}
      <div className="bg-primary flex flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/medinist.png"
            alt="MediNest Logo"
            width={160}
            height={50}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Search Bar - visible on desktop only */}
        <div className="w-full flex-1 hidden sm:block sm:max-w-xl">
          <SearchBar />
        </div>

        {/* Icons and Hamburger */}
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

          {/* Avatar for desktop */}
          <Menu as="div" className="relative ">
            <Menu.Button className="flex items-center focus:outline-none">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white ring-2 ring-white transition hover:ring-accent"
                />
              ) : (
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black focus:outline-none">
                <div className="py-2">
                  {session ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(
                              active
                                ? 'bg-accent/90 text-white'
                                : 'text-gray-900',
                              'group flex items-center gap-3 rounded-md px-5 py-3 text-sm font-medium'
                            )}
                          >
                            <User className="h-4 w-4" />
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>

                      {session.user?.role !== 'admin' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/orders"
                              className={classNames(
                                active
                                  ? 'bg-accent/90 text-white'
                                  : 'text-gray-900',
                                'group flex items-center gap-3 rounded-md px-5 py-3 text-sm font-medium'
                              )}
                            >
                              <Truck className="h-4 w-4" />
                              Track Orders
                            </Link>
                          )}
                        </Menu.Item>
                      )}

                      {session.user?.role === 'admin' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/admin"
                              className={classNames(
                                active
                                  ? 'bg-accent/90 text-white'
                                  : 'text-gray-900',
                                'group flex items-center gap-3 rounded-md px-5 py-3 text-sm font-medium'
                              )}
                            >
                              <ShieldCheck className="h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                      )}

                      <div className="my-2 border-t border-gray-200" />

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={classNames(
                              active ? 'bg-red-600 text-white' : 'text-red-600',
                              'group flex w-full items-center gap-3 rounded-md px-5 py-3 text-sm font-medium'
                            )}
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signIn()}
                          className={classNames(
                            active ? 'bg-blue-600 text-white' : 'text-blue-600',
                            'group flex w-full items-center gap-3 rounded-md px-5 py-3 text-sm font-medium'
                          )}
                        >
                          <LogIn className="h-4 w-4" />
                          Login
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Hamburger for mobile */}
          <Menu as="div" className="relative sm:hidden">
            <Menu.Button className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none space-y-4">
                <div>
                  <SearchBar />
                </div>
                <div className="space-y-2 text-sm font-medium text-gray-700">
                  <Link href="/" className="block hover:text-primary">Home</Link>
                  <Link href="/shop" className="block hover:text-primary">Shop</Link>
                  <Link href="/about" className="block hover:text-primary">About</Link>
                </div>
                <div className="border-t pt-2">
                  {session ? (
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => signIn()}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-blue-600 hover:bg-gray-100"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </button>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Sticky Nav Links - desktop only */}
      <nav className="bg-primary border-t border-white hidden sm:block">
        <ul className="flex flex-wrap justify-center gap-6 py-3 text-sm font-medium text-white sm:gap-8">
          <li><Link href="/" className="hover:text-accent">Home</Link></li>
          <li><Link href="/shop" className="hover:text-accent">Shop</Link></li>
          <li><Link href="/about" className="hover:text-accent">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
