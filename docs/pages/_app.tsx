import '@mantine/core/styles.css';
// The rest of the imports below can be commented out if you don't want to use the demo, code highlight, header or logo styles
import '@mantine/code-highlight/styles.css';
import '@mantinex/demo/styles.css';
import '@mantinex/mantine-header/styles.css';
import '@mantinex/mantine-logo/styles.css';
// Comment the line below if you don't want to use default mask styles
import '@gfazioli/mantine-mask/styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import { MantineProvider } from '@mantine/core';
import favicon from '../assets/favicon.svg';
import { Footer } from '../components/Footer';
import { theme } from '../theme';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Mantine Mask</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <Component {...pageProps} />
      </CodeHighlightAdapterProvider>
      <Footer />
    </MantineProvider>
  );
}
