import {Stack} from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import {Text, View} from 'react-native';



export default function Layout(){
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

    if(!fontsLoaded){
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{ fontSize: 24}}>Loading Fonts</Text>
        </View>
      )
    }


    return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home"}} />
      <Stack.Screen name="list" options={{ title: "Hospitals"}} />
      <Stack.Screen name="details" options={{ title: "Details"}} />
    </Stack>
  )

}
