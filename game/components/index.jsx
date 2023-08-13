import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Components from "./Components";


// Render your React component instead
const root = createRoot(document.getElementById('qr-connection'));
root.render(<StrictMode><Components /></StrictMode>);