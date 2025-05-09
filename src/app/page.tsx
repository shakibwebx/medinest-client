import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';
import FeaturedBrandsSlider from '@/components/Home/FeaturedBrand/FeaturedBrandsSlider';
// import HeroSlider from '@/components/Home/HeroSlider/HeroSlider';
// import MediCard from '@/components/Home/MediCard';
// import DealProduct from '@/components/Home/DealProduct';
import HeroBanner from '@/components/Home/HeroBanner';
import FeatureStrip from '@/components/Home/FeatureStrip';
import FeaturedProducts from '@/components/Home/FeaturedProducts';

const Home = () => {
  return (
    <DefaultLayout>
      {/* <HeroSlider /> */}
      <HeroBanner />
      <div className="mx-auto max-w-7xl">
        <FeatureStrip />
        {/* <MediCard /> */}
        <FeaturedBrandsSlider />

        <Featured />
        {/* <DealProduct /> */}
        <FeaturedProducts />

        <Testimonial />
      </div>
    </DefaultLayout>
  );
};

export default Home;
