import HeroSection from './HeroSection';
import BrowseByCateogry from './BrowseByCategory';
import ForSaleSection from './ForSaleSection';
import ForRentSection from './ForRentSection';

function Home() {
  return (
    <main>
      <HeroSection />
      <BrowseByCateogry />
      <section className="max-w-7xl mx-auto px-3 lg:pb-24 md:pb-20 pb-14">
        <ForSaleSection />
      </section>
      <section className="max-w-7xl mx-auto px-3 lg:pb-24 md:pb-20 pb-14">
        <ForRentSection />
      </section>
    </main>
  );
}

export default Home;
