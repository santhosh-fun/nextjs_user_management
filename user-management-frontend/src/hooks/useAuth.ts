// src/hooks/useAuth.ts

export const useAuth = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return { isAuthenticated };
};
