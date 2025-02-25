import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './../../context/userContext';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from './../../config/firebaseConfig';
import CourseProgressCard from './../../components/Shared/CourseProgressCard';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function Progress() {

    const [courseList, setCourseList] = useState([]);
    const {userDetails, setUserDetails} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCourseList([]);
        userDetails && getCourseList();
    }, [userDetails]);

    const getCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'courses'), where("created_by", "==", userDetails?.email), orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setCourseList(prev => [...prev, doc.data()]);
        })
        setLoading(false);
    }

    return (
        <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 50,
                backgroundColor: Colors.WHITE,
            }}
            ListHeaderComponent={
                <View>
                    <Image source={require('./../../assets/images/wave8.png')}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 450,
                        }}
                    />
                    <View style={{
                        width: '100%',
                        padding: 20,
                        marginTop: 5
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 28,
                            marginBottom: 10,
                            color: Colors.WHITE
                        }}>Course Progress</Text>
                        <FlatList
                            data={courseList}
                            onRefresh={() => getCourseList()}
                            refreshing={loading}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => (
                                <TouchableOpacity key={index}
                                    onPress={() => router.push({
                                        pathname: '/courseView/' + item?.docId,
                                        params: {
                                            courseParams: JSON.stringify(item)
                                        }
                                    })}
                                >
                                    <CourseProgressCard item={item} width={'95%'} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            }
        />
    )
}