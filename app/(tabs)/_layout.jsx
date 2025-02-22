import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors'

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" 
                options={{ 
                    title: 'Home',
                    tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />,
                    tabBarActiveTintColor: Colors.PRIMARY,
                }}
            />
            <Tabs.Screen name="explore" 
                options={{ 
                    title: 'Explore',
                    tabBarIcon: ({color, size}) => <Ionicons name="search" size={size} color={color} />,
                    tabBarActiveTintColor: Colors.PRIMARY,
                }}
            />
            <Tabs.Screen name="progress" 
                options={{ 
                    title: 'Progress',
                    tabBarIcon: ({color, size}) => <Ionicons name="analytics-outline" size={size} color={color} />,
                    tabBarActiveTintColor: Colors.PRIMARY,
                }}
            />
            <Tabs.Screen name="profile" 
                options={{ 
                    title: 'Profile',
                    tabBarIcon: ({color, size}) => <Ionicons name="person-circle-outline" size={size} color={color} />,
                    tabBarActiveTintColor: Colors.PRIMARY,
                }}
            />
        </Tabs>
    )
}