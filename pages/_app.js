import "@/styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContexts";
import Header from "@/components/Header";
import { Container } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
