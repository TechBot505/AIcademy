import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { PracticeOptions } from '../../constants/Options';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function PracticeSection() {
    const router = useRouter();
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
            }}>Practice</Text>

            <View>
                <FlatList 
                    data={PracticeOptions}
                    numColumns={3}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => router.push('/practice/' + item.name)} key={index} style={{
                            margin: 5
                        }}>
                            <Image source={item?.image} 
                                style={{
                                    width: 95,
                                    height: 95,
                                    borderRadius: 15,
                                }}
                            />
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 14,
                                padding: 10,
                                position: 'absolute',
                                color: Colors.WHITE
                            }}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}