import React from "react";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster style={{ zIndex: "999" }} />
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
