import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function InputField(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput style={styles.inputField} {...props} />;
}

const styles = StyleSheet.create({
  inputField: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "stretch",
  },
});
