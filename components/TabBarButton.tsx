import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icons } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

type TabBarButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string;
  routeName: keyof typeof Icons;
};

const TabBarButton = ({ onPress, onLongPress, isFocused, label, routeName }: TabBarButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.btn}>
      {routeName === "cart" && (
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      )}
      {Icons[routeName]({ color: isFocused ? Colors.primary : Colors.black })}
      <Text style={{ color: isFocused ? Colors.primary : Colors.black }}>{label}</Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  badgeWrapper: {
    position: "absolute",
    top: -5,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.highlight,
    borderRadius: 100,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.black,
  },
});
