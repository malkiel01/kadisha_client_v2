// RTL.jsx
import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import stylisPluginRtl from 'stylis-plugin-rtl';

// Create a cache that forces RTL.
const cacheRtl = createCache({
  key: 'muirtl',
  prepend: true,
  stylisPlugins: [stylisPluginRtl],
});

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
});

export default function RTL(props) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  );
}
