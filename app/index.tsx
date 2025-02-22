import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
        <Image source={require('../assets/images/landing7.jpg')}
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
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Welcome to AIcademy</Text>

            <Text style={{
              color: Colors.WHITE,
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
            }}>Transform your ideas into engaging educational content, effortlessly with AI! 📚🤖</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.ACCENT}]}>
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
        color: Colors.PRIMARY
    }
})
