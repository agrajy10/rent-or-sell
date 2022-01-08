import { Link } from 'react-router-dom';

import heroSectionBg from '../../assets/images/hero-section-bg.jpg';

function HeroSection() {
  return (
    <section className="relative h-[50rem] bg-white">
      <div className="w-full lg:w-1/2 h-full absolute top-0 right-0 bg-black">
        <img src={heroSectionBg} alt="" className="w-full h-full object-cover opacity-70" />
      </div>
      <div className="max-w-7xl mx-auto px-3 h-full flex items-center">
        <div className="text-center lg:w-1/2 lg:text-left lg:pr-16 relative z-40">
          <h1 className=" text-white lg:text-gray-900 text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8">
            Rent or sell house at best price.{' '}
          </h1>
          <p className="text-white lg:text-gray-600 leading-loose mb-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quia tenetur consectetur
            voluptas deleniti iure quas aliquam laboriosam fuga quos.
          </p>
          <Link to="/login" className="btn btn-secondary normal-case sm:mr-2 mb-4 w-48">
            List your house
          </Link>
          <button type="button" className="btn btn-primary normal-case mb-4 w-48">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
