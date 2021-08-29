import Header from '../components/Header';
import Features from '../components/lp/Features';
import Hero from '../components/lp/Hero';
import Recently from '../components/lp/Recently';
import Step from '../components/lp/Step';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Step />
      <Recently />
      <p className="text-red-500 text-2xl">TEST</p>
    </>
  );
};

export default Home;
