// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './utils/usercontext';
import './index.css';
import { Toaster } from "sonner";
import { BrowserRouter } from 'react-router-dom';
// Create root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <Toaster richColors position="top-right" /> 
    </UserProvider>
 </BrowserRouter>
);