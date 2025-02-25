import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './../../config/firebaseConfig'
import CourseList from './../Home/CourseList';

export default function CourseListByCategory( { category } ) {

    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCoursesByCategory();
    }, [category]);

    const getCoursesByCategory = async () => {
        setCourseList([]);
        setLoading(true);
        const q = query(collection(db, 'courses'), where('category', '==', category));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setCourseList(prev => [...prev, doc.data()]);
        })
        setLoading(false);
    }

    return (
        <View>
            {courseList?.length > 0 && <CourseList courseList={courseList} heading={category} fontSize={20} />}
        </View>
    )
}