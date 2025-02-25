import { View, Text, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../../constants/Colors';
import { Bar as ProgressBar } from 'react-native-progress';
import Button from './../../../components/Shared/Button';
import { useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';

export default function index() {
    const { courseParams } = useLocalSearchParams();
    const router = useRouter();
    const course = JSON.parse(courseParams);
    const quiz = course?.quiz;
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const onsubmit = () => {
        if (currentPage === quiz.length - 1) {
            console.log('Quiz completed');
        } else {
            setCurrentPage(currentPage + 1);
            setSelectedOption(null);
        }
    }

    const getProgress = (page) => {
        const percentage = (page + 1) / quiz?.length;
        return percentage;
    }

    const onPress = (index, selectedChoice) => {
        setSelectedOption(index);
        setResult(prev => ({
            ...prev,
            [currentPage]: {
                userChoice: selectedChoice,
                isCorrect: selectedChoice === quiz[currentPage]?.correctAnswer,
                question: quiz[currentPage]?.question,
                correctAnswer: quiz[currentPage]?.correctAnswer
            }
        }));
        console.log(result);
    }

    const onQuizFinish = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, 'courses', course?.docId), {
                quizResult: result
            });
            setLoading(false);
            router.replace({
                pathname: '/practice/quiz/summary',
                params: {
                    quizResultParams: JSON.stringify(result),
                }
            })
        } catch (error) {
            console.log('Error', error);
            setLoading(false);
        }
    }

    return (
        <View>
            <Image source={require('./../../../assets/images/wave7.png')}
                style={{
                    width: '100%',
                    height: 600
                }}
            />
            <View style={{
                position: 'absolute',
                padding: 20
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back-sharp" size={28} color={Colors.WHITE} />
                    </Pressable>
                    <Text style={{
                        color: Colors.WHITE,
                        fontFamily: 'outfit-bold',
                        fontSize: 20
                    }}>{currentPage+1} of {quiz?.length}</Text>
                </View>
                <View style={{
                    marginTop: 20,
                    alignItems: 'center'
                }}>
                    <ProgressBar progress={getProgress(currentPage)} width={Dimensions.get('window').width * 0.85} color={Colors.WHITE} height={10} />
                </View>
                <View style={{
                    backgroundColor: Colors.WHITE,
                    height: Dimensions.get('screen').height * 0.65,
                    marginTop: 30,
                    borderRadius: 15,
                    padding: 25,
                    elevation: 1
                }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 25,
                        textAlign: 'center',
                        marginBottom: 20
                    }}>{quiz[currentPage]?.question}</Text>

                    {quiz[currentPage]?.options.map((item, index) => (
                        <TouchableOpacity key={index}
                            onPress={() => onPress(index, item)}
                            style={{
                                padding: 15,
                                marginTop: 15,
                                borderRadius: 15,
                                borderWidth: 1,
                                backgroundColor: selectedOption === index ? Colors.LIGHT_GREEN : null,
                                borderColor: selectedOption === index ? Colors.GREEN : Colors.GRAY
                            }}
                        >
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 16
                            }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {(selectedOption?.toString() && currentPage < quiz?.length-1) && <Button title='Next' onPress={() => onsubmit()} />}

                {(selectedOption?.toString() && currentPage == quiz?.length-1) && <Button title='Finish' loading={loading} onPress={() => onQuizFinish()} />}
            </View>
        </View>
    )
}