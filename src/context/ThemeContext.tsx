import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeMode } from '../types';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT;
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => 
      prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    );
  };

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: mode === ThemeMode.LIGHT ? 'light' : 'dark',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#00796b',
        },
        error: {
          main: '#d32f2f',
        },
        warning: {
          main: '#ffab00',
        },
        success: {
          main: '#2e7d32',
        },
        background: {
          default: mode === ThemeMode.LIGHT ? '#f5f5f5' : '#121212',
          paper: mode === ThemeMode.LIGHT ? '#ffffff' : '#1e1e1e',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontSize: '2.5rem',
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: 1.2,
        },
        body1: {
          lineHeight: 1.5,
        },
        body2: {
          lineHeight: 1.5,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: 'none',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              boxShadow: mode === ThemeMode.LIGHT 
                ? '0 4px 12px rgba(0, 0, 0, 0.05)' 
                : '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              marginBottom: 16,
            },
          },
        },
      },
      shape: {
        borderRadius: 8,
      },
    }),
  [mode]);

  const value = { mode, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};