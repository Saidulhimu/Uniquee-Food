import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { WishlistProvider } from './providers/WishlistProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#5C162E',
                  color: '#FFF8E7',
                  border: '1px solid #D8C3A5',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '14px',
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
