import { View, Text, Image, Pressable, Dimensions, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../../constants/Colors';
import { Bar as ProgressBar } from 'react-native-progress';
import { useRouter } from 'expo-router';
import FlipCard  from 'react-native-flip-card';

export default function FlashcardScreen() {
    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const flashcards = course?.flashcards;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);

    const getProgress = (page) => {
        const percentage = (page + 1) / flashcards?.length;
        return percentage;
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentPage(viewableItems[0].index);
        }
    };

    return (
        <View>
            <Image source={require('./../../../assets/images/wave8.png')}
                style={{
                    width: '100%',
                    height: 600
                }}
            />
            <View style={{
                position: 'absolute',
                padding: 25,
                width: '100%',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Pressable>
                        <Ionicons name="arrow-back-sharp" size={28} color={Colors.WHITE} onPress={() => router.back()} />
                    </Pressable>
                    <Text style={{
                        color: Colors.WHITE,
                        fontFamily: 'outfit-bold',
                        fontSize: 20
                    }}>{currentPage+1} of {flashcards?.length}</Text>
                </View>
                <View style={{
                    marginTop: 20,
                    alignItems: 'center'
                }}>
                    <ProgressBar progress={getProgress(currentPage)} width={Dimensions.get('window').width * 0.85} color={Colors.WHITE} height={10} />
                </View>
                <FlatList
                    data={flashcards}
                    horizontal={true}
                    pagingEnabled={true}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <View key={index} style={{
                            height: 500,
                            marginTop: 50,
                        }}>
                            <FlipCard style={styles.flipCard}>
                            <View style={styles.face}>
                                <Text style={{
                                    fontSize: 25,
                                    fontFamily: 'outfit-bold',
                                    padding: 20,
                                    textAlign: 'center'
                                }}>{item?.front}</Text>
                            </View>
                            <View style={styles.back}>
                                <Text style={{
                                    width: Dimensions.get('screen').width * 0.78,
                                    fontSize: 25,
                                    fontFamily: 'outfit',
                                    padding: 20,
                                    color: Colors.WHITE,
                                    textAlign: 'center'
                                }}>{item?.back}</Text>
                            </View>
                            </FlipCard>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flipCard: {
        height: 400,
        width: Dimensions.get('screen').width * 0.78,
        backgroundColor: Colors.WHITE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: Dimensions.get('screen').width * 0.04,
    },
    face: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 20,
    },
    back: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
    }
})