'use client';

import { Truck, RotateCcw, CreditCard, Gift } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: 'Free Shipping',
    desc: 'On all orders over $49.00',
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-primary" />,
    title: '15 Days Returns',
    desc: 'On all orders over $49.00',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: 'Secure Checkout',
    desc: 'On all orders over $49.00',
  },
  {
    icon: <Gift className="w-8 h-8 text-primary" />,
    title: 'Offer & Gifts',
    desc: 'On all orders over $49.00',
  },
];

const FeatureStrip = () => {
  return (
    <section className="bg-[#f5f5f5] py-8 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-2 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary"
          >
            {item.icon}
            <h4 className="text-[#1d1115] font-semibold text-lg">{item.title}</h4>
            <p className="text-sm text-[#1d1115]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureStrip;
