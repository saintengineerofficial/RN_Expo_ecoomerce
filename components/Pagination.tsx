import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type PaginationProps = {
  currentIndex: number;
  items: string[];
};

const Pagination = ({ currentIndex, items }: PaginationProps) => {
  return (
    <View style={styles.container}>
      {items &&
        items.map((item, index) => (
          <View key={index} style={[styles.dot, index === currentIndex && styles.activeDot]} />
        ))}
      <View style={styles.paginationNumberContainer}>
        <View style={styles.paginationNumberTextBox}>
          <Text style={styles.paginationNumberText}>
            {currentIndex + 1}/{items.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  dot: {
    width: 30,
    height: 4,
    margin: 3,
    borderRadius: 5,
    backgroundColor: Colors.gray,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  paginationNumberContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    paddingRight: 20,
  },
  paginationNumberTextBox: {
    backgroundColor: Colors.extraLightGray,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  paginationNumberText: {
    fontSize: 12,
    color: Colors.primary,
  },
});
