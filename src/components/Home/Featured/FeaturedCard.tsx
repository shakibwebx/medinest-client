import { Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import './featured.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { IMedicine } from '@/types';
import Link from 'next/link';

interface FeaturedCardProps {
  product: IMedicine;
}

const FeaturedCard = ({ product }: FeaturedCardProps) => {
  const { _id, name, imageUrl, price, discount } = product || {};

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  // Function to calculate total percentage after discount
  const calculateTotalPrice = ({
    price,
    discount,
  }: {
    price: number;
    discount: number;
  }) => {
    const discountedAmount = price * (discount / 100);

    const discountedPrice = price - discountedAmount;

    return {
      discountedPrice: discountedPrice,
    };
  };

  const result = calculateTotalPrice({ price, discount });

  return (
    <>
      <div className="group max-w-[377px] cursor-pointer">
        <Link href={`/shop/${_id}`}>
          <div className="relative">
            <div>
              <Image
                src={imageUrl || '/src/assets/placeholder.png'}
                alt=""
                width={280}
                height={280}
                sizes="100vw"
                className="relative aspect-square w-full rounded-2xl transition-all duration-200 ease-in-out group-hover:shadow-[rgba(0,_0,_0,_0.25)_0px_15px_40px_-12px]"
              />
              {/* sale label */}
              {discount > 0 ? (
                <div className="absolute top-4 left-5 rounded-md bg-blue-600 px-2.5 py-1 text-white">
                  Sale
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="absolute right-4 bottom-4 z-[999] flex flex-col gap-2 opacity-0 group-hover:opacity-100">
              <button className="text-md max-h-fit w-fit cursor-pointer rounded-[4px] bg-white p-[6px] text-black shadow-md">
                <Heart />
              </button>
              <button className="text-md max-h-fit w-fit cursor-pointer rounded-[4px] bg-white p-[6px] text-black shadow-md">
                <Share2 />
              </button>
            </div>
          </div>
        </Link>
        <div>
          <h3 className="mt-2 mb-1 ml-1 line-clamp-1 text-xl font-bold">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              {/* Price */}
              <div className="ml-1">
                {discount ? (
                  <div className="flex flex-row-reverse items-center gap-2">
                    <del className="text-gray-500">${price}</del>
                    <p className="text-[22px] font-bold text-blue-600">
                      ${result.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-[22px] font-bold text-blue-600">
                    ${price}
                  </p>
                )}
              </div>
            </div>
            {/* Add to cart */}
            <div className="w-[38%] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <button
                onClick={handleAddToCart}
                className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-white transition-all duration-200 ease-linear hover:bg-blue-900"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCard;
