'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const textContainer = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HeroBanner = () => {
  return (
    <motion.section
      className="bg-[#e3fff4] py-16 px-6 md:px-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
        
        {/* Text Area */}
        <motion.div
          className="text-center md:text-left max-w-xl"
          variants={textContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h4
            variants={textItem}
            className="text-secondary text-sm md:text-base font-medium uppercase mb-2"
          >
            Today Hot Offer
          </motion.h4>

          <motion.h2
            variants={textItem}
            className="text-3xl md:text-5xl font-bold text-[#1d1115] leading-tight"
          >
            Buy all your <span className="text-primary">Medicines</span> at{' '}
            <span className="text-accent">50% Off</span>
          </motion.h2>

          <motion.p
            variants={textItem}
            className="text-[#1d1115] mt-4"
          >
            Shop with ease and trust at MediNest. Fast delivery, reliable service.
          </motion.p>

          <motion.button
            variants={textItem}
            whileHover={{ scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}
            className="mt-6 bg-primary hover:bg-secondary text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Shop Now!
          </motion.button>
        </motion.div>

        {/* Image Area */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full"
          >
            <Image
              src="/hero-image.png"
              alt="Hero Image"
              width={600}
              height={600}
              quality={100}
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
