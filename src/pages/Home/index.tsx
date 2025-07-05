import { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import { format } from "date-fns";

// verifica se você está na tela. se sim retorna true... se não, retorna false
import { useIsFocused } from "@react-navigation/native";

import Header from "../../components/Header";
import BalanceItem from "../../components/BalanceItem";
import HistoricoList from "../../components/HistoricoList";
import CalendarModal from "../../components/CalendarModal";

export default function Home() {
  // const { signOut, user } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [listBalance, setListBalance] = useState([]);
  const [movements, setMovements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
  }, [isFocused, dateMovements]);

  async function handleDelete(id: any) {
    try {
      await api.delete("/receives/delete", {
        params: {
          item_id: id,
        },
      });

      setDateMovements(new Date());
    } catch (error) {
      console.log(error);
    }
  }

  function filterDateMovements(dateSelected: any) {
    setDateMovements(dateSelected);
  }

  return (
    // SafeAreaView: garante que o conteúdo não fique por detrás das câmeras caso o aparelho possua a "gota" que invade a tela.
    <SafeAreaView className="flex-1 bg-[#f0f4ff]">
      <Header title={"Minhas movimentações"} />

      <View className="h-[200px]">
        <FlatList
          data={listBalance}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.tag}
          renderItem={({ item }) => <BalanceItem data={item} />}
        />
      </View>

      <View className=" bg-[#fff] rounded-tl-[15px] rounded-tr-[15px] flex-row px-[14px] pt-[14px] items-center mt-[22px] ">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="event" size={30} color="#121212" />
        </TouchableOpacity>
        <Text className="ml-[4px] text-[#121212] font-bold text-[18px] ">
          Ultimas movimentações
        </Text>
      </View>

      <View className="flex-1 bg-[#fff]">
        <FlatList
          data={movements}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => (
            <HistoricoList data={item} deleteItem={handleDelete} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </SafeAreaView>
  );
}
