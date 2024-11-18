import React, { ReactNode } from "react";
import { notFound } from "next/navigation";

const DevLayout = ({children}: {children:ReactNode}) => {
  // Redirect to 404 if not in development mode
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <>{children}</>;
}

export default DevLayout;