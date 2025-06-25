import { useContext } from "react";

import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

export default function Home() {
  const { signOut, user } = useContext(AuthContext);

  return (
    // SafeAreaView: garante que o conteúdo não fique por detrás das câmeras caso o aparelho possua a "gota" que invade a tela.
    <SafeAreaView className="flex-1 bg-[#f0f4ff]">
      <Header title={"Minhas movimentações"} />
    </SafeAreaView>
  );
}
