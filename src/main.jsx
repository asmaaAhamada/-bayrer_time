import React, { useState, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import store from './store/store'
import './style.css'

function Root() {
  const [mode, setMode] = useState('light')

  const theme = useMemo(() =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6B5B2A' : '#4A3E1B', // لون Navbar
        contrastText: mode === 'light' ? '#ffffff' : '#ffffff', // لون النص على الـ Navbar
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#996c38ff', // body background
        paper: mode === 'light' ? '#f5f5f5' : '#744106ff',
      },
      text: {
        primary: mode === 'light' ? '#6B5B2A' : '#ffffff',
        secondary: mode === 'light' ? '#4A3E1B' : '#cccccc',
      },
    },
    typography: {
      fontFamily: 'CairoBlack, Arial, sans-serif',
    },
  }), [mode]
)


  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App toggleMode={toggleMode} mode={mode} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
