import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import React from "react";
import { CategoryType } from "@/types/type";
import { Colors } from "@/constants/Colors";

type CategoriesProps = {
  categories: CategoryType[];
};

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <View style={styles.categoryWrapper}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "500",
  },
  categoryWrapper: {
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
    marginLeft: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
  },
});
