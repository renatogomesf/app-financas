import { createContext, useState } from "react";

// cria o contexto
export const AuthContext = createContext<any>({});

// provider: provê/fornece as informações para o app.
export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState({
    nome: "teste",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
