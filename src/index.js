import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './index.css'
import { FirebaseContextProvider } from './context/Firebase'

ReactDOM.render(
    <FirebaseContextProvider>
        <App />
    </FirebaseContextProvider>
    , document.getElementById('root'));

