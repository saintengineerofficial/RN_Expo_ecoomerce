import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { mockFetch } from "@/utils/mock";
import JsonData from "@/data/db.json";
import { Colors } from "@/constants/Colors";
import { ProductType } from "@/types/type";
import ImageSlider from "@/components/ImageSlider";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

const ProductSub = () => {
  const { id, productType } = useLocalSearchParams<{
    id: string;
    productType: "sale" | "normal";
  }>();
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType>();

  const getProducts = async () => {
    const data = await mockFetch(JsonData);
    const product =
      productType === "sale"
        ? data.saleProducts.find(product => product.id === Number(id))
        : data.products.find(product => product.id === Number(id));
    setProductDetails(product);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading || !productDetails) {
    return <ActivityIndicator size='large' color={Colors.primary} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Product Details",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name='cart-outline' size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={{ marginTop: headerHeight, marginBottom: 90 }}>
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <ImageSlider imageList={productDetails.images} />
        </Animated.View>
        <View style={styles.container}>
          <Animated.View
            style={styles.ratingWrapper}
            entering={FadeInDown.delay(500).duration(500)}>
            <View style={styles.ratingBox}>
              <Ionicons name='star' size={18} color={Colors.primary} />
              <Text style={styles.ratingText}>
                4.5 <Text>(100)</Text>
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name='heart-outline' size={20} color={Colors.primary} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.Text style={styles.title} entering={FadeInDown.delay(700).duration(500)}>
            {productDetails.title}
          </Animated.Text>
          <Animated.View style={styles.priceWrapper} entering={FadeInDown.delay(900).duration(500)}>
            <Text style={styles.price}>${productDetails.price}</Text>
            <View style={styles.discountWrapper}>
              <Text style={styles.discountText}>6% off</Text>
            </View>
            <Text style={styles.oldPrice}>${productDetails.price + 2}</Text>
          </Animated.View>
          <Animated.Text style={styles.description} entering={FadeInDown.delay(1100).duration(500)}>
            {productDetails.description}
          </Animated.Text>

          <Animated.View
            style={styles.productVariantsWrapper}
            entering={FadeInDown.delay(1300).duration(500)}>
            <View style={styles.productVariantsType}>
              <Text style={styles.productVariantsTitle}>Color</Text>
              <View style={styles.productVariantsColorWrapper}>
                <View
                  style={{
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 100,
                    padding: 2,
                  }}>
                  <View
                    style={[styles.productVariantsColorValue, { backgroundColor: "red" }]}></View>
                </View>
                <View
                  style={[styles.productVariantsColorValue, { backgroundColor: "blue" }]}></View>
                <View
                  style={[styles.productVariantsColorValue, { backgroundColor: "green" }]}></View>
                <View
                  style={[styles.productVariantsColorValue, { backgroundColor: "yellow" }]}></View>
                <View
                  style={[styles.productVariantsColorValue, { backgroundColor: "purple" }]}></View>
                <View
                  style={[styles.productVariantsColorValue, { backgroundColor: "orange" }]}></View>
              </View>
            </View>
            <View style={styles.productVariantsType}>
              <Text style={styles.productVariantsTitle}>Size</Text>
              <View style={styles.productVariantsSizeWrapper}>
                <View
                  style={[
                    styles.productVariantsSizeItem,
                    { borderColor: Colors.primary, backgroundColor: Colors.primary },
                  ]}>
                  <Text style={[styles.productVariantsSizeItemText, { color: Colors.white }]}>
                    S
                  </Text>
                </View>
                <View style={styles.productVariantsSizeItem}>
                  <Text style={styles.productVariantsSizeItemText}>M</Text>
                </View>
                <View style={styles.productVariantsSizeItem}>
                  <Text style={styles.productVariantsSizeItemText}>L</Text>
                </View>
                <View style={styles.productVariantsSizeItem}>
                  <Text style={styles.productVariantsSizeItemText}>XL</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <Animated.View
        style={styles.addToCartWrapper}
        entering={SlideInDown.delay(500).duration(500)}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            {
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: Colors.lightGray,
            },
          ]}>
          <Ionicons name='cart-outline' size={20} color={Colors.primary} />
          <Text style={[styles.addToCartButtonText, { color: Colors.primary }]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ProductSub;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.gray,
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 32,
    marginTop: 10,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  discountWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  discountText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.white,
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.gray,
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.gray,
    marginTop: 20,
    lineHeight: 24,
  },
  productVariantsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  productVariantsType: {
    width: "50%",
    gap: 5,
    marginBottom: 10,
  },
  productVariantsTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
  productVariantsColorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexWrap: "wrap",
  },
  productVariantsColorValue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.extraLightGray,
  },
  productVariantsSize: {
    width: "50%",
    gap: 5,
    marginBottom: 10,
  },
  productVariantsSizeWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  productVariantsSizeItem: {
    width: 50,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.extraLightGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  productVariantsSizeItemText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  addToCartWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    backgroundColor: Colors.white,
    padding: 20,
    flexDirection: "row",
    gap: 10,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.white,
    textAlign: "center",
  },
});
