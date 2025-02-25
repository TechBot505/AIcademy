import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function QuestionsAnswers() {
    const router = useRouter();
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa;
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    return (
        <View>
            <Image source={require('./../../../assets/images/wave4.png')}
                style={{
                    width: '100%',
                    height: 600
                }}
            />
            <View style={{
                position: 'absolute',
                width: '100%',
                padding: 20,
                marginTop: 10,
                paddingTop: 30,
            }}>
                <View style={{
                    display: 'flex',
                    gap: 10,
                }}>
                <Pressable>
                    <Ionicons name="arrow-back-sharp" size={28} color={Colors.WHITE} onPress={() => router.back()} />
                </Pressable>
                <Text style={{
                    color: 'white',
                    fontFamily: 'outfit-bold',
                    fontSize: 28
                }}>Question & Answer</Text>
                </View>
                <Text style={{
                    color: 'white',
                    fontFamily: 'outfit',
                    fontSize: 20,
                    marginBottom: 10
                }}>{course?.courseTitle}</Text>

                <FlatList
                    data={qaList}
                    renderItem={({item, index}) => (
                        <Pressable style={styles.card}
                            onPress={() => setSelectedQuestion(prev => prev === index ? null : index)}
                        >
                            <Text style={{
                                fontFamily: 'outfit-bold',
                                fontSize: 18
                            }}>{item?.question}</Text>
                            {selectedQuestion === index && (
                                <View style={{
                                    marginTop: 5
                                }}>
                                    <Text style={{
                                        fontFamily: 'outfit',
                                        fontSize: 16,
                                        color: Colors.DARK_GRAY
                                    }}>Answer: {item?.answer}</Text>
                                </View>
                            )}
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        marginTop: 15,
        borderRadius: 15,
        elevation: 1
    }
})