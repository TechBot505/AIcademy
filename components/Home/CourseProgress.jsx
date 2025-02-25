import { View, Text, FlatList } from 'react-native'
import React from 'react';
import Colors from './../../constants/Colors';
import CourseProgressCard from '../Shared/CourseProgressCard';

export default function CourseProgress({ courseList }) {
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                color: Colors.WHITE,
            }}>Progress</Text>

            <FlatList 
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <View key={index}>
                        <CourseProgressCard item={item} />
                    </View>
                )}
            />
        </View>
    )
}