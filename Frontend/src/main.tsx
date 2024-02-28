import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as Components from "./components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Components.Layout />}>
          <Route path="boletos" element={<Components.Boletos />} />
          <Route
            path="upload"
            element={<Components.FileUploader file={"" as any} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
