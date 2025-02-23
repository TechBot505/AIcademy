import { View, Platform } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header';
import Colors from '@/constants/Colors';
import NoCourse from '@/components/Home/NoCourse';

export default function Home() {
    return (
        <View style={{
            padding: 25,
            paddingTop: Platform.OS === 'ios' && 45,
            backgroundColor: Colors.WHITE,
            flex: 1
        }}>
            <Header />
            <NoCourse />
        </View>
    )
}