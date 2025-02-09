import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import JsonData from "@/data/db.json";
import { mockFetch } from "@/utils/mock";
import { ProductType, CategoryType } from "@/types/type";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import ProductList from "@/components/ProductList";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";

type Props = {};

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const data = await mockFetch(JsonData);
    setProducts(data.products);
    setCategories(data.categories);
    setSaleProducts(data.saleProducts);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size='large' color={Colors.primary} />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView style={styles.container}>
        <Categories categories={categories} />
        <FlashSale saleProducts={saleProducts} />
        <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
          <Image
            source={require("@/assets/images/sale-banner.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 15 }}
          />
        </View>
        <ProductList products={products} isFlatList={false} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
});
