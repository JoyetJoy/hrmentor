import React from "react";
import { appRoutes } from "./routes/AdminRoutes";

import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
