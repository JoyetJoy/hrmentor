import React from "react";

export default function Loader() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
    </div>
  );
}
