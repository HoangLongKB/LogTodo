import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { StoreProvider } from './store'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "logtodo-kb.firebaseapp.com",
  projectId: "logtodo-kb",
  storageBucket: "logtodo-kb.appspot.com",
  messagingSenderId: "446546750832",
  appId: "1:446546750832:web:09d21878d0a4ec9e0fb3b5",
  measurementId: "G-34DNES999P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

reportWebVitals();
