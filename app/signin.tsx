import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React from "react";
import { Link, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import InputField from "@/components/inputField";
import SocialLoginButton from "@/components/SocialLoginButton";

const SignUpScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Sign Up",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='close' size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Login to your account</Text>
        <InputField
          placeholder='Email Address'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <InputField
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            router.dismissAll();
            router.push("/(tabs)");
          }}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>
          Don't have an account?
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTxtSpan}> {"  "}SignUp</Text>
            </TouchableOpacity>
          </Link>
        </Text>

        <View style={styles.divider}></View>

        <SocialLoginButton mailHerf={"/signin"} />
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    marginHorizontal: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginBottom: 50,
    color: Colors.black,
  },
  btn: {
    backgroundColor: Colors.primary,
    alignSelf: "stretch",
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
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
  divider: {
    borderTopColor: "30%",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    marginBottom: 30,
  },
});
