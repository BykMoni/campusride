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

const DriverNotis = ({ onBack, onChangeTab }) => {

  // 💡 TODO: BACKEND INTEGRATION — Switch static mock array into a managed database state variable setup
  // const [notificationsData, setNotificationsData] = useState([])
  
  // 💡 TODO: BACKEND INTEGRATION — Fetch dynamic push payload archives via a lifecycle hook
  // Endpoint target: GET /api/drivers/me/notifications

  const mockNotifications = [
    {
      id: 'notif_1',
      title: 'New ride request nearby',
      description: 'Sarah requested a Shared ride from the main gate. Tap to review.',
      time: '2 minutes ago',
      icon: 'check',
      iconBg: '#DCFCE7',
      iconColor: '#16A34A',
      unread: true,
    },
    {
      id: 'notif_2',
      title: 'Documents verified successfully',
      description: 'Your campus driver permit and vehicle registration logs have been approved by the housing division.',
      time: '1 hour ago',
      icon: 'file-document-outline',
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      unread: false,
    },
    {
      id: 'notif_3',
      title: 'High demand near Balme Library',
      description: 'Lecture blocks are closing soon. Head toward the central circle loop for immediate passenger requests.',
      time: '3 hours ago',
      icon: 'lightning-bolt-outline',
      iconBg: '#F3E8FF',
      iconColor: '#A855F7',
      unread: false,
    },
    {
      id: 'notif_4',
      title: 'System update complete',
      description: 'New optimization features added! Check out our improved route matching maps algorithms.',
      time: 'Yesterday',
      icon: 'bell-outline',
      iconBg: '#FFEDD5',
      iconColor: '#EA580C',
      unread: false,
    },
    {
      id: 'notif_5',
      title: 'Ride request cancelled',
      description: 'The Private ride request to Downtown Campus has been cancelled by the student.',
      time: '2 days ago',
      icon: 'alert-circle-outline',
      iconBg: '#FEE2E2',
      iconColor: '#DC2626',
      unread: false,
    },
    {
      id: 'notif_6',
      title: 'Passenger rating submitted',
      description: 'Alex left you a 5-star rating feedback note: \"Great driving, very polite!\"',
      time: '3 days ago',
      icon: 'star-outline',
      iconBg: '#FEF9C3',
      iconColor: '#CA8A04',
      unread: false,
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
        <Text style={styles.topBarTitle}>Notifications</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.topBarButton}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* 2. NOTIFICATIONS LIST CONTAINER */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((item) => (
          <View key={item.id} style={styles.notifCard}>
            
            {/* Round Avatar Icon Graphic Box */}
            <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
              <MaterialCommunityIcons name={item.icon} size={22} color={item.iconColor} />
            </View>

            {/* Notification Information Main Block Column */}
            <View style={styles.textBlock}>
              <View style={styles.titleRow}>
                <Text style={styles.notifTitle} numberOfLines={1}>{item.title}</Text>
                {item.unread && <View style={styles.unreadBlueDot} />}
              </View>
              <Text style={styles.notifDescription}>{item.description}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
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
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    paddingRight: 4,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  unreadBlueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginLeft: 8,
  },
  notifDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
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

export default DriverNotis