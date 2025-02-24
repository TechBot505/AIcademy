import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function Chapters( { course } ) {
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
                    <View style={{
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
                            gap: 10
                        }}>
                            <Text style={styles.chapterText}>{index+1}.</Text>
                            <Text style={styles.chapterText}>{item?.chapterName}</Text>
                        </View>
                        <Ionicons name="play" size={24} color={Colors.DARK_GRAY} />
                    </View>
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