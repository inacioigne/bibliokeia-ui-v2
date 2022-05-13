import { createContext, useEffect, useState } from "react";
import { api } from "src/services/api";
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
      const payload = token.split(".")[1];
      //console.log('TK: ', JSON.parse(window.atob(payload)))
      setUser(JSON.parse(window.atob(payload)));
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  async function signIn(data, alert, setLoading) {
    //setLoading(true)
    api.post("usuarios/login", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('LG: ', res)
        setCookie(undefined, "bibliokeia.token", res.data.access_token, {
          // maxAge: 60 * 60 * 1,
          path: "/",
        })
        setUser(res.data.user)
        Router.push("/");
      }
    })
    .catch((error) => {
      if (error.response.status === 403) {
        setLoading(false);
        alert({
          visible: true,
          msg: error.response.data.detail,
          severity: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    });
    

   
  }

  async function signOut(ctx) {
    setUser(null);
    destroyCookie(null, "bibliokeia.token", {
      path: "/",
    });

    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
