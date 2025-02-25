import { View, Text, Image, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { imageAssets } from './../../constants/Options';
import Colors from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from './../Shared/Button';
import { useRouter } from 'expo-router';
import { UserContext } from './../../context/userContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Intro( { course, enroll } ) {

    const router = useRouter();
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        setLoading(true);
        const docId = Date.now().toString();
        const data = {
            ...course,
            created_at: new Date(),
            created_by: userDetails?.email,
            enrolled: true,
        }
        await setDoc(doc(db, 'courses', docId), data)
        router.push({
            pathname: '/courseView/' + docId,
            params: {
                courseParams: JSON.stringify(data),
                enroll: false
            }
        })
        setLoading(false);
    }
    return (
        <View>
            <Image source={imageAssets[course?.banner]}
                style={{
                    width: '100%',
                    height: 250,
                    borderRadius: 15,
                    borderWidth: 0.1,
                    borderColor: Colors.SECONDARY
                }}
            />
            <View style={{
                padding: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25
                }}>{course?.courseTitle}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 5,
                    }}
                >
                    <Ionicons name="book-outline" size={18} color={Colors.PRIMARY} />
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.PRIMARY,
                    }}>{course?.chapters?.length} Chapters</Text>
                </View>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 18,
                    marginTop: 10
                }}>Description:</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    color: Colors.GRAY
                }}>{course.description}</Text>
                {enroll=='true' ? <Button title="Enroll in Course" loading={loading} onPress={() => onEnrollCourse()} /> : <Button title="Start Course"/>}
            </View>
            <Pressable style={{
                position: 'absolute',
                padding: 5,
                zIndex: 100,
                top: 35,
                left: 5,
                width: 45,
                height: 45,
                borderRadius: 50,
                backgroundColor: Colors.WHITE,
                justifyContent: 'center',
                alignItems: 'center'
            }} onPress={() => router.replace('/(tabs)/home')}>
                <Ionicons name="arrow-back-sharp" size={28} color={Colors.TERTIARY} />
            </Pressable>
        </View>
    )
}