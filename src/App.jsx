import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/AdminRoutes";
import { Toaster } from "sonner";
import QueryProvider from "./lib/providers/QueryProvider";

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
