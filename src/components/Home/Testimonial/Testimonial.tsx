'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Sarah W.',
    image: '/user-1.jpeg',
    rating: 5,
    review:
      'Medinest has been a lifesaver! I received my medications on time, and the packaging was very secure. I’ll definitely reorder from here.',
    item: 'Amoxicillin 500mg Capsules',
    price: '৳12.50',
    itemImage: '/products/amoxicillin.png',
  },
  {
    name: 'Daniel R.',
    image: '/user-2.jpeg',
    rating: 5,
    review:
      'Excellent customer service and super fast delivery! My vitamin supplements arrived the next day. Highly recommend Medinest!',
    item: 'Vitamin C 1000mg Tablets',
    price: '৳9.99',
    itemImage: '/products/vitamin-c.png',
  },
  {
    name: 'Priya K.',
    image: '/user-3.jpeg',
    rating: 5,
    review:
      'The best online pharmacy I’ve used so far. Very easy to place an order, and the medication details were clear and trustworthy.',
    item: 'Paracetamol Extra Strength 500mg',
    price: '৳6.75',
    itemImage: '/products/paracetamol.png',
  },
];

const Testimonial = () => {
  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-4xl font-bold text-accent">Happy Customers</h2>
      <div className="relative mx-auto max-w-7xl px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          pagination={{ clickable: true }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="mx-auto max-w-4xl rounded-2xl border p-8 shadow-md md:flex md:justify-between md:gap-8">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {t.name}{' '}
                    <span className="text-sm text-gray-500 italic">Verified Buyer</span>
                  </h3>
                  <div className="mt-2 text-green-600">{'★'.repeat(t.rating)}</div>
                  <p className="mt-4 text-gray-700 text-sm md:text-base">{t.review}</p>
                </div>
                <div className="mt-6 flex items-center gap-4 md:mt-0">
                  {/* Uncomment this when using next/image */}
                  {/* <Image src={t.itemImage} alt={t.item} width={50} height={50} className="rounded" /> */}
                  <div>
                    <p className="text-xs text-gray-600">Item purchased:</p>
                    <p className="text-sm font-semibold text-black">{t.item}</p>
                    <p className="text-sm font-bold text-black">{t.price}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-4 text-center" />
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
