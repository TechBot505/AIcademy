import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { imageAssets } from './../../constants/Options';
import Colors from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from './../Shared/Button';
import { useRouter } from 'expo-router';

export default function Intro( { course } ) {

    const router = useRouter();
    return (
        <View>
            <Image source={imageAssets[course?.banner]}
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 15,
                    borderWidth: 0.1,
                    borderColor: Colors.SECONDARY
                }}
            />
            <View style={{
                padding: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25
                }}>{course?.courseTitle}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 5,
                    }}
                >
                    <Ionicons name="book-outline" size={18} color={Colors.PRIMARY} />
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.PRIMARY,
                    }}>{course?.chapters?.length} Chapters</Text>
                </View>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 18,
                    marginTop: 10
                }}>Description:</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    color: Colors.GRAY
                }}>{course.description}</Text>
                <Button title="Start Course" onPress={() => console.log('Course Started!')}/>
            </View>
            <Pressable style={{
                position: 'absolute',
                padding: 10,
                zIndex: 100
            }} onPress={() => router.replace('/(tabs)/home')}>
                <Ionicons name="arrow-back-sharp" size={28} color={Colors.TERTIARY} />
            </Pressable>
        </View>
    )
}