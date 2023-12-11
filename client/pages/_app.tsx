import { AppProps } from 'next/app';
import '../styles/global.css';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { accessToken } = parseCookies();
    const openRoutes = ['/signin', '/signup'];

    if (!accessToken && !openRoutes.includes(router.pathname)) {
      router.push('/signin');
    }
  }, []);
  return (
    <ThemeProvider enableSystem attribute="data-theme">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
