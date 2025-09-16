import React , {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, ImageBackground, ScrollView, FlatList, Linking, TextInput, Alert } from "react-native";
import { Link } from "expo-router";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import {Ionicons} from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


interface HospitalItem {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: string;
  image: number;
}


interface CategoryData {
  [key: string] : HospitalItem[];
}


const categoryData: CategoryData = {
  All: [
    { id: '1', name: 'General Hospital', type: 'General', location: 'Nyarugenge, Kigali', distance: '1.2 km', image: require('../assets/images/90ca3c17370c7df27575ae63f3b5fb42.jpg') },
    { id: '2', name: 'City Emergency', type: 'Emergency', location: 'Gasabo, Kigali', distance: '2.3 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
    { id: '3', name: 'Dental Care Center', type: 'Dental', location: 'Huye, Southern Province', distance: '0.8 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
    { id: '4', name: 'Children Medical Center', type: 'Pediatric', location: 'Musanze, Northern Province', distance: '3.1 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
  ],
  General: [
    { id: '1', type:"general", name: 'General Hospital', location: 'Nyarugenge, Kigali', distance: '1.2 km', image: require('../assets/images/90ca3c17370c7df27575ae63f3b5fb42.jpg') },
    { id: '2', type:"general", name: 'Community Health Center', location: 'Muhanga, Southern Province', distance: '2.5 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
    { id: '3', type:"general", name: 'Metropolitan Clinic', location: 'Rubavu, Western Province', distance: '3.8 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
  ],
  Emergency: [
    { id: '1', type:"emergency", name: 'City Emergency', location: 'Gasabo, Kigali', distance: '2.3 km', image: require('../assets/images/90ca3c17370c7df27575ae63f3b5fb42.jpg') },
    { id: '2', type:"emergency", name: 'Urgent Care Facility', location: 'Nyagatare, Eastern Province', distance: '1.7 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
    { id: '3', type:"emergency", name: 'Trauma Center', location: 'Karongi, Western Province', distance: '4.2 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
  ],
  Dental: [
    { id: '1', type:"dental", name: 'Dental Care Center', location: 'Huye, Southern Province', distance: '0.8 km', image: require('../assets/images/90ca3c17370c7df27575ae63f3b5fb42.jpg') },
    { id: '2', type:"dental", name: 'Bright Smile Dentistry', location: 'Rwamagana, Eastern Province', distance: '1.9 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
    { id: '3', type:"dental", name: 'Oral Health Specialists', location: 'Nyamasheke, Western Province', distance: '2.4 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
  ],
  Pediatric: [
    { id: '1', type:"pediatric", name: 'Children Medical Center', location: 'Musanze, Northern Province', distance: '3.1 km', image: require('../assets/images/90ca3c17370c7df27575ae63f3b5fb42.jpg') },
    { id: '2', type:"pediatric", name: 'Kids Health Center', location: 'Bugesera, Eastern Province', distance: '2.7 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
    { id: '3', type:"pediatric", name: 'Pediatric Specialists', location: 'Rusizi, Western Province', distance: '4.5 km', image: require('../assets/images/1ec363db9598a75130f66966aacbc810.jpg') },
  ],
};



interface Card {
  id: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  descri: string;
}

const cards: Card[] = [
  {
    id: 1,
    icon: "local-hospital",
    title: "Find Nearby Hospitals",
    descri:
      "Our system automatically detects your location and shows hospitals in your area with real-time queue information. You can quickly view available facilities."
  },
  {
    id: 2,
    icon: "schedule",
    title: "Check Wait Times",
    descri:
      "See estimated waiting times updated in real-time by hospital staff, so you can plan ahead. You’ll know which hospitals have the shortest queues before leaving home."
  },
  {
    id: 3,
    icon: "directions",
    title: "Get Directions",
    descri:
      "With one tap, get turn-by-turn navigation to your chosen hospital using integrated maps. You can choose driving, walking, or public transport directions."
  }
];



export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const renderHospitalItem = ({ item } : { item: HospitalItem }) => (
    <TouchableOpacity style={styles.hospitalCard}>
      <View style={styles.hospitalInfo}>
        <Image source={item.image} style={styles.hospitalImage} />
        <Text style={styles.hospitalName}>{item.name}</Text>
        <Text style={styles.hospitalType}>{item.type || activeCategory}</Text>
        <View style={styles.hospitalDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color="#017DD1" style={styles.navigationButton} />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={20} color="#017DD1" style={styles.navigationButton} />
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
          <View style={styles.navigationButton}>
            <Ionicons name="navigate" size={24} color="#017DD1" />
          </View>
        </View>
      </View>
      
    </TouchableOpacity>
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Please fill all fields");
      return;
    }
    Alert.alert("Message Sent!", `Thanks ${name}, we'll get back to you soon.`);
    
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <TopBar title="Home" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section with Image Background */}
        <ImageBackground source={require("../assets/images/hospital-lobby-clinic-waiting-room-polyclinic-corridor-healthcare-facility-there-comfortable-chairs-sofa-reception-280064305.webp")} style={styles.heroSection} 
> 
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.heroTitle}> Welcome To MEDIQUE</Text>
            <Text style={styles.heroSubtitle}>Quickly find the nearest hospital with the shortest waiting time. Get the care you need faster and with less stress.</Text>
            <View style={styles.buttonContainer}>
                <Link href="/hospitals" asChild>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Ionicons name="location-outline" size={27} color="#fff" />
                    <Text style={styles.buttonText}>Find Hospitals</Text>
                  </TouchableOpacity>
                </Link>

                <Link href="/details" asChild>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Ionicons name="alert-circle-outline" size={26} color="#d10101ff" />
                    <Text style={styles.secondaryButtonText}>Emergency</Text>
                  </TouchableOpacity>
                </Link>
            </View>
          </View>
          
        </ImageBackground>


        <View style={{flexDirection: "column", marginBottom: 20, padding: 10, marginTop: 30 }}>
           <Text style={{ fontSize: 35, fontFamily: "Poppins_700Bold", textAlign: "center", padding: 10}}>How <Text style={{ color:"#017DD1", fontFamily: "Poppins_700Bold" }}>MEDIQUE</Text> Works</Text>
           <View>
            {cards.map((card) => (
              <View key={card.id} style={{flexDirection: "column", width: "90%", alignSelf: "center", margin: 20, padding: 15, borderRadius: 20, backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }} >
                <View style={{ backgroundColor: "#017DD1", borderRadius: 12, padding: 10, alignSelf: "flex-start", margin: 10 }} >
                  <MaterialIcons name={card.icon} size={26} color="#fff" />
                </View>
                <View style={{}}>
                  <Text style={{fontSize: 22, fontFamily: "Poppins_600SemiBold", marginLeft: 20, margin: 10 }}>{card.title}</Text>
                  <Text style={{ color: "#555", fontSize: 17, fontFamily: "Poppins_400Regular", marginLeft: 20, margin: 10}}>{card.descri}</Text>
                </View>
              </View>
            ))}
           </View>
        </View> 
        

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Categories</Text>
          <View style={styles.categoryRow}>
              {Object.keys(categoryData).map(category => (
                <TouchableOpacity key={category} style={[ styles.categoryButton, activeCategory === category && styles.activeCategory ]} onPress ={() => setActiveCategory(category)}>
                      <Text style={[ styles.categoryButtonText, activeCategory === category && styles.activeCategoryText ]}>{category}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>


        <View style={styles.contentSection} >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{activeCategory} Facilities</Text>
            <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList<HospitalItem> data={categoryData[activeCategory]} renderItem={renderHospitalItem} keyExtractor = {item => item.id} contentContainerStyle={styles.listContent} scrollEnabled={false} />
        </View>


        <View style={styles.containertitle}>
          <Text style={styles.titlecontainer}>Contact Us</Text>

          <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={[styles.input, { height: 100 }]} placeholder="Your Message" value={message} onChangeText={setMessage} multiline />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.buttonTextcontainer}>Send Message</Text>
          </TouchableOpacity>
        </View>


        <View>
          <View>
              <Text style={[styles.heroTitle, { fontSize: 35 , marginTop: 20 }]}>MEDIQUE</Text>
              <Text style={{ color: "#000", fontFamily: "Poppins_400Regular", fontSize: 17, textAlign: "center"}}> Find the nearest hospital with the shortest waiting time — fast and easy. </Text>
          </View>
          <View>
            <Text style={{ textAlign: "center", color: "#000",fontSize: 20, marginBottom: 15, fontFamily: "Poppins_600SemiBold" }}>Contact us on</Text>
            <Text style={{ textAlign: "center", color: "#000",fontSize: 18, marginBottom: 5, fontFamily: "Poppins_400Regular" }}>Email: <Text style={{ color: "#017DD1"}}>info@medique.com</Text></Text>
            <Text style={{ textAlign: "center", color: "#000",fontSize: 18, marginBottom: 5, fontFamily: "Poppins_400Regular" }}>Phone: <Text style={{ color: "#017DD1"}}>+250 785 805 869</Text> </Text>
            <Text style={{ textAlign: "center", color: "#000",fontSize: 18, marginBottom: 20, fontFamily: "Poppins_400Regular" }}>Address: <Text style={{ color: "#017DD1"}}>Ruhengeri, Musanze, Rwanda</Text></Text>  
          </View>
          <View>
            <Text style={{ textAlign: "center", color: "#000",fontSize: 20, marginBottom: 20, fontFamily: "Poppins_600SemiBold" }}>Follow us on</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')} style={{ marginHorizontal: 10 }}>
                <Ionicons name="logo-facebook" size={30} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')} style={{ marginHorizontal: 10 }}>
                <Ionicons name="logo-twitter" size={30} color="#00acee" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com')} style={{ marginHorizontal: 10 }}>
                <Ionicons name="logo-linkedin" size={30} color="#0e76a8" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ textAlign: "center", color: "#000",fontSize: 18, marginBottom: 5, fontFamily: "Poppins_500Medium" }}>© 2025 MEDIQUE. All rights reserved.</Text>
        </View>

      </ScrollView>

      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  containertitle: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  hospitalImage:{
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titlecontainer: {
    fontSize: 35,
    fontFamily: "Poppins_700Bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1F2937",
    paddingBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#F9FAFB",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#017DD1",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonTextcontainer: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryRow: {
    flexDirection: "row",
  },
  heroSection: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  signUpButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  signUpButtonText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#017DD1",
  },
  heroTitle: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 8,
    paddingHorizontal: 20,
    color: "#017DD1",
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#017DD1",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    width: "45%",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4ff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    width: "45%",
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#1F2937',
  },
  buttonText:{
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: "#d10101ff",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    marginLeft: 8,
  },
  categoryContainer: {
    padding: 20,
  },
  categoryTitle: {
    fontSize: 35,
    fontFamily: "Poppins_700Bold",
    color: "#1F2937",
    marginBottom: 30,
    padding: 15,
     textAlign: "center",
  },
  categoryScrollView: {
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "#017DD1",
  },
  categoryButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#4B5563",
  },
  activeCategoryText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_500Medium"
  },
  contentSection: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#017DD1',
    fontFamily: 'Poppins_600SemiBold',
  },
  listContent: {
    paddingBottom: 20,
  },
  hospitalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 23,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1F2937',
    marginBottom: 4,
    padding: 5,
  },
  hospitalType: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
    marginBottom: 10,
    padding: 2,
  },
  hospitalDetails: {
    flexDirection: 'row',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginLeft: 5,
  },
  navigationButton: {
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 50,
  },
});