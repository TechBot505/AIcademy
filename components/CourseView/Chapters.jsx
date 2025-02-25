import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Chapters( { course } ) {
    const router = useRouter();
    const isChapterCompleted = (chapterIndex) => {
        const isCompleted = course?.completedChapter?.find(item => item==chapterIndex);
        return isCompleted ? true : false;
    }
    return (
        <View style={{
            padding: 20,
            marginTop: -10
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Chapters</Text>

            <FlatList
                data={course?.chapters}
                renderItem={({item, index}) => (
                    <TouchableOpacity key={index} onPress={() => {
                        router.push({
                            pathname: '/chapterView',
                            params: {
                                chapterParams: JSON.stringify(item),
                                docId: course?.docId,
                                chapterIndex: index
                            }
                        })
                    }} style={{
                        padding: 15,
                        borderWidth: 1,
                        borderRadius: 15,
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            display: 'flex',
                            gap: 10,
                            maxWidth: 240
                        }}>
                            <Text style={styles.chapterText}>{index+1}.</Text>
                            <Text style={styles.chapterText}>{item?.chapterName}</Text>
                        </View>
                        {
                            isChapterCompleted(index) ? 
                            <Ionicons name="checkmark-circle" size={24} color={Colors.PRIMARY} /> : 
                            <Ionicons name="play" size={24} color={Colors.DARK_GRAY} />
                        }
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chapterText: {
        fontFamily: 'outfit',
        fontSize: 18
    }
})