import { useState } from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { Calendar, LocaleConfig } from "react-native-calendars";

export default function CalendarModal({ setVisible, handleFilter }: any) {
  const [dateNow, setDateNow] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  function handleOnDayPress(date: any) {
    setDateNow(new Date(date.dateString));

    let markedDay: any = {};

    markedDay[date.dateString] = {
      selected: true,
      selectedColor: "#3b3dbf",
      textColor: "#fff",
    };

    setMarkedDates(markedDay);
  }

  function handleFilterDate() {
    handleFilter(dateNow);
    setVisible();
  }

  return (
    <View className="flex-1 bg-[rgba(34,34,34,0.4)]">
      <TouchableWithoutFeedback onPress={() => setVisible()}>
        <View className="flex-1"></View>
      </TouchableWithoutFeedback>

      <View className="flex-[2] bg-[#fff] justify-center p-[14px]">
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          enableSwipeMonths={true}
          theme={{
            todayTextColor: "#ff0000",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#fff",
          }}
        />

        <TouchableOpacity
          onPress={handleFilterDate}
          className="rounded-[4px] bg-[#3b3dbf] h-[45px] items-center justify-center"
        >
          <Text className="text-[#fff] text-[19px] font-bold">Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
