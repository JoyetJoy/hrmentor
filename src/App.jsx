import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/AdminRoutes";
import { Toaster } from "sonner";
import QueryProvider from "./lib/providers/QueryProvider";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            minHeight: "70px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "15px",
            paddingBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            fontSize: "1rem",
            fontWeight: "500",
          },
        }}
      />
      <QueryProvider>
        <RouterProvider router={appRoutes} />
      </QueryProvider>
    </>
  );
}

export default App;
