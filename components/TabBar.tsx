import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, LayoutChangeEvent, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { Icons } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;
  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const onTabBarLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  useEffect(() => {
    tabPositionX.value = withTiming(state.index * buttonWidth, { duration: 300 });
  }, [state.index]);

  return (
    <View onLayout={onTabBarLayout} style={styles.tabbar}>
      <Animated.View style={[animatedStyle, styles.tabbarLine, { width: buttonWidth / 2 }]} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            label={String(label)}
            routeName={route.name as keyof typeof Icons}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: Colors.white,
  },
  tabbarLine: {
    position: "absolute",
    top: 0,
    left: 20,
    height: 2,
    backgroundColor: Colors.primary,
    width: 40,
  },
});
