import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export default function Index() {

    const router = useRouter();

    const {userDetails, setUserDetails} = useContext(UserContext);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(user);
            const result = await getDoc(doc(db, 'users', user?.email));
            setUserDetails(result.data());
            router.replace('/(tabs)/home');
        }
    })

    return (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
            <Image source={require('../assets/images/landing8.jpg')}
              style={{
                width: '100%',
                height: 300,
                marginTop: 50
              }}
            />
            <View style={{
              padding: 25,
              backgroundColor: Colors.PRIMARY,
              height: '100%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}>
                <Text style={{
                  color: Colors.WHITE,
                  fontSize: 30,
                  textAlign: 'center',
                  fontFamily: 'outfit-bold'
                }}>Welcome to AIcademy</Text>

                <Text style={{
                  color: Colors.WHITE,
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 20,
                  fontFamily: 'outfit'
                }}>Transform your ideas into engaging educational content, effortlessly with AI! 📚🤖</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => router.push('/auth/signUp')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.ACCENT}]}
                    onPress={() => router.push('/auth/signIn')}
                >
                    <Text style={[styles.buttonText, {color: Colors.ACCENT}]}>Already have an Account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        backgroundColor: Colors.ACCENT,
        marginTop: 20,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.PRIMARY,
        fontFamily: 'outfit'
    }
})
