import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface SocialLoginButtonProps {
  mailHerf: Href<string | object>;
}

export default function SocialLoginButton({ mailHerf }: SocialLoginButtonProps) {
  return (
    <>
      <View style={styles.socialLoginWrapper}>
        <Animated.View entering={FadeInDown.delay(300).duration(300)}>
          <Link href={mailHerf} asChild>
            <TouchableOpacity style={styles.socialLoginButton}>
              <Ionicons name='mail-outline' size={20} color={Colors.black} />
              <Text style={styles.btnTxt}>Continue with Email</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
      <View style={styles.socialLoginWrapper}>
        <Animated.View entering={FadeInDown.delay(500).duration(300)}>
          <TouchableOpacity style={styles.socialLoginButton}>
            <Ionicons name='logo-google' size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Google</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.socialLoginWrapper}>
        <Animated.View entering={FadeInDown.delay(800).duration(300)}>
          <TouchableOpacity style={styles.socialLoginButton}>
            <Ionicons name='logo-apple' size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Apple</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  socialLoginWrapper: {
    alignSelf: "stretch",
  },
  socialLoginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
    borderRadius: 20,
    gap: 10,
    padding: 10,
    marginBottom: 15,
  },
  btnTxt: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "600",
  },
});
