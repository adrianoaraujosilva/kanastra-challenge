import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import * as Components from "./presentation/components";
import {BaseLayoutTag} from "@/presentation/layout";
import {makeBankSlip, makeDashboard} from "@/main/factories/pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayoutTag/>}>
            <Route path="/" element={makeDashboard()}/>
            <Route path="boletos" element={makeBankSlip()}/>
            <Route
              path="upload"
              element={<Components.FileUploader file={"" as any}/>}
            />
          </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
