import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import { useRouter } from "expo-router";

export default function SignUp() {
    const router = useRouter();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 100,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../../assets/images/logo2.png")}
        style={{ width: 120, height: 120, marginBottom: 20 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Create New Account
      </Text>

      <TextInput style={styles.textInput} placeholder="Full Name" />
      <TextInput style={styles.textInput} placeholder="Email" />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          width: 300,
        }}
        onPress={() => alert("Account created successfully!")}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 20,
            fontFamily: "outfit",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
          }}
        >
          Already have an Account?
        </Text>
        <Pressable
            onPress={() => router.push('/auth/signIn')}
        >
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "outfit-bold",
            }}
          >
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    marginTop: 20,
    borderRadius: 5,
    padding: 15,
  },
});
