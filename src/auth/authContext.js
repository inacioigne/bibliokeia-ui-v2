import { createContext, useEffect, useState } from "react";
import { api } from "src/services/api"
import qs from "qs";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;
  useEffect(() => {
    const { "bibliokeia.token": token } = parseCookies();
    if (token) {
      //Pegar informações do usuario
      setUser({ name: "admin", id: 1 });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  async function signIn(data) {
    const response = await api.post("usuarios/login", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    setCookie(undefined, "bibliokeia.token", response.data.access_token, {
      // maxAge: 60 * 60 * 1,
      path: "/",
    });
    setUser(response.data.user);

    Router.push("/");
  }

  async function signOut(ctx) {
    setUser(null);
    destroyCookie(null, "bibliokeia.token", {
      path: "/",
    });

    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, 
    isAuthenticated, 
    signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );

}
