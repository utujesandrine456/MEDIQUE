import React , {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, FlatList } from "react-native";
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
}


interface CategoryData {
  [key: string] : HospitalItem[];
}


const categoryData: CategoryData = {
  All: [
    { id: '1', name: 'General Hospital', type: 'General', waitTime: '15 min', distance: '1.2 km' },
    { id: '2', name: 'City Emergency', type: 'Emergency', waitTime: '5 min', distance: '2.3 km' },
    { id: '3', name: 'Dental Care Center', type: 'Dental', waitTime: '25 min', distance: '0.8 km' },
    { id: '4', name: 'Children Medical Center', type: 'Pediatric', waitTime: '10 min', distance: '3.1 km' },
  ],
  General: [
    { id: '1', type:"general", name: 'General Hospital', waitTime: '15 min', distance: '1.2 km' },
    { id: '2', type:"general", name: 'Community Health Center', waitTime: '20 min', distance: '2.5 km' },
    { id: '3', type:"general", name: 'Metropolitan Clinic', waitTime: '30 min', distance: '3.8 km' },
  ],
  Emergency: [
    { id: '1', type:"emergency", name: 'City Emergency', waitTime: '5 min', distance: '2.3 km' },
    { id: '2', type:"emergency", name: 'Urgent Care Facility', waitTime: '10 min', distance: '1.7 km' },
    { id: '3', type:"emergency", name: 'Trauma Center', waitTime: '0 min', distance: '4.2 km' },
  ],
  Dental: [
    { id: '1', type:"dental", name: 'Dental Care Center', waitTime: '25 min', distance: '0.8 km' },
    { id: '2', type:"dental", name: 'Bright Smile Dentistry', waitTime: '15 min', distance: '1.9 km' },
    { id: '3', type:"dental", name: 'Oral Health Specialists', waitTime: '40 min', distance: '2.4 km' },
  ],
  Pediatric: [
    { id: '1', type:"pediatric", name: 'Children Medical Center', waitTime: '10 min', distance: '3.1 km' },
    { id: '2', type:"pediatric", name: 'Kids Health Center', waitTime: '5 min', distance: '2.7 km' },
    { id: '3', type:"pediatric", name: 'Pediatric Specialists', waitTime: '20 min', distance: '4.5 km' },
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


export default function Details() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const renderHospitalItem = ({ item } : { item: HospitalItem }) => (
    <TouchableOpacity style={styles.hospitalCard}>
      <View style={styles.hospitalInfo}>
        <Text style={styles.hospitalName}>{item.name}</Text>
        <Text style={styles.hospitalType}>{item.type || activeCategory}</Text>
        <View style={styles.hospitalDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.waitTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.navigationButton}>
        <Ionicons name="navigate" size={20} color="#017DD1" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TopBar title="Home" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section with Image Background */}
        <ImageBackground source={require("../assets/images/businessman-holding-a-digital-healthcare-symbol-with-medical-network-icons-represents-online-medical-services-protection-and-modern-technolo.jpg")} style={styles.heroSection} 
> 
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <Text style={styles.heroTitle}> Welcome to MEDIQUE</Text>
          <Text style={styles.heroSubtitle}> Find the nearest hospital with the shortest waiting time — fast and easy. </Text>
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
        </ImageBackground>


        <View style={{flexDirection: "column", marginBottom: 20, padding: 10 }}>
           <Text style={{ fontSize: 35, fontFamily: "Poppins_700Bold", textAlign: "center", padding: 15}}>How <Text style={{ color:"#017DD1", fontFamily: "Poppins_700Bold" }}>MEDIQUE</Text> Works</Text>
           <View>
            {cards.map((card) => (
              <View key={card.id} style={{flexDirection: "column", margin: 20, padding: 15, borderRadius: 20, backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }} >
                <View style={{ backgroundColor: "#017DD1", borderRadius: 12, padding: 10, alignSelf: "flex-start", margin: 10 }} >
                  <MaterialIcons name={card.icon} size={26} color="#fff" />
                </View>
                <View style={{}}>
                  <Text style={{fontSize: 22, fontFamily: "Poppins_600SemiBold", marginLeft: 20 }}>{card.title}</Text>
                  <Text style={{ color: "#555", fontSize: 17, fontFamily: "Poppins_400Regular", marginLeft: 20 }}>{card.descri}</Text>
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
    borderRadius: 16,
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
    color: "#000",
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
    fontSize: 20,
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
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  hospitalType: {
    fontSize: 14,
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
    fontSize: 14,
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