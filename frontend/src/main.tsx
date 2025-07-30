import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
// import { debugSVGCircles } from './utils/debugSVG'

// Start debugging SVG circles - DISABLED TO STOP ERROR SPAM
// debugSVGCircles();

// Override console.error to catch SVG errors - DISABLED
// const originalError = console.error;
// console.error = (...args) => {
//   if (args[0]?.includes?.('attribute cy: Expected length')) {
//     console.trace('SVG Circle Error Stack Trace:');
//   }
//   originalError.apply(console, args);
// };

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)