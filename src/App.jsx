import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/Routes";
import QueryProvider from "./lib/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <QueryProvider>
        <RouterProvider router={appRoutes} />
      </QueryProvider>
    </>
  );
}

export default App;
