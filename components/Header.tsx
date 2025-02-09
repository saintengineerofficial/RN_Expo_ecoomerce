import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.logo}>SX</Text>
      <Link href={"/explore"} asChild>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchBarText}>Search</Text>
          <Ionicons name='search-outline' size={20} color={Colors.black} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: Colors.white,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  searchBarText: {
    color: Colors.gray,
  },
});
