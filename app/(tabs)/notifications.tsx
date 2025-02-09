import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { NotificationType } from "@/types/type";
import { mockFetch } from "@/utils/mock";
import JsonData from "@/data/db.json";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {};

const NotificationsScreen = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const headerHeight = useHeaderHeight();

  const getNotifications = async () => {
    const data = await mockFetch(JsonData);
    setNotifications(data.notifications);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Animated.View
              style={styles.notificationWrapper}
              entering={FadeInDown.delay(300 + item.id * 100).duration(500)}>
              <View style={styles.notificationIcon}>
                <Ionicons name='notifications-outline' size={20} color={Colors.black} />
              </View>
              <View style={styles.notificationContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
                </View>
                <Text style={styles.notificationMessage}>{item.message}</Text>
              </View>
            </Animated.View>
          )}
        />
      </View>
    </>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationWrapper: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.extraLightGray,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.extraLightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
    paddingLeft: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  notificationTimestamp: {
    fontSize: 14,
    color: Colors.gray,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 5,
    lineHeight: 20,
  },
});
