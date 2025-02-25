import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { PracticeOptions } from '../../../constants/Options';
import Colors from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './../../../config/firebaseConfig';
import { UserContext } from '../../../context/userContext';
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid';

export default function PracticeTypeHomeScreen() {

    const { type } = useLocalSearchParams();
    const router = useRouter();
    const option = PracticeOptions.find(item => item.name === type);
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        userDetails && getCourseList();
    }, [userDetails]);

    const getCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        try {
            const q = query(collection(db, "courses"), where(
                'created_by', '==', userDetails?.email
            ), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setCourseList(prev => [...prev, doc.data()]);
            })
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Error getting documents: ", error);
        }
        
    }

    return (
        <View>
            <Image source={option.image} style={{
                width: '100%',
                height: 150,
                resizeMode: 'cover'
            }} />
            <View style={{
                position: 'absolute',
                padding: 15,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 15,
            }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back-sharp" size={28} style={{
                        backgroundColor: Colors.WHITE,
                        padding: 6,
                        borderRadius: 10,
                    }} />
                </Pressable>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35,
                    color: Colors.WHITE
                }}>{type}</Text>
            </View>

            {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} style={{
                marginTop: 200
            }} />}

            <CourseListGrid courseList={courseList} option={option} />
        </View>
    )
}