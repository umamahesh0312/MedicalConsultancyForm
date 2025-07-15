import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Main application component
export default function App({ Component, pageProps }: AppProps) {
  // Render the component for the current page with its props
  return <Component {...pageProps} />;
}
