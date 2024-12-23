//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

//// If you want to start measuring performance in your app, pass a function
//// to log results (for example: reportWebVitals(console.log))
//// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure index.css exists
import App from './App'; // Ensure App.js exists and has the correct default export
import reportWebVitals from './reportWebVitals'; // Ensure this file exists and has the correct content

// Get the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app within React.StrictMode to catch potential issues in development
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to measure performance in your app, use the reportWebVitals function
reportWebVitals();
