import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";

export default function Header({ title }: { title: string }) {

    const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-row items-center justify-start mt-[30px] ml-[15px] mb-[15px] w-full max-h-[60px]">
      <TouchableOpacity onPress={()=> navigation.openDrawer()} className="items-center justify-center">
        <Entypo name="menu" size={35} color="#121212" />
      </TouchableOpacity>
      {title && <Text className="text-[22px] ml-[8px]">{title}</Text>}
    </SafeAreaView>
  );
}
