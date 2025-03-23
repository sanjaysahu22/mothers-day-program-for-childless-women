// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './utils/usercontext';
import './index.css';
import { Toaster } from "sonner";
// Create root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <Toaster richColors position="top-right" /> 
    </UserProvider>
  </React.StrictMode>
);