import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { Bar as ProgressBar } from 'react-native-progress';
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';

export default function ChapterView() {

    const router = useRouter();
    const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
    const chapter = JSON.parse(chapterParams);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const getProgress = (page) => {
        const progress = (page+1 / chapter?.content?.length);
        return progress;
    }

    const onChapterComplete = async () => {
        setLoading(true);
        await updateDoc(doc(db, 'courses', docId), {
            completedChapter: arrayUnion(chapterIndex)
        })
        setLoading(false);
        router.replace('/courseView/' + docId);
    }

    return (
        <ScrollView 
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
                paddingBottom: 40
            }} 
            showsVerticalScrollIndicator={false} 
            style={{
                padding: 25,
                backgroundColor: Colors.WHITE,
                flex: 1,
                paddingTop: 50
            }}
        >
            <View>
                <ProgressBar progress={getProgress(currentPage)} width={null} color={Colors.PRIMARY} />
                <View style={{
                    marginTop: 20
                }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 25
                    }}>{chapter?.content[currentPage].topic}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 18,
                        marginTop: 10
                    }}>
                        {chapter?.content[currentPage].explaination}
                    </Text>
                    {
                        chapter?.content[currentPage].code && (
                            <View>
                                <Text style={{
                                    fontFamily: 'outfit-bold',
                                    fontSize: 20,
                                    marginTop: 20
                                }}>Code:</Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 18,
                                    marginTop: 10,
                                    backgroundColor: Colors.SECONDARY,
                                    padding: 10,
                                    borderRadius: 15,
                                    color: Colors.ACCENT
                                }}>
                                    {chapter?.content[currentPage].code}
                                </Text>
                            </View>
                        )
                    }
                    {
                        chapter?.content[currentPage].example && (
                            <View>
                                <Text style={{
                                    fontFamily: 'outfit-bold',
                                    fontSize: 20,
                                    marginTop: 20
                                }}>Example:</Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 18,
                                    marginTop: 10,
                                    backgroundColor: Colors.ACCENT,
                                    padding: 10,
                                    borderRadius: 15
                                }}>
                                    {chapter?.content[currentPage].example}
                                </Text>
                            </View>
                        )
                    }
                </View>
            </View>
            <View>
                {chapter?.content?.length - 1 != currentPage ? <Button title="Next" onPress={() => setCurrentPage(currentPage+1)} /> : 
                    <Button loading={loading} title="Finish" onPress={() => onChapterComplete()} />
                }
                
            </View>
        </ScrollView>
    )
}