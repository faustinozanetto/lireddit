import { CSSReset, ChakraProvider, Box } from '@chakra-ui/react';
import React from 'react';

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Box w='100%' h='100%' bgGradient='linear(whitesmoke 0%, white 25%)'>
        <CSSReset />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
