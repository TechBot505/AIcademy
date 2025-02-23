import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react';
import { imageAssets } from './../../constants/Options';
import Colors from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CourseList({ courseList }) {
    return (
        <View style={{
            marginTop: 15
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Courses</Text>
            <FlatList 
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <View key={index} style={styles.container}>
                        <Image source={imageAssets[item?.banner]} 
                            style={{
                                width: 'auto',
                                height: 140,
                                borderRadius: 15,
                                borderWidth: 0.1,
                                borderColor: Colors.SECONDARY
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 16,
                            marginTop: 5
                        }}>{item?.title}</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            marginTop: 5
                        }}>
                            <Ionicons name="book-outline" size={16} color="black" />
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 12,
                                color: Colors.SECONDARY,
                            }}>{item?.chapters[0]?.content?.length} Chapters</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ACCENT,
        margin: 6,
        padding: 10,
        borderRadius: 15,
        width: 240,
    }
})