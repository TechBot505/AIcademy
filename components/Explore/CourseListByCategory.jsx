import { View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../../config/firebaseConfig';
import CourseList from './../Home/CourseList';
import { UserContext } from './../../context/userContext';

export default function CourseListByCategory( { category } ) {

    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userDetails, setUserDetails } = useContext(UserContext);

    useEffect(() => {
        getCoursesByCategory();
    }, [category]);

    const getCoursesByCategory = async () => {
        setCourseList([]);
        setLoading(true);
        const q = query(collection(db, 'courses'), where('category', '==', category));
        
        const querySnapshot = await getDocs(q);
        const filteredCourses = querySnapshot.docs
            .map(doc => doc.data())
            .filter(course => course.created_by !== userDetails?.email);
        setCourseList(filteredCourses);
        setLoading(false);
    }

    return (
        <View>
            {courseList?.length > 0 && <CourseList courseList={courseList} heading={category} fontSize={20} enroll={true} />}
        </View>
    )
}