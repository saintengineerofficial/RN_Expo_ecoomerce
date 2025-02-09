import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const ProfileScreen = (props: Props) => {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <Ionicons name='person-outline' size={50} color={Colors.black} />
            <Text style={styles.profileName}>John Doe</Text>
          </View>
        </View>
        <View style={styles.profileBtnWrapper}>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name='person-outline' size={24} color={Colors.black} />
            <Text style={styles.profileName}>John Doe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name='heart-outline' size={24} color={Colors.black} />
            <Text style={styles.profileName}>Your Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name='cart-outline' size={24} color={Colors.black} />
            <Text style={styles.profileName}>Your Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name='settings-outline' size={24} color={Colors.black} />
            <Text style={styles.profileName}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name='log-out-outline' size={24} color={Colors.black} />
            <Text style={styles.profileName}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignSelf: "center",
  },
  profileWrapper: {
    alignItems: "center",
    gap: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  profileBtnWrapper: {
    marginTop: 20,
    gap: 10,
  },
  profileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
  },
});
