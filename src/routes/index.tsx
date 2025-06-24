import { useContext } from "react";

import { View, Text, ActivityIndicator } from "react-native";

import { AuthContext } from "../contexts/auth";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4ff",
        }}
      >
        <ActivityIndicator size={100} color={"#131313"} />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
