import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../../components/CourseView/Intro';
import Colors from '../../../constants/Colors';
import Chapters from '../../../components/CourseView/Chapters';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../../config/firebaseConfig';

export default function CourseView() {
    const { courseParams, courseId } = useLocalSearchParams();
    const [course, setCourse] = useState([]);

    useEffect(() => {
        if(!courseParams) {
            getCourseById();
        } else {
            setCourse(JSON.parse(courseParams));
        }
    }, [courseId]);

    const getCourseById = async () => {
        const docRef = await getDoc(doc(db, 'courses', courseId));
        const courseData = docRef.data();
        setCourse(courseData);
    }
    return course && (
        <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View style={{
                    flex: 1,
                    backgroundColor: Colors.WHITE
                }}>
                    <Intro course={course} />
                    <Chapters course={course} />
                </View>
            }
        />
    )
}