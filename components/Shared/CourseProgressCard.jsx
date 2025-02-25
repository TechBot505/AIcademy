import { View, Text, Image } from 'react-native'
import React from 'react';
import { imageAssets } from './../../constants/Options';
import Colors from './../../constants/Colors';
import { Bar as ProgressBar } from 'react-native-progress';

export default function CourseProgressCard( { item, width=250 } ) {

    const getCompletedChapters = (course) => {
        const completedChapter = course?.completedChapter?.length;
        const percentage = completedChapter / course?.chapters?.length;
        return percentage;
    }

    return (
        <View
            style={{
                width: width ,
                margin: 5,
                padding: 10,
                backgroundColor: Colors.WHITE,
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
                <ProgressBar progress={getCompletedChapters(item)} width={width - 30} color={Colors.PRIMARY} />
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 12,
                    color: Colors.SECONDARY,
                    marginTop: 5
                }}>{item?.completedChapter?.length ?? 0} out of {item?.chapters?.length} Chapters Completed</Text>
            </View>
        </View>
    )
}