import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { useNavigation } from "@react-navigation/native";

import { Text, SafeAreaView, TouchableOpacity } from "react-native";

import Header from "../../components/Header";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-[#f0f4ff] items-center">
      <Header title={"Meu perfil"} />

      <Text className="text-[18px] font-bold mt-[24px]">
        Hey, bem vindo de volta!
      </Text>

      {/* numberOfLines: definite quantas linhas o texto ocupa. neste caso está sendo usado para o nome não quebrar linha */}
      <Text
        className="text-[24px] mb-[24px] mt-[8px] px-[14px] text-[#121212]"
        numberOfLines={1}
      >
        {user && user.name}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Registrar")}
        className="bg-[#3b3dbf] w-[90%] h-[45px] rounded-[8px] items-center justify-center mb-[14px]"
      >
        <Text className="text-[18px] font-bold text-[#fff]">
          Fazer registro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => signOut()}
        className="w-[90%] h-[45px] rounded-[8px] items-center justify-center border-[1px] border-[#c62c36]"
      >
        <Text className="text-[18px] font-bold text-[#c62c36]">Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
