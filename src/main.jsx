import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./components/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>

  </StrictMode>,
)
