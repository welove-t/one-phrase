import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';
import UserProvider from '../context/userContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
};

export default MyApp;
