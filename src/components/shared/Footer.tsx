import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto mt-10 w-full px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 py-10 border-b border-gray-700">
          {/* Logo and About */}
          <div>
            <Link href="/">
              <Image src="/medinist.png" alt="MediNest Logo" width={150} height={40} />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Your trusted partner in health. Delivering essentials with care,
              compassion, and convenience—every day.
            </p>
            <div className="flex gap-4 mt-5">
              <Link href="https://facebook.com" target="_blank">
                <Facebook className="hover:text-[#ff6e18]" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Twitter className="hover:text-[#ff6e18]" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="hover:text-[#ff6e18]" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Product</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Service</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/roadmap">Roadmap</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Solutions</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/solutions/process">Process Management</Link></li>
              <li><Link href="/solutions/request">Request Management</Link></li>
              <li><Link href="/solutions/workflow">Workflow Management</Link></li>
              <li><Link href="/solutions/finance">Finance</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary text-center py-4 text-sm text-white">
        © {new Date().getFullYear()} MediNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
