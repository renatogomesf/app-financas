import { createContext, useState } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

// cria o contexto
export const AuthContext = createContext<any>({});

// provider: provê/fornece as informações para o app.
export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState({
    nome: "teste",
  });

  const navigation = useNavigation();

  async function signUp(nome: string, password: string, email: string) {
    try {
      const response = await api.post("/users", {
        name: nome,
        password: password,
        email: email,
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
