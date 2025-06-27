import { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function RegisterTypes({
  type,
  sendTypeChanged,
}: {
  type: string;
  sendTypeChanged: any;
}) {
  const [typeCheked, setTypeCheked] = useState(type);

  function changeType(type: string) {
    setTypeCheked(type);
    sendTypeChanged(type);
  }

  return (
    <View className="flex-row w-full px-[5%] justify-between items-center">
      <TouchableOpacity
        onPress={() => changeType("receita")}
        className={`${
          typeCheked === "receita"
            ? "bg-[#fff] border-[#3b3dbf]"
            : "bg-[#e7e7e7] border-transparent"
        } w-[47%] justify-center items-center flex-row h-[45px] rounded-[4px] border-[1.5px]`}
      >
        <AntDesign name="arrowup" size={25} color="#121212" />
        <Text className="ml-[8px] text-[17px]">Receita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => changeType("despesa")}
        className={`${
          typeCheked === "despesa"
            ? "bg-[#fff] border-[#3b3dbf]"
            : "bg-[#e7e7e7] border-transparent"
        } w-[47%] justify-center items-center flex-row h-[45px] rounded-[4px] border-[1.5px]`}
      >
        <AntDesign name="arrowdown" size={25} color="#121212" />
        <Text className="ml-[8px] text-[17px]">Despesa</Text>
      </TouchableOpacity>
    </View>
  );
}
