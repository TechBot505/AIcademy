import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Colors from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../../../components/Shared/Button';
import { useRouter } from 'expo-router';

export default function QuizSummary() {
    const router = useRouter();
    const { quizResultParams } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParams);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        quizResult && calculateResult();
    }, [quizResult]);

    const calculateResult = () => {
        if(quizResult !== undefined) {
            const correctAns = Object.entries(quizResult)?.filter(([key, value]) => value?.isCorrect == true);
            const totalQue = Object.keys(quizResult).length;
            const correctAnswersCount = correctAns.length;
            setCorrectAnswers(correctAnswersCount);
            setTotalQuestions(totalQue);
        }
    }

    const getPercentageCorrect = () => {
        return ((correctAnswers / totalQuestions) * 100).toFixed(0);
    }

    return (
        <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    <Image source={require('./../../../assets/images/gold.png')}
                        style={{
                            width: '100%',
                            height: 400,
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        padding: 35
                    }}>
                        <Text style={{
                            fontSize: 35,
                            color: Colors.WHITE,
                            textAlign: 'center',
                            fontFamily: 'outfit-bold'
                        }}>Quiz Summary</Text>
                        <View style={{
                            backgroundColor: Colors.WHITE,
                            padding: 20,
                            borderRadius: 15,
                            marginTop: 45,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Image source={require('./../../../assets/images/trophy.png')}
                                style={{
                                    width: 100,
                                    height: 100,
                                    marginTop: -60
                                }}
                            />
                            <Text style={{
                                fontSize: 22,
                                fontFamily: 'outfit-bold',
                            }}>{getPercentageCorrect() > 75 ? 'Congratulations!' : 'Try Again..'}</Text>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'outfit',
                                color: Colors.GRAY
                            }}>You gave {getPercentageCorrect()}% Correct Answers</Text>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15,
                                width: '100%'
                            }}>
                                <View style={styles.resultTextContainer}>
                                    <Text style={styles.resultText}>Total - {totalQuestions}</Text>
                                </View>
                                <View style={styles.resultTextContainer}>
                                    <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
                                    <Text style={styles.resultText}> {correctAnswers}</Text>
                                </View>
                                <View style={styles.resultTextContainer}>
                                    <Ionicons name="close-circle" size={24} color={Colors.RED} />
                                    <Text style={styles.resultText}> {totalQuestions - correctAnswers}</Text>
                                </View>
                            </View>
                        </View>
                        <Button title="Back to Home" onPress={() => router.replace('/(tabs)/home')} />
                        <View style={{
                            marginTop: 20,
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: 'outfit-bold',
                                fontSize: 25,
                            }}>Summary:</Text>
                            <FlatList 
                                data={Object.entries(quizResult)}
                                renderItem={({item, index}) => {
                                    const quizItem = item[1];
                                    return (
                                        <View key={index} style={{
                                            padding: 15,
                                            borderRadius: 15,
                                            marginTop: 5,
                                            borderWidth: 1,
                                            backgroundColor: quizItem?.isCorrect ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                                            borderColor: quizItem?.isCorrect ? Colors.GREEN : Colors.RED
                                        }}>
                                            <Text style={{
                                                fontFamily: 'outfit',
                                                fontSize: 16,
                                            }}>{quizItem?.question}</Text>
                                            <Text style={{
                                                fontFamily: 'outfit',
                                                fontSize: 12
                                            }}>Correct Ans: {quizItem?.correctAnswer}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({
    resultTextContainer: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        elevation: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    resultText: {
        fontFamily: 'outfit',
        fontSize: 18,
    }
})