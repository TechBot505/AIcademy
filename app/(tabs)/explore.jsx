import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Explore() {
    return (
        <View>
            <Image source={require('./../../assets/images/wave5.png')}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 450,
                }}
            />
        </View>
    )
}