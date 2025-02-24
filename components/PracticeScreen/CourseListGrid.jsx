import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function CourseListGrid( {courseList, option} ) {
    const router = useRouter();
    const onPress = (course) => {
        if(option?.name == 'Quiz') {
            router.push({
                pathname: '/practice/quiz',
                params: {
                    courseParams: JSON.stringify(course)
                }
            })
        } else if(option?.name == 'Flashcards') {
            router.push({
                pathname: '/practice/flashcards',
                params: {
                    courseParams: JSON.stringify(course)
                }
            })
        }
    }
    return (
        <View>
            <FlatList
                data={courseList}
                numColumns={2}
                style={{
                    padding: 20
                }}
                renderItem={({item, index}) => (
                    <TouchableOpacity key={index}
                        onPress={() => onPress(item)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: Colors.WHITE,
                            margin: 10,
                            borderRadius: 15,
                            elevation: 1
                        }}
                    >
                        <Ionicons name="checkmark-circle-sharp" size={24} color={Colors.GRAY}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                zIndex: 1
                            }}
                        />
                        <Image source={option.icon} style={{
                            width: '100%',
                            height: 90,
                            objectFit: 'contain'
                        }} />
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 14,
                            textAlign: 'center',
                            marginTop: 5
                        }}>{item.courseTitle}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}