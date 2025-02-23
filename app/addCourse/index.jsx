import { View, Text } from 'react-native'
import React from 'react';
import Colors from '@/constants/Colors';

export default function AddCourse() {
  return (
    <View style={{
        flex: 1,
        padding: 25,
        backgroundColor: Colors.WHITE
    }}>
        <Text style={{
            fontSize: 28,
            fontFamily: 'outfit-bold'
        }}>Create New Course</Text>
        <Text style={{
            fontSize: 18,
            fontFamily: 'outfit',
            color: Colors.SECONDARY
        }}>
            What would you like to learn today?
        </Text>
    </View>
  )
}