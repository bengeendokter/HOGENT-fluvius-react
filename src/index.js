import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DoelstellingProvider } from "./contexts/DoelstellingProvider";
import { RolProvider } from "./contexts/RolProvider";
import { SdgProvider } from "./contexts/SdgProvider";
import { CategorieProvider } from "./contexts/CategorieProvider";
import { DataProvider } from "./contexts/DataProvider";
import { TemplatesProvider } from "./contexts/TemplatesProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import "tw-elements";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <CategorieProvider>
          <SdgProvider>
            <RolProvider>
              <TemplatesProvider>
                <DoelstellingProvider>
                  <App />
                </DoelstellingProvider>
              </TemplatesProvider>
            </RolProvider>
          </SdgProvider>
        </CategorieProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();