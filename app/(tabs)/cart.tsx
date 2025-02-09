import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { CartItemType } from "@/types/type";
import { mockFetch } from "@/utils/mock";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import JsonData from "@/data/db.json";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {};

const CartScreen = (props: Props) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const headerHeight = useHeaderHeight();

  const getCartItems = async () => {
    const data = await mockFetch(JsonData);
    setCartItems(data.cart);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(100 * index).duration(300)}>
              <CardItem item={item} />
            </Animated.View>
          )}
        />
      </View>
      <View style={styles.totalWrapper}>
        <View style={styles.priceWrapper}>
          <Text style={styles.totalText}>Subtotal:</Text>
          <Text style={styles.totalPrice}>
            ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const CardItem = ({ item }: { item: CartItemType }) => {
  return (
    <View style={styles.cartItemWrapper}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <View style={styles.cartItemControlWrapper}>
          <TouchableOpacity>
            <Ionicons name='trash-outline' size={24} color='red' />
          </TouchableOpacity>
          <View style={styles.cartQuantityWrapper}>
            <TouchableOpacity style={styles.cartQuantityButton}>
              <Ionicons name='remove-outline' size={24} color='black' />
            </TouchableOpacity>
            <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.cartQuantityButton}>
              <Ionicons name='add-outline' size={24} color='black' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name='heart-outline' size={24} color='red' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
    borderRadius: 5,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  cartItemInfo: {
    flex: 1,
    gap: 10,
    alignSelf: "center",
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  cartItemControlWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  cartQuantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  cartQuantityButton: {
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
    borderRadius: 5,
  },
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  totalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  priceWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  checkoutButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
});
