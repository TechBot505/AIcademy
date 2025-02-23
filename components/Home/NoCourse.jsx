import { View, Text, Image } from 'react-native';
import React from 'react';
import Button from '../Shared/Button';
import { useRouter } from 'expo-router';

export default function NoCourse() {
    const router = useRouter();
    return (
        <View style={{
            marginTop: 60,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Image source={require('../../assets/images/book.jpg')} style={{
                width: 200,
                height: 200
            }} />
            <Text style={{
                fontSize: 24,
                fontFamily: 'outfit-bold',
                marginTop: 20,
                textAlign: 'center'
            }}>
                You don't have any Course
            </Text>
            <Button title="Create New Course" onPress={() => router.push('/addCourse')} />
            <Button title="Explore Existing Courses" type="outline" />
        </View>
    )
}