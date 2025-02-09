import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";
import { ProductType } from "@/types/type";
import { Colors } from "@/constants/Colors";

type ProductListProps = {
  products: ProductType[];
  isFlatList?: boolean;
};

const ProductList = ({ products, isFlatList = true }: ProductListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>For You</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {isFlatList ? (
        <FlatList
          data={products}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <ProductItem item={item} index={index} productType='normal' />
          )}
        />
      ) : (
        <View style={styles.itemsWrapper}>
          {products.map((product, index) => (
            <View key={product.id} style={styles.productWrapper}>
              <ProductItem item={product} index={index} productType='normal' />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
  itemsWrapper: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  productWrapper: {
    width: "50%",
    paddingLeft: 5,
    marginBottom: 10,
  },
});
