import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

const RideHistory = ({ onBack, onNavigate, onChangeTab }) => {
  
  // 💡 TODO: BACKEND INTEGRATION — Switch static mock array into a managed database state variable setup
  // const [historyData, setHistoryData] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // 💡 TODO: BACKEND INTEGRATION — Pull real-time completed travel ledgers on screen frame focus mounting
  // useEffect(() => {
  //   const fetchRideHistory = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token')
  //       const response = await fetch('https://your-api.university.edu/api/drivers/me/trips?status=COMPLETED', {
  //         headers: { 'Authorization': `Bearer ${token}` }
  //       })
  //       const json = await response.json()
  //       setHistoryData(json.data)
  //     } catch (err) { console.error("Error fetching trip archives:", err) }
  //     finally { setIsLoading(false) }
  //   }
  //   fetchRideHistory()
  // }, [])

  const mockHistoryData = [
    {
      id: 'CR2024001',
      date: 'Today, 2:30 PM',
      status: 'Completed',
      type: 'Shared',
      pickup: 'Student Center',
      destination: 'Engineering Building',
      rating: '4.8',
    },
    {
      id: 'CR2024000',
      date: 'Yesterday, 6:45 PM',
      status: 'Completed',
      type: 'Private',
      pickup: 'Library',
      destination: 'Downtown Campus',
      rating: '5.0',
    },
    {
      id: 'CR2023999',
      date: 'Dec 15, 11:20 AM',
      status: 'Completed',
      type: 'Shared',
      pickup: 'Dormitory A',
      destination: 'Sports Complex',
      rating: '4.9',
    },
    {
      id: 'CR2023998',
      date: 'Dec 14, 3:15 PM',
      status: 'Completed',
      type: 'Shared',
      pickup: 'Medical Center',
      destination: 'Student Center',
      rating: '4.7',
    },
    {
      id: 'CR2023997',
      date: 'Dec 13, 8:30 AM',
      status: 'Completed',
      type: 'Private',
      pickup: 'Parking Lot C',
      destination: 'Business School',
      rating: '5.0',
    },
  ]

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* 1. TOP BAR NAVBAR SECTION */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.topBarButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Ride History</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.topBarButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* 2. HISTORY LIST CONTENT CARDS MODULE LAYER */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {mockHistoryData.map((ride) => (
          <View key={ride.id} style={styles.historyCard}>
            
            {/* Metadata Header Meta Row (Date, Status, Type Tag) */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.headerLeftMeta}>
                <Text style={styles.dateText}>{ride.date}</Text>
                <Text style={styles.statusText}>{ride.status}</Text>
              </View>
              <Text style={[
                styles.typeTagText, 
                ride.type === 'Shared' ? styles.sharedColor : styles.privateColor
              ]}>
                {ride.type}
              </Text>
            </View>

            {/* Vertical Routing Visual Stack */}
            <View style={styles.routeContainer}>
              <View style={styles.timelineIndicatorsColumn}>
                <MaterialCommunityIcons name="circle" size={12} color="#2563EB" />
                <View style={styles.verticalLinkConnector} />
                <MaterialCommunityIcons name="map-marker" size={14} color="#DC2626" />
              </View>

              <View style={styles.routeLabelsColumn}>
                <Text style={styles.locationText} numberOfLines={1}>{ride.pickup}</Text>
                <Text style={styles.locationText} numberOfLines={1}>{ride.destination}</Text>
              </View>
            </View>

            {/* Footer Row Block Module (Ride ID + Rating Star Component) */}
            <View style={styles.cardFooterRow}>
              <Text style={styles.rideIdLabel}>Ride ID: #{ride.id}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingNumberValue}>{ride.rating} </Text>
                <MaterialCommunityIcons name="star" size={14} color="#475569" />
              </View>
            </View>

          </View>
        ))}
      </ScrollView>

      {/* 3. PERSISTENT APP FOOTER BOTTOM NAV TABS MENU */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onChangeTab && onChangeTab('home')} activeOpacity={0.7}>
          <View style={styles.tabIconBackground}>
            <MaterialCommunityIcons name="home-outline" size={24} color="#94A3B8" />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onChangeTab && onChangeTab('trips')} activeOpacity={0.7}>
          <View style={styles.tabIconBackground}>
            {/* 🌟 FIXED: Restored 'car-multiple' to keep icon assets uniform across all system tabs */}
            <MaterialCommunityIcons name="car-multiple" size={24} color="#94A3B8" />
          </View>
          <Text style={styles.navLabel}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onBack && onBack()} activeOpacity={0.7}>
          <View style={[styles.tabIconBackground, styles.activeTabIconBackground]}>
            <MaterialCommunityIcons name="account-circle" size={24} color="#1E3A8A" />
          </View>
          <Text style={styles.navLabelActive}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topBarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeftMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  typeTagText: {
    fontSize: 13,
    fontWeight: '700',
  },
  sharedColor: {
    color: '#2563EB',
  },
  privateColor: {
    color: '#A855F7',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 18,
    paddingLeft: 2,
  },
  timelineIndicatorsColumn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 16,
    marginRight: 14,
    paddingVertical: 4,
  },
  verticalLinkConnector: {
    flex: 1,
    width: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  routeLabelsColumn: {
    flex: 1,
    gap: 14,
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  rideIdLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumberValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 4,
    paddingTop: 12,
    paddingHorizontal: 12,
    height: 74,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconBackground: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabIconBackground: {
    backgroundColor: '#EFF6FF',
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  navLabelActive: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
})

export default RideHistory