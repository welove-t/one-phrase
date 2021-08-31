import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';
import UserProvider from '../context/userContext';
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Footer />
      <Toaster />
    </UserProvider>
  );
};

export default MyApp;
