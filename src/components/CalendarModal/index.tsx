import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export default function CalendarModal({ setVisible }: any) {
  return (
    <View className="flex-1 bg-[rgba(34,34,34,0.4)]">
      <TouchableWithoutFeedback onPress={() => setVisible()}>
        <View className="flex-1"></View>
      </TouchableWithoutFeedback>

      <View className="flex-[2] bg-[#fff] justify-center p-[14px]">
        <TouchableOpacity className="rounded-[4px] bg-[#3b3dbf] h-[45px] items-center justify-center">
          <Text className="text-[#fff] text-[19px] font-bold">Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
