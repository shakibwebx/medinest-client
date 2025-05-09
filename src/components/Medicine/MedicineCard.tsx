'use client';

import { IMedicine } from '@/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
// import { cn } from '@/lib/utils';

interface Props {
  medicine: IMedicine;
}

export default function MedicineCard({ medicine }: Props) {
  const {
    _id,
    name,
    price,
    discount,
    quantity,
    type,
    categories,
    imageUrl,
  } = medicine;

  const calculateTotalPrice = ({
    price,
    discount,
  }: {
    price: number;
    discount: number;
  }) => {
    const discountedAmount = price * (discount / 100);
    const discountedPrice = price - discountedAmount;
    return { discountedPrice };
  };

  const result = calculateTotalPrice({ price, discount });

  return (
    <div className="group relative flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={name}
          width={300}
          height={100}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="truncate text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-muted-foreground capitalize">
          {type} &middot; {quantity} units
        </p>

        {discount ? (
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">
              ৳{result.discountedPrice.toFixed(2)}
            </p>
            <del className="text-sm text-gray-500">৳{price.toFixed(2)}</del>
          </div>
        ) : (
          <p className="text-xl font-bold text-primary">৳{price.toFixed(2)}</p>
        )}

        {categories?.length > 0 && (
          <p className="text-xs text-gray-500">Category: {categories[0]}</p>
        )}
      </div>

      <Link href={`/shop/${_id}`} className="mt-4 w-full">
        <Button className="w-full transition-all duration-200 hover:scale-[1.02]">
          View Details
        </Button>
      </Link>
    </div>
  );
}
