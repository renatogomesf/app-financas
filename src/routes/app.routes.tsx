import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
          paddingTop: 20,
          borderTopEndRadius: 0,
          borderBottomEndRadius: 0,
        },
        drawerItemStyle: {
          borderRadius: 5,
          marginBottom: 15,
        },
        drawerActiveBackgroundColor: "#3b3dbf",
        drawerActiveTintColor: "#fff",
        drawerInactiveBackgroundColor: "#f0f2ff",
        drawerInactiveTintColor: "#121212",
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Registrar" component={New} />
      <AppDrawer.Screen name="Perfil" component={Profile} />
    </AppDrawer.Navigator>
  );
}
