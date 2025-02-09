import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { ProductType } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";

export type ProductItemProps = {
  item: ProductType;
  index: number;
  productType: "sale" | "normal";
};

const width = Dimensions.get("window").width - 40;

const ProductItem = ({ item, index, productType }: ProductItemProps) => {
  return (
    <Link
      href={{
        pathname: "/productSub/[id]",
        params: {
          id: item.id,
          productType,
        },
      }}
      asChild>
      <TouchableOpacity>
        <Animated.View
          style={[styles.container]}
          entering={FadeInDown.delay(300 + index * 100).springify()}>
          <Image source={{ uri: item.images[0] }} style={styles.productImage} />
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name='heart-outline' size={24} color={Colors.black} />
          </TouchableOpacity>
          <View style={styles.productInfo}>
            <Text style={styles.productPrice}>${item.price}</Text>
            <View style={styles.ratingWrapper}>
              <Ionicons name='star' size={20} color={"#D4AF47"} />
              <Text style={styles.rating}>4.7</Text>
            </View>
          </View>
          <Text style={styles.productTitle}>{item.title}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 5,
    borderRadius: 30,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 5,
  },
});
