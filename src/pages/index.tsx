import Header from '../components/Header';
import Features from '../components/lp/Features';
import Hero from '../components/lp/Hero';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <p className="text-red-500 text-2xl">TEST</p>
    </>
  );
};

export default Home;
