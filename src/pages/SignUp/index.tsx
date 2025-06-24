import { useContext, useState } from "react";

import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {

    if(!nome || !password || !email){
      alert("preencha todos os campos")
      return
    }

    signUp(nome, password, email);
  }

  return (
    <View className="flex-1 bg-[#f0f4ff]">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        enabled
      >
        <View className="w-full items-center">
          <TextInput
            className="mb-[15px] bg-white w-[90%] text-[17px] p-[10px] rounded-[8px] text-[#121212]"
            placeholder="Nome..."
            value={nome}
            onChangeText={(Text) => setNome(Text)}
          />
        </View>

        <View className="w-full items-center">
          <TextInput
            className="mb-[15px] bg-white w-[90%] text-[17px] p-[10px] rounded-[8px] text-[#121212]"
            placeholder="Seu e-mail..."
            value={email}
            onChangeText={(Text) => setEmail(Text)}
          />
        </View>

        <View className="w-full items-center">
          <TextInput
            className="mb-[15px] bg-white w-[90%] text-[17px] p-[10px] rounded-[8px] text-[#121212]"
            placeholder="Sua senha..."
            value={password}
            onChangeText={(Text) => setPassword(Text)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSignUp}
          className="w-[90%] h-[45px] rounded-[8px] bg-[#3b3dbf] mt-[10px] items-center justify-center"
        >
          {loadingAuth ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : (
            <Text className="text-[20px] text-white">Cadastrar</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
