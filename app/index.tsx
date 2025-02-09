import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import SocialLoginButton from "@/components/SocialLoginButton";

type Props = {};

const WelcomeScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <ImageBackground
        source={require("@/assets/images/ecommerce-splash.jpg")}
        resizeMode='cover'
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <LinearGradient
            colors={["transparent", "rgba(255, 255,255,0.9)", "rgba(255, 255,255, 1)"]}
            style={styles.background}>
            <View style={styles.wrapper}>
              <Animated.Text
                style={styles.titleLogo}
                entering={FadeInRight.delay(500).duration(300).springify()}>
                Shop X
              </Animated.Text>
              <Animated.Text
                style={styles.description}
                entering={FadeInRight.delay(500).duration(300)}>
                one stop solution for all your needs
              </Animated.Text>
              <SocialLoginButton mailHerf={"/signup"} />
              <Text style={styles.loginTxt}>
                Already have an account?
                <Link href={"/signin"} asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginTxtSpan}> {"  "}SignIn</Text>
                  </TouchableOpacity>
                </Link>
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },
  wrapper: {
    paddingBottom: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    fontWeight: "700",
    letterSpacing: 2.4,
    marginBottom: 5,
  },
  titleLogo: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    letterSpacing: 1.5,
    lineHeight: 30,
    marginBottom: 20,
  },

  loginTxt: {
    fontSize: 16,
    marginTop: 30,
    color: Colors.black,
    lineHeight: 24,
  },
  loginTxtSpan: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
});
