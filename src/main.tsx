
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/blogAnimations.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <BrowserRouter>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
