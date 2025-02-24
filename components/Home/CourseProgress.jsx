import { View, Text, FlatList, Image } from 'react-native'
import React from 'react';
import { imageAssets } from './../../constants/Options';
import Colors from './../../constants/Colors';
import { Bar as ProgressBar } from 'react-native-progress';

export default function CourseProgress({ courseList }) {
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Progress</Text>

            <FlatList 
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <View key={index}
                        style={{
                            width: 250,
                            margin: 5,
                            padding: 10,
                            backgroundColor: Colors.ACCENT,
                            borderRadius: 15,
                        }}
                    >
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 8,
                        }}>
                            <Image source={imageAssets[item?.banner]}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 15,
                                }}
                            />
                            <View style={{
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        fontFamily: 'outfit-bold',
                                        fontSize: 15,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {item?.courseTitle}
                                </Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 12,
                                    color: Colors.SECONDARY
                                }}>{item?.chapters?.length} Chapters</Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 10
                        }}>
                            <ProgressBar progress={0.5} width={230} color={Colors.PRIMARY} />
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 12,
                                color: Colors.SECONDARY,
                                marginTop: 5
                            }}>2 out of {item?.chapters?.length} Chapters Completed</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}