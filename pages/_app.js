import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'
import * as V from 'victory';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <>
      <MantineProvider
        theme={{
          fontFamily: 'font-family: "Outfit", sans-serif',
          fontFamilyMonospace: 'font-family: "Outfit", sans-serif',
          headings: { fontFamily: 'font-family: "Outfit", sans-serif' },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
  </>
}

export default MyApp
