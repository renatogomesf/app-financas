import { View, Text, Alert, TouchableOpacity } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function HistoricoList({ data, deleteItem }: any) {
  function handleDeleteItem() {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja deletar esse registro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => deleteItem(data.id),
        },
      ]
    );
  }

  return (
    <TouchableOpacity onLongPress={handleDeleteItem}>
      <View className="bg-[#f0f3ff] rounded-[4px] mx-[10px] mb-[14px] p-[12px]">
        <View className="flex-row">
          <View
            className={`flex-row py-[4px] px-[8px] rounded-[4px] mb-[2px] ${
              data.type === "receita" ? "bg-[#049301]" : "bg-[#c62c36]"
            } `}
          >
            <AntDesign
              name={data.type === "receita" ? "arrowup" : "arrowdown"}
              size={20}
              color="#fff"
            />
            <Text className="text-[#fff] text-[16px] italic">{data.type}</Text>
          </View>
        </View>

        <Text className="text-[#121212] text-[22px]">R$ {data.value}</Text>

        <Text>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
