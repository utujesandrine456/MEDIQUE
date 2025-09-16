import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomBar() {
  const router = useRouter();

  const menuItems = [
    { id: 1, title: "Home", icon: <Ionicons name="home-outline" size={24} color="#fff" />, route: "/" },
    { id: 2, title: "Hospitals", icon: <Ionicons name="medkit-outline" size={24} color="#fff" />, route: "/hospitals" },
    { id: 3, title: "Location", icon: <Ionicons name="location-outline" size={24} color="#fff" />, route: "/location" },
    { id: 4, title: "Dashboard", icon: <Ionicons name="speedometer-outline" size={24} color="#fff" />, route: "/dashboard" },
  ];

  return (
    <View style={styles.wrapper}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => router.push(item.route)}
        >
          <Text style={{ fontSize: 28, fontFamily: "Poppins_700Bold"}}>{item.icon}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#017DD1",
    paddingVertical: 10,
    margin: 15,
    borderRadius: 20,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 4,
  },
});
