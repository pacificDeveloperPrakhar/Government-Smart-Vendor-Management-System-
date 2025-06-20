import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {Provider} from "react-redux"
import './index.css';
import  "./custom_style.css"
import {LoadingBarContainer} from "react-top-loading-bar"
import store from "./store.jsx";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(

      <Provider store={store}>

    <LoadingBarContainer>
    <App />
      </LoadingBarContainer>
      </Provider>

);