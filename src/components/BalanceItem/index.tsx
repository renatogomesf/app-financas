import { useMemo } from "react";

import { View, Text } from "react-native";

export default function BalanceItem({ data }: any) {
  const labelName = useMemo(() => {
    if (data.tag === "saldo") {
      return {
        label: "Saldo atual",
        color: "bg-[#3b3dbf]",
      };
    } else if (data.tag === "receita") {
      return {
        label: "Entradas de Hoje",
        color: "bg-[#00b94a]",
      };
    } else {
      return {
        label: "Saídas de Hoje",
        color: "bg-[#ef463a]",
      };
    }
  }, []);

  return (
    <View
      className={`mx-[14px] rounded-[4px] justify-center items-start w-[300px] pl-[14px] ${labelName.color}`}
    >
      <Text className="text-[#fff] text-[19px] font-bold">
        {labelName.label}
      </Text>
      <Text className="mt-[5px] text-[#fff] text-[30px]">R$ {data.saldo}</Text>
    </View>
  );
}
