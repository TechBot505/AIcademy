import { Text, TouchableOpacity } from 'react-native'
import React from 'react';
import Colors from '@/constants/Colors';

export default function Button({title, type='fill', onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: type === 'fill' ? Colors.PRIMARY : Colors.WHITE,
            padding: 15,
            width: '100%',
            borderRadius: 10,
            marginTop: 15,
            borderWidth: type === 'fill' ? 0 : 1,
            borderColor: Colors.PRIMARY
        }}>
            <Text style={{
                color: type === 'fill' ? Colors.WHITE : Colors.PRIMARY,
                fontFamily: 'outfit',
                textAlign: 'center',
                fontSize: 18
            }}>
                {title}
            </Text>
        </TouchableOpacity> 
    )
}