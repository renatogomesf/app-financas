import { useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";

import Header from "../../components/Header";
import RegisterTypes from "../../components/RegisterTypes";

import api from "../../services/api";
import { format } from "date-fns";

export default function New() {
  const [labelInput, setLabelInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [type, setType] = useState("receita");

  function handleSubmit() {
    Keyboard.dismiss();

    if (isNaN(parseFloat(valueInput)) || type === null) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert(
      "Confirmando dados",
      `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleAdd(),
        },
      ]
    );
  }

  async function handleAdd() {
    Keyboard.dismiss();

    await api.post("/receive", {
      description: labelInput,
      value: Number(valueInput),
      type: type,
      date: format(new Date(), "dd/MM/yyyy"),
    });

    setLabelInput("");
    setValueInput("");
  }

  return (
    // TouchableWithoutFeedback + Keyboard.dismiss(): fecha o teclado quando clicamos fora de um input ou botão.
    // TouchableWithoutFeedback: é um botão sem feedback. ou seja, não indica que foi clicado
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-[#f0f4ff]">
        <Header title={"Registrando"} />

        <SafeAreaView className="mt-[14px], items-center">
          <TextInput
            className="h-[50px] w-[90%] bg-white text-[17px] px-[8px] mb-[14px] rounded-[4px]"
            placeholder="Descrição desse registro"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />
          <TextInput
            className="h-[50px] w-[90%] bg-white text-[17px] px-[8px] mb-[14px] rounded-[4px]"
            placeholder="Valor desejado"
            keyboardType="number-pad"
            value={valueInput}
            onChangeText={(text) => setValueInput(text)}
          />

          <RegisterTypes
            type={type}
            sendTypeChanged={(item: any) => setType(item)}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.7}
            className="w-[90%] h-[50px] rounded-[4px] bg-[#00b94a] mt-[10px] items-center justify-center"
          >
            <Text className="text-[21px] text-white font-bold">Registrar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
