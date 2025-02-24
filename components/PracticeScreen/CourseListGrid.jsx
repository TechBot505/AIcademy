import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CourseListGrid( {courseList, option} ) {
    return (
        <View>
            <FlatList
                data={courseList}
                numColumns={2}
                style={{
                    padding: 20
                }}
                renderItem={({item, index}) => (
                    <View key={index}
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
                    </View>
                )}
            />
        </View>
    )
}