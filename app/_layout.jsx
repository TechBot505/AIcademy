import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { UserContext } from "@/context/userContext";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {

    useFonts({
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'outfit-light': require('../assets/fonts/Outfit-Light.ttf'),
    });

    const [userDetails, setUserDetails] = useState();

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            <StatusBar style="light" />
            <Stack screenOptions={{
                headerShown: false,
            }}>
            </Stack>
        </UserContext.Provider>
    )
}
