import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { UserContext } from './../../context/userContext';
import { useRouter } from 'expo-router';
import { auth } from './../../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import Colors from './../../constants/Colors';
import { ProfileMenu } from '../../constants/Options';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const { userDetails, setUserDetails }  = useContext(UserContext);
    const router = useRouter();
    const onMenuClick = (menu) => {
        if(menu.name == 'Logout') {
            signOut(auth).then(() => {
                setUserDetails(null);
                router.push('/');
            }).catch((error) => {
                console.log('Error while logging out', error);
            })
        } else {
            router.push(menu.path);
        }
    }
    return (
        <View style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1,
            paddingTop: 50
        }}>
            <Text style={{
                fontSize: 28,
                fontFamily: 'outfit-bold',
                marginBottom: 10
            }}>Profile</Text>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: 10,
                padding: 10
            }}>
                <View style={{
                    
                }}>
                    <Image
                        source={require("./../../assets/images/logo2.png")}
                        style={{ width: 100, height: 100, marginBottom: 20 }}
                    />
                    <Text style={{
                        position: 'absolute',
                        bottom: 3,
                        alignSelf: 'center',
                        fontSize: 20,
                        backgroundColor: Colors.DARK_SILVER,
                        paddingHorizontal: 7,
                        paddingVertical: 2,
                        fontFamily: 'outfit-bold',
                        color: Colors.WHITE,
                        borderRadius: 10
                    }}>| - - AIcademy - - |</Text>
                </View>
                <Text style={{
                    fontSize: 24,
                    fontFamily: 'outfit-bold',
                    textAlign: 'center'
                }}>{userDetails?.name.split(" ")[0]}</Text>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    color: Colors.DARK_GRAY
                }}>{userDetails?.email}</Text>
            </View>
            <View style={{
              width: '100%',
              alignSelf: 'center'
            }}>
                {
                  ProfileMenu.map((menu, index) => (
                    <TouchableOpacity key={index} onPress={() => onMenuClick(menu)}>
                      <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                        padding: 10,
                        elevation: 1,
                        backgroundColor: Colors.WHITE,
                        marginVertical: 5,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: Colors.GRAY
                      }}>
                        <View style={{
                            backgroundColor: Colors.ACCENT,
                            padding: 7,
                            borderRadius: 10,
                            elevation: 1
                        }}>
                            <Ionicons name={menu.icon} size={24} color={Colors.PRIMARY} />
                        </View>
                        <Text style={{
                          fontSize: 18,
                          fontFamily: 'outfit',
                        }}>{menu.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
            </View>
        </View>
    )
}