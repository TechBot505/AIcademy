import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

    useFonts({
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'outfit-light': require('../assets/fonts/Outfit-Light.ttf'),
    });

    return (
        <Stack screenOptions={{
          headerShown: false,
        }}>

        </Stack>
    )
}
