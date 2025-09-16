import React , {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, FlatList , Image} from "react-native";
import { Link } from "expo-router";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import {Ionicons} from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


interface HospitalItem {
  id: string;
  name: string;
  type: string;
  waitTime: string;
  distance: string;
  image: number;
}


interface CategoryData {
  [key: string] : HospitalItem[];
}


const categoryData: CategoryData = {
  All: [
    { id: '1', name: 'Kigali General Hospital', type: 'General', waitTime: '20 min', distance: '1.5 km', image: require('../assets/images/hospital1.jpg') },
    { id: '2', name: 'City Emergency Care', type: 'Emergency', waitTime: '7 min', distance: '2.1 km', image: require('../assets/images/hospital2.jpg') },
    { id: '3', name: 'Bright Smile Dental Clinic', type: 'Dental', waitTime: '30 min', distance: '1.0 km', image: require('../assets/images/hospital3.jpg') },
    { id: '4', name: 'Children’s Medical Center', type: 'Pediatric', waitTime: '12 min', distance: '2.8 km', image: require('../assets/images/hospital4.jpg') },
    { id: '5', name: 'Mount View Hospital', type: 'General', waitTime: '25 min', distance: '3.4 km', image: require('../assets/images/hospital5.jpg') },
    { id: '6', name: 'Rapid Response ER', type: 'Emergency', waitTime: '4 min', distance: '4.1 km', image: require('../assets/images/hospital6.jpg') },
    { id: '7', name: 'Oral Health Specialists', type: 'Dental', waitTime: '45 min', distance: '3.0 km', image: require('../assets/images/hospital7.jpg') },
    { id: '8', name: 'Little Steps Pediatric Clinic', type: 'Pediatric', waitTime: '15 min', distance: '3.6 km', image: require('../assets/images/hospital8.jpg') },
  ],
};



interface Card {
  id: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  descri: string;
}

const cards: Card[] = [
  {id: 1, icon: "local-hospital", title: "Find Nearby Hospitals", descri: "Our system automatically detects your location and shows hospitals with real-time queue information."},
  {id: 2, icon: "schedule", title: "Check Wait Times", descri: "See estimated waiting times updated in real-time by hospital staff to help you choose the fastest option."},
  {id: 3, icon: "directions", title: "Get Directions", descri: "One-tap navigation to your chosen hospital with integrated maps and transportation options."},
]


export default function Hospitals() {
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
              <Text style={styles.detailText}>{item.waitTime}</Text>
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

  return (
    <View style={styles.container}>
      <TopBar title="Hospitals" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section with Image Background */}
        <ImageBackground source={require("../assets/images/hospital.webp")} style={styles.heroSection} > 
          <Text style={styles.heroTitle}> See All List of Hospitals</Text>
          <Text style={styles.heroSubtitle}> Quickly find the nearest hospital with the shortest waiting time. Get the care you need faster and with less stress. </Text>
          <View style={styles.buttonContainer}>
              <Link href="/location" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <Ionicons name="location-outline" size={27} color="#fff" />
                  <Text style={styles.buttonText}>Get Location</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/emergency" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Ionicons name="alert-circle-outline" size={26} color="#d10101ff" />
                  <Text style={styles.secondaryButtonText}>Emergency</Text>
                </TouchableOpacity>
              </Link>
          </View>
        </ImageBackground>

  
        <View style={styles.contentSection} >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{activeCategory} Hospitals</Text>
            <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList<HospitalItem> data={categoryData[activeCategory]} renderItem={renderHospitalItem} keyExtractor = {item => item.id} contentContainerStyle={styles.listContent} scrollEnabled={false} />
        </View>
        
      </ScrollView>

      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
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
  hospitalImage:{
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heroSection: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
    backgroundColor: "#E5E7EB",
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
  buttonText: {
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
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: "#1F2937",
    marginBottom: 15,
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
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1F2937',
    marginBottom: 4,
    paddingTop: 10,
  },
  hospitalType: {
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
    marginBottom: 10,
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
    fontSize: 16,
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