import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThankYou from '../pages/ThankYou';
import '../styles/base.css';
import '../styles/layout.css';

createRoot(document.getElementById('root')).render(<StrictMode><ThankYou /></StrictMode>);
