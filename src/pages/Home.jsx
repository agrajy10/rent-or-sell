import { Link } from 'react-router-dom';
import heroSectionBg from '../assets/images/hero-section-bg.jpg';

function Home() {
  return (
    <main>
      <section className="w-full h-[40rem] md:h-[50rem] relative">
        <img src={heroSectionBg} alt="" className="w-full h-full object-cover" />
        <div className="bg-black opacity-40 absolute inset-0"></div>
        <div className=" w-full p-7 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-none mb-8 max-w-4xl mx-auto">
            Rent or sell your house at <span className="font-black">best price</span>.
          </h2>
          <Link
            to="/login"
            className="btn bg-white text-neutral normal-case hover:bg-gray-200 hover:text-neutral mx-2 mb-4 w-48">
            List your house
          </Link>
          <button type="button" className="btn btn-primary normal-case mx-2 mb-4 w-48">
            Explore
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
