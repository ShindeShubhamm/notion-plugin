import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// refresh browser on local storage token delete
window.addEventListener('storage', (e) => {
    if (e.key === 'code') {
        window.location.reload();
    }
});

root.render(
    <Router>
        <App />
    </Router>
);
