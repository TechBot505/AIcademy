import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import Colors from "./../../constants/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { UserContext } from "./../../context/userContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {userDetails, setUserDetails} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(async (res) => {
      const user = res.user;
      // console.log(user);
      await getUserDetails();
      setLoading(false);
      router.replace("/(tabs)/home")
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      ToastAndroid.show("Invalid email or password", ToastAndroid.BOTTOM);
    })
  }

  const getUserDetails = async () => {
    const result = await getDoc(doc(db, 'users', email));
    // console.log(result.data());
    setUserDetails(result.data());
  }

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
        Welcome Back!
      </Text>

      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          width: 300,
        }}
        onPress={handleSignIn}
        disabled={loading}
      >
        {!loading ? <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 20,
            fontFamily: "outfit",
          }}
        >
          Login
        </Text>: <ActivityIndicator size="small" color={Colors.WHITE} />}
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
          Don't have an Account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signUp")}>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "outfit-bold",
            }}
          >
            Sign Up
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
