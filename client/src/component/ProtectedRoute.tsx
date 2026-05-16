// src/components/ProtectedRoute.tsx

import {  useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

type Status =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const checkUser = async () => {
      try {
         await axios.get(
          "http://localhost:3000/me",
          {
            withCredentials: true,
          }
        );

        setStatus("authenticated");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setStatus("unauthenticated");
          } else {
            setStatus("error");
          }
        } else {
          setStatus("error");
        }
      }
    };

    checkUser();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Server unavailable</p>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <>{children}</>;
}