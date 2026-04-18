"use client";
import React, { useState, useEffect } from "react";
import GlobalLoader from "./GlobalLoader";

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial entry loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalLoader loading={loading} />
      {!loading && children}
    </>
  );
}
