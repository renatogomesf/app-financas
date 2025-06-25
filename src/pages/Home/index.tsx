import { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

import api from "../../services/api";

import { format } from "date-fns";

// verifica se você está na tela. se sim retorna true... se não, retorna false
import { useIsFocused } from "@react-navigation/native";

import BalanceItem from "../../components/BalanceItem";

export default function Home() {
  // const { signOut, user } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [listBalance, setListBalance] = useState([]);

  const [dateMovements, setDateMovements] = useState(new Date());

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, "dd/MM/yyyy");

      const balance = await api.get("/balance", {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
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
    </SafeAreaView>
  );
}
