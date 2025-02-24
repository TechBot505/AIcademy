import { View, Text, TextInput, Pressable, ScrollView, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Shared/Button";
import { generateTopicsAIModel, generateCourseAIModel } from "@/config/AiModel";
import Prompt from "@/constants/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserContext } from "@/context/userContext";
import { useRouter } from "expo-router";

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const {userDetails, setUserDetails} = useContext(UserContext);
    const [chapters, setChapters] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const router = useRouter();

    const onGenerateTopic = async () => {
        setLoading(true);
        const PROMPT = userInput + '\n\n' + Prompt.IDEA;
        const aiResponse = await generateTopicsAIModel.sendMessage(PROMPT);
        const idea = JSON.parse(aiResponse.response.text());
        console.log(idea);
        setChapters(idea?.course_titles);
        setLoading(false);
    }

    const onGenerateCourse = async () => {
        setLoading(true);
        const PROMPT = selectedChapters + '\n\n' + Prompt.COURSE;
        try {
            const aiResponse = await generateCourseAIModel.sendMessage(PROMPT);
            const course = JSON.parse(aiResponse?.response.text());
            console.log(course);
            const courseData = course?.courses;
            courseData.forEach( async (item) => {
                await setDoc(doc(db, "courses", Date.now().toString()), {
                    ...item,
                    created_at: new Date(),
                    created_by: userDetails?.email
                });
            })
            router.push('/(tabs)/home');
            setLoading(false);
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Error generating course", ToastAndroid.BOTTOM);
            setLoading(false);
        }
    }

    const handleSelectChapter = (chapter) => {
        if (selectedChapters.includes(chapter)) {
            setSelectedChapters(selectedChapters.filter((item) => item !== chapter));
        } else {
            setSelectedChapters(prev => [...prev, chapter]);
        }
    }

    const isChapterSelected = (chapter) => {
        return selectedChapters.includes(chapter);
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: Colors.WHITE}}>
    <View
      style={{
        flex: 1,
        padding: 25,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Create New Course
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontFamily: "outfit",
          color: Colors.SECONDARY,
        }}
      >
        What would you like to learn today?
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "outfit",
          color: Colors.GRAY,
          marginTop: 5,
        }}
      >
        What course do you want to create (ex. Learn Python, Digital Marketing
        etc..)
      </Text>

      <TextInput
        numberOfLines={3}
        multiline={true}
        placeholder="Ex. Learn Python"
        onChangeText={(text) => setUserInput(text)}
        value={userInput}
        style={{
          fontSize: 16,
          fontFamily: "outfit",
          color: Colors.SECONDARY,
          borderWidth: 1,
          borderColor: Colors.GRAY,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          height: 80,
          textAlignVertical: "top",
        }}
      />
      <Button title="Generate Topic" type='fill' loading={loading} onPress={() => onGenerateTopic()}/>

        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontSize: 18,
                fontFamily: "outfit",
            }}>Select all chapters that you want to add to the course</Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 5
            }}>
                {chapters.map((chapter, index) => (
                    <Pressable key={index} onPress={() => handleSelectChapter(chapter)}>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "outfit",
                            borderWidth: 0.4,
                            padding: 5,
                            borderRadius: 50,
                            paddingHorizontal: 10,
                            backgroundColor: isChapterSelected(chapter) ? Colors.PRIMARY : Colors.WHITE,
                            color: isChapterSelected(chapter) ? Colors.WHITE : Colors.PRIMARY,
                            borderColor: isChapterSelected(chapter) ? Colors.PRIMARY : Colors.TERTIARY,
                        }}>{chapter}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
        { selectedChapters?.length > 0 && <Button title="Generate Course" loading={loading} onPress={onGenerateCourse}></Button>}
    </View>
    </ScrollView>
  );
}
