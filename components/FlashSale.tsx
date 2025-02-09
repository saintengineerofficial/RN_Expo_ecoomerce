import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ProductType } from "@/types/type";
import ProductItem from "./ProductItem";

type FlashSaleProps = {
  saleProducts: ProductType[];
};

const FlashSale = ({ saleProducts }: FlashSaleProps) => {
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 2);
  saleEndDate.setHours(23, 59, 59);

  const [timeUnit, setTimeUnit] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeUnit = (timeDiffence: number) => {
      const seconds = Math.floor(timeDiffence / 1000);
      setTimeUnit({
        days: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
        hours: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
        minutes: Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)),
        seconds: seconds % 60,
      });
    };

    const updateCountDown = () => {
      const currentDate = new Date().getTime();
      const endDate = saleEndDate.getTime();
      const timeDiffence = endDate - currentDate;
      if (timeDiffence > 0) {
        calculateTimeUnit(timeDiffence);
      } else {
        calculateTimeUnit(0);
      }
    };

    const interval = setInterval(updateCountDown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <View style={styles.timerWrapper}>
          <Text style={styles.title}>Flash Sale</Text>
          <View style={styles.timer}>
            <Ionicons name='time-outline' size={24} color={Colors.black} />
            <Text style={styles.timerTxt}>
              {formatTime(timeUnit.days)}:{formatTime(timeUnit.hours)}:
              {formatTime(timeUnit.minutes)}:{formatTime(timeUnit.seconds)}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={saleProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: 20, paddingRight: 20 }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={{ marginRight: 20 }}>
              <ProductItem item={item} index={index} productType='sale' />
            </View>
          );
        }}
      />
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
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
  timerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  timerTxt: {
    color: Colors.black,
    fontWeight: "500",
  },
});
