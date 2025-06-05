// usePreviousPath.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousPath() {
  const location = useLocation();
  const prevPathRef = useRef(null);

  useEffect(() => {
    prevPathRef.current = location.pathname + location.search;
  }, [location]);

  return prevPathRef.current;
}
