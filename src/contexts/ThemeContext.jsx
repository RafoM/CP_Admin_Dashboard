import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const theme = useMemo(() => createTheme({ palette: { mode: dark ? 'dark' : 'light' } }), [dark]);
  const toggle = () => setDark(d => !d);
  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
