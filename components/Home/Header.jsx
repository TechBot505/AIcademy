import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Header() {
    const {userDetails, setUserDetails} = useContext(UserContext)
    const router = useRouter();

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <View>
                <Text style={{
                    fontSize: 28,
                    fontFamily: 'outfit-bold',
                    marginBottom: 5,
                    color: Colors.WHITE
                }}>
                    Hello, {userDetails?.name.split(" ")[0]}
                </Text>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'outfit',
                    color: Colors.ACCENT
                }}>
                    Let's Get Started!
                </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/addCourse')}>
                <Ionicons name="settings-outline" size={32} color={Colors.WHITE}/>
            </TouchableOpacity>
        </View>
    )
}