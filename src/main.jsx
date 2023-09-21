import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-41f0rmcrcghjcohc.us.auth0.com"
    clientId="Gu49CpyKCfrFsjGhTntqwuaLuwp0dSwc"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
//dev-41f0rmcrcghjcohc.us.auth0.com
//Gu49CpyKCfrFsjGhTntqwuaLuwp0dSwc
