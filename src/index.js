import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {ToastProvider} from 'react-toast-notifications';
import "tw-elements";
import App from "./App";
import {AuthProvider} from "./contexts/AuthProvider";
import {CategorieProvider} from "./contexts/CategorieProvider";
import {DataProvider} from "./contexts/DataProvider";
import {DatasourceProvider} from "./contexts/DatasourceProvider";
import {DoelstellingProvider} from "./contexts/DoelstellingProvider";
import {RolProvider} from "./contexts/RolProvider";
import {SdgProvider} from "./contexts/SdgProvider";
import {TemplatesProvider} from "./contexts/TemplatesProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";



createRoot(document.getElementById("root")).render(
  <ToastProvider placement='bottom-right' autoDismissTimeout='7000'>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CategorieProvider>
            <SdgProvider>
              <RolProvider>
                <TemplatesProvider>
                  <DoelstellingProvider>
                    <DatasourceProvider>
                      <App />
                    </DatasourceProvider>
                  </DoelstellingProvider>
                </TemplatesProvider>
              </RolProvider>
            </SdgProvider>
          </CategorieProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </ToastProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
