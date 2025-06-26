
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Clerk configuration - user needs to provide VITE_CLERK_PUBLISHABLE_KEY
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// For now, render the app without Clerk until user provides the key
// Once user provides the key, we'll wrap the app with ClerkProvider
if (CLERK_PUBLISHABLE_KEY) {
  // When user provides the key, we'll import and use ClerkProvider here
  console.log('Clerk key detected, ready for authentication setup');
}

createRoot(document.getElementById("root")!).render(<App />);
