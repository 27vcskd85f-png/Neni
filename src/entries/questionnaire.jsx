import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Questionnaire from '../pages/Questionnaire';
import '../styles/base.css';
import '../styles/layout.css';

createRoot(document.getElementById('root')).render(<StrictMode><Questionnaire /></StrictMode>);
