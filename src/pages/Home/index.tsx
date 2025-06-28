import { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

import api from "../../services/api";

import { format } from "date-fns";

// verifica se você está na tela. se sim retorna true... se não, retorna false
import { useIsFocused } from "@react-navigation/native";

import BalanceItem from "../../components/BalanceItem";

import HistoricoList from "../../components/HistoricoList";

export default function Home() {
  // const { signOut, user } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [listBalance, setListBalance] = useState([]);
  const [movements, setMovements] = useState([]);

  const [dateMovements, setDateMovements] = useState(new Date());

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, "dd/MM/yyyy");

      const receives = await api.get("/receives", {
        params: {
          date: dateFormated,
        },
      });

      const balance = await api.get("/balance", {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setMovements(receives.data);
        setListBalance(balance.data);
      }
    }

    getMovements();

    // chamado quando o componente é desmontado
    return () => {
      isActive = false;
    };
  }, [isFocused]);

  return (
    // SafeAreaView: garante que o conteúdo não fique por detrás das câmeras caso o aparelho possua a "gota" que invade a tela.
    <SafeAreaView className="flex-1 bg-[#f0f4ff]">
      <Header title={"Minhas movimentações"} />

      <FlatList
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.tag}
        renderItem={({ item }) => <BalanceItem data={item} />}
      />

      <View className=" bg-[#fff] rounded-tl-[15px] rounded-tr-[15px] flex-row px-[14px] pt-[14px] items-baseline mt-[22px]">
        <TouchableOpacity>
          <MaterialIcons name="event" size={30} color="#121212" />
        </TouchableOpacity>
        <Text className="ml-[4px] text-[#121212] mb-[14px] font-bold text-[18px]">
          Ultimas movimentações
        </Text>
      </View>

      <FlatList
        className="flex-1 bg-[#fff]"
        data={movements}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <HistoricoList data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </SafeAreaView>
  );
}
