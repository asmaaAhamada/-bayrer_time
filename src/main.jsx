import React, { useState, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import store from './store/store'
// import './style.css'

function Root() {
  const [mode, setMode] = useState('light')

 const theme = useMemo(() =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#8B6F47' : '#C8A97E',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#F3EFE7' : '#121212', // لون الـ Body
        paper: mode === 'light' ? '#ffffff' : '#1E1E1E',  // البطاقات – Cards
      },
      text: {
        primary: mode === 'light' ? '#2D2D2D' : '#EDEDED',
        secondary: mode === 'light' ? '#5A4F3E' : '#B8B8B8',
      },
    },
    typography: {
      fontFamily: 'CairoBlack, Arial, sans-serif',
    },
  }),
  [mode]
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
