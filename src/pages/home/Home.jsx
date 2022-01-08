import HeroSection from './HeroSection';

function Home() {
  return (
    <main>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 text-center font-bold lg:mb-20 mb-16">
          All listings
        </h2>
        <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3"></div>
      </section>
    </main>
  );
}

export default Home;
