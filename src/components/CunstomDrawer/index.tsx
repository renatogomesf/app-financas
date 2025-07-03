import { useContext } from "react";

import { View, Text, Image } from "react-native";

import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { AuthContext } from "../../contexts/auth";

export default function CunstomDrawer(props: any) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center justify-center mt-[25px]">
        <Image
          source={require("../../assets/Logo.png")}
          width={90}
          height={90}
        />

        <Text className="text-[18px] mt-[14px]">Bem-vindo</Text>

        <Text
          className="text-[17px] mb-[14px] font-bold px-[20px]"
          numberOfLines={1}
        >
          {user.name}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        {...props}
        label={"Sair da conta"}
        onPress={() => signOut()}
        style={{
          marginTop: "80%",
        }}
      />
    </DrawerContentScrollView>
  );
}
