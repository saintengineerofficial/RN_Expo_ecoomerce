import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { CategoryType } from "@/types/type";
import { mockFetch } from "@/utils/mock";
import JsonData from "@/data/db.json";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "@/constants/Colors";

type Props = {};

const ExploreScreen = (props: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const headerHeight = useHeaderHeight();

  const getCategories = async () => {
    const data = await mockFetch(JsonData);
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
            </View>
          )}
        />
      </View>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: Colors.extraLightGray,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
