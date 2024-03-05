import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BaseLayoutTag } from "@/presentation/layout";
import { makeBankSlip, makeDashboard } from "@/main/factories/pages";
import { ProvidersTag } from "@/presentation/providers";
import { makeImportFile } from "./main/factories/pages/import-file";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvidersTag>
        <Routes>
          <Route path="/" element={<BaseLayoutTag />}>
            <Route path="/" element={makeDashboard()} />
            <Route path="boletos" element={makeBankSlip()} />
            <Route path="upload" element={makeImportFile()} />
          </Route>
        </Routes>
      </ProvidersTag>
    </BrowserRouter>
  </React.StrictMode>
);
