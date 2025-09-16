import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TopBar({title}){
    const router = useRouter();

    return (
        <View style={styles.wrapper}>
            <View style={styles.statusBar}>
                <Text style={styles.StatusText}>9:41</Text>
                <View style={styles.statusIcons}>
                    <Ionicons name="cellular" size={16} color="#fff" />
                    <Ionicons name="wifi" size={16} color="#fff" />
                    <Ionicons name="battery-half" size={16} color="#fff" />
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.leftGroup}>
                    <TouchableOpacity onPress={() => router.back()} >
                        <Ionicons name="chevron-back" size={26} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.rightGroup}>
                    <TouchableOpacity>
                        <Ionicons name="person-circle-outline" size={28} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons
                            name="notifications-active"
                            size={28}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#017DD1",
        paddingBottom: 5,
        paddingTop: 10,
        
        width: "100%"
    },
    statusBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        alignItems: "center",
        marginBottom: 6,
    },
    statusText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "600"
    },
    statusIcons: {
        flexDirection: "row",
        gap: 8
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16
    },
    leftGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    rightGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
    }
    
})