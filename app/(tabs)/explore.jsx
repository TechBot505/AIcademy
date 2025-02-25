import { View, Text, FlatList } from 'react-native'
import React from 'react';
import Colors from '../../constants/Colors';
import { courseCategory } from '../../constants/Options';
import CourseListByCategory from '../../components/Explore/CourseListByCategory';

export default function Explore() {
    return (
        <FlatList 
            data={[]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 50
            }}
            style={{
                backgroundColor: Colors.WHITE,
                flex: 1,
            }}
            ListHeaderComponent={
                <View style={{
                    padding: 25,
                    backgroundColor: Colors.WHITE,
                    flex: 1,
                    paddingTop: 50
                }}>
                    <Text style={{
                        fontSize: 28,
                        fontFamily: 'outfit-bold'
                    }}>Explore More Courses</Text>

                    {courseCategory.map((category, index) => (
                        <View key={index}>
                            <CourseListByCategory category={category} />
                        </View>
                    ))}
                </View>
            }
        />
    )
}