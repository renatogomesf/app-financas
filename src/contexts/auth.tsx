import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// cria o contexto
export const AuthContext = createContext<any>({});

// provider: provê/fornece as informações para o app.
export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@finToken");

      if (storageUser) {
        const response = await api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch(() => {
            setUser(null);
          });

        api.defaults.headers["Authorization"] = `Bearer ${storageUser}`;

        setUser(response?.data);

        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage()
  }, []);

  async function signUp(nome: string, password: string, email: string) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/users", {
        name: nome,
        password: password,
        email: email,
      });

      setLoadingAuth(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email,
      };

      // configura o axios para usar o token retornado
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      await AsyncStorage.setItem("@finToken", token);

      setUser({
        id,
        name,
        email,
      });
      setLoadingAuth(false);
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  // !!user: converte a variável para booleana. se tiver algo dentro, retorna true... se não tiver, retorna false.

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signUp, loadingAuth, signIn, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
