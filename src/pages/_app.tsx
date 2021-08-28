import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
