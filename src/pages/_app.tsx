import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';
import UserProvider from '../context/userContext';
import { Toaster } from 'react-hot-toast';
import BottomNavi from '../components/all/BottomNavi';

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Footer />
      <BottomNavi />
      <Toaster />
    </UserProvider>
  );
};

export default MyApp;
