import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import StripeProvider from './StripeProvider.tsx' // import from file


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* wrap your app in StripeProvider */}
    <StripeProvider>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)