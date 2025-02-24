import { View, Platform, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from './../../components/Home/Header';
import Colors from './../../constants/Colors';
import NoCourse from './../../components/Home/NoCourse';
import { db } from './../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserContext } from './../../context/userContext';
import CourseList from './../../components/Home/CourseList';
import PracticeSection from '../../components/Home/PracticeSection';
import CourseProgress from '../../components/Home/CourseProgress';

export default function Home() {

    const [courseList, setCourseList] = useState([]);
    const {userDetails, setUserDetails} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setCourseList([]);
        userDetails && getCourseList();
    }, [userDetails]);

    const getCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'courses'), where("created_by", "==", userDetails?.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setCourseList(prev => [...prev, doc.data()]);
        })
        setLoading(false);
    }

    return (
        <FlatList 
            data={[]}
            onRefresh={() => getCourseList()}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: Colors.WHITE}}
            ListHeaderComponent={
                <View style={{
                    padding: 25,
                    paddingTop: Platform.OS === 'ios' && 45,
                    backgroundColor: Colors.WHITE,
                    flex: 1,
                    paddingBottom: 70
                }}>
                    <Header />
                    {courseList?.length==0 ? 
                        <NoCourse /> : 
                        <View>
                            <CourseProgress courseList={courseList} />
                            <PracticeSection />
                            <CourseList courseList={courseList} />
                        </View>
                    }
                </View>
            }
        />
    )
}