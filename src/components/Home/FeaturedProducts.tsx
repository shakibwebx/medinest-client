'use client';

import Image from 'next/image';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { IMedicine } from '@/types';

const FeaturedProducts = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const medicines: IMedicine[] = data?.data?.data || [];

  const featuredProducts = medicines
    .slice()
    .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
    .slice(0, 9);

  return (
    <section className="bg-[#f1f9f7] py-14 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">Featured Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featuredProducts.map((product) => {
            const oldPrice = product.originalPrice || product.price * 1.2;
            const discount = Math.round(((oldPrice - product.price) / oldPrice) * 100);

            return (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Image
                  src={product.imageUrl || '/placeholder-image.png'}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md w-20 h-20 object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {'★'.repeat(4)}☆
                    <span className="text-xs text-gray-500 ml-1">(24)</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mt-1">{product.name}</h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-md font-bold text-[#009966]">
                      ৳{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      ৳{oldPrice.toFixed(2)}
                    </span>
                  </div>

                  <span className="inline-block bg-[#d1fae5] text-[#059669] text-xs font-medium px-2 py-0.5 rounded mt-1">
                    -{discount}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
