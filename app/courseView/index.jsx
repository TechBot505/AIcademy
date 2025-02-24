import { View, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../components/CourseView/Intro';
import Colors from '../../constants/Colors';
import Chapters from '../../components/CourseView/Chapters';

export default function CourseView() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    return (
        <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View style={{
                    flex: 1,
                    backgroundColor: Colors.WHITE
                }}>
                    <Intro course={course} />
                    <Chapters course={course} />
                </View>
            }
        />
    )
}