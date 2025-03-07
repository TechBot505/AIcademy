import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors'

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ 
            headerShown: false,
            style: {
                backgroundColor: "#171717",          
          },
            tabBarStyle: {
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: Colors.WHITE,
                marginBottom: 10,
                width: '95%',
                alignSelf: 'center',
                height: 55,
                position: 'absolute',
                marginHorizontal: 10,
                shadowColor: Colors.BLACK,
            }
        }}
        >
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