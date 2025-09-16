import {Tabs} from 'expo-router';


export default function Layout(){
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home"}} />
            <Tabs.Screen name="hospital/list" options={{ title: "Hospitals"}} />
            <Tabs.Screen name="profile" options={{ title: "Profile"}} />
        </Tabs>
    )
}