import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'lib/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

// refresh browser on local storage token delete
window.addEventListener('storage', (e) => {
    if (e.key === 'notion') {
        window.location.reload();
    }
});

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
