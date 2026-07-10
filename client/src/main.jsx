import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { fontFamily: 'var(--font-sans)', fontSize: '14px' },
            success: { iconTheme: { primary: 'var(--primary)', secondary: '#fff' } },
          }}
        />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
