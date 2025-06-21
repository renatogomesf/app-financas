import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../dtos/routes";

export default function SignIn() {
  // Platform.OS: permite veririficar qual sistema operacional o app está sendo usado e tomar decisões a partir dai.

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 bg-[#f0f4ff]">
      {/* KeyboardAvoidingView: movimenta a interface do app quando o teclado aparece. no androide já acontece por padrão. porêm, no iOS, não. por isso precisa dessa tag específica. */}

      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        enabled
      >
        <Image
          className="mb-[25px]"
          source={require("../../assets/Logo.png")}
        />

        <View className="w-full items-center">
          <TextInput
            className="mb-[15px] bg-white w-[90%] text-[17px] p-[10px] rounded-[8px] text-[#121212]"
            placeholder="E-mail..."
          />
        </View>
        <View className="w-full items-center">
          <TextInput
            className="mb-[15px] bg-white w-[90%] text-[17px] p-[10px] rounded-[8px] text-[#121212]"
            placeholder="Senha..."
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[90%] h-[45px] rounded-[8px] bg-[#3b3dbf] mt-[10px] items-center justify-center"
        >
          <Text className="text-[20px] text-white">Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-[30px] mb-[10px]"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className="text-[#171717]">Criar uma conta!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
