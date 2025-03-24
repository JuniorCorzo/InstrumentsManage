import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/home.page";
import { BrowserRouter, Route, Routes } from "react-router";
import { clientQuery } from "./states/client/client-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <QueryClientProvider client={clientQuery}>
              <Home />
              <ReactQueryDevtools />
            </QueryClientProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
