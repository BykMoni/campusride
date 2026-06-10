import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context' 
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// 💡 TODO: BACKEND INTEGRATION — Import Auth context wrapper to access current authenticated session tokens
// import { useAuth } from '../../context/AuthContext'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// 💡 TODO: BACKEND INTEGRATION — Import image picker module to handle profile avatar media uploads
// import * as ImagePicker from 'expo-image-picker'

const { width } = Dimensions.get('window')

// Verified badge icon
const VerifiedBadge = () => (
  <View style={styles.verifiedBadge}>
    <MaterialCommunityIcons name="check" size={14} color="#1E3A8A" style={styles.verifiedCheck} />
  </View>
)

// Rating pill indicator
const RatingPill = ({ rating }) => (
  <View style={styles.ratingPill}>
    <MaterialCommunityIcons name="star" size={14} color="#1E3A8A" />
    <Text style={styles.ratingText}>{rating} RATING</Text>
  </View>
)

// Stats row data metrics
const StatsRow = ({ totalTrips, tripsToday }) => (
  <View style={styles.statsRow}>
    <View style={styles.statItem}>
      <MaterialCommunityIcons name="car-multiple" size={24} color="#3B82F6" style={styles.statIcon} />
      <Text style={styles.statNumber}>{totalTrips}</Text>
      <Text style={styles.statLabel}>TOTAL TRIPS</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.statItem}>
      <MaterialCommunityIcons name="calendar-month" size={24} color="#3B82F6" style={styles.statIcon} />
      <Text style={styles.statNumber}>{tripsToday}</Text>
      <Text style={styles.statLabel}>TRIPS TODAY</Text>
    </View>
  </View>
)

// Menu list action row component
const MenuItem = ({ iconName, label, onPress, showDot = false, isFirst = false, isLast = false }) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      isFirst && styles.menuItemFirst,
      isLast && styles.menuItemLast,
      !isLast && styles.menuItemBorder,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconWrap}>
      <MaterialCommunityIcons name={iconName} size={20} color="#475569" />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <View style={styles.menuRight}>
      {showDot && <View style={styles.notifDot} />}
      <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
    </View>
  </TouchableOpacity>
)

// Bottom navigation manager component
const BottomNav = ({ activeTab, onNavigate }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('home')} activeOpacity={0.7}>
      <View style={styles.tabIconBackground}>
        <MaterialCommunityIcons 
          name={activeTab === 'home' ? 'home' : 'home-outline'} 
          size={24} 
          color={activeTab === 'home' ? '#1E3A8A' : '#94A3B8'} 
        />
      </View>
      <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('active-requests')} activeOpacity={0.7}>
      <View style={styles.tabIconBackground}>
        <MaterialCommunityIcons 
          name="car-multiple" 
          size={24} 
          color={activeTab === 'trips' ? '#1E3A8A' : '#94A3B8'} 
        />
      </View>
      <Text style={[styles.navLabel, activeTab === 'trips' && styles.navLabelActive]}>Trips</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('profile')} activeOpacity={0.7}>
      {/* 🌟 FIXED HIGHLIGHT CONTAINER: Soft-blue pill capsule styling perfectly uniform with Home and Trips */}
      <View style={[styles.tabIconBackground, activeTab === 'profile' && styles.activeTabIconBackground]}>
        <MaterialCommunityIcons 
          name={activeTab === 'profile' ? 'account-circle' : 'account-circle-outline'} 
          size={24} 
          color={activeTab === 'profile' ? '#1E3A8A' : '#94A3B8'} 
        />
      </View>
      <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Profile</Text>
    </TouchableOpacity>
  </View>
)

// Main screen controller
const DriverProfile = ({ onLogout, onNavigate }) => {

  // 💡 TODO: BACKEND INTEGRATION — Pull authenticated database record model via custom context hook
  // const { user } = useAuth()
  const user = {
    name:       'Alex Johnson',
    email:      'alex.j@university.edu',
    rating:     4.9,
    totalTrips: 42,
    tripsToday: 5,
    avatar:     null, // 💡 TODO: BACKEND INTEGRATION — Switch with live image link (user.avatarUrl)
    verified:   true,
  }

  const handleRideHistory = () => {
    if (onNavigate) onNavigate('ride-history')
  }

  const handleNotifications = () => {
    if (onNavigate) onNavigate('notifications')
  }

  const handleHelpSupport = () => {
    if (onNavigate) onNavigate('help-support')
  }

  const handleSettings = () => {
    if (onNavigate) onNavigate('settings')
  }

  const handleLogout = () => {
    // 💡 TODO: BACKEND INTEGRATION — Evict authentication and access tokens from AsyncStorage cache memory 
    // await AsyncStorage.removeItem('token')
    // await AsyncStorage.removeItem('user')
    if (onLogout) onLogout()
  }

  const handleUpdatePhoto = async () => {
    // 💡 TODO: BACKEND INTEGRATION — Setup expo camera library asset selection and upload to server bucket repository
    // 1. const result = await ImagePicker.launchImageLibraryAsync({...})
    // 2. Body: FormData binary payload -> PATCH /api/drivers/me/avatar
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Top logo header section */}
      <View style={styles.topBar}>
        <Text style={styles.topBarLogo}>CampusRide</Text>
        <TouchableOpacity onPress={handleUpdatePhoto} activeOpacity={0.8}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.topBarAvatar} />
          ) : (
            <View style={styles.topBarAvatarPlaceholder}>
              <Text style={styles.topBarAvatarInitials}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* User identification header card layout */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleUpdatePhoto} activeOpacity={0.85} style={styles.photoWrap}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.profilePhotoPlaceholder}>
                <Text style={styles.profilePhotoInitials}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            {user.verified && <VerifiedBadge />}
          </TouchableOpacity>

          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <RatingPill rating={user.rating} />
        </View>

        {/* User metrics analytics breakdown block */}
        <StatsRow totalTrips={user.totalTrips} tripsToday={user.tripsToday} />

        {/* Settings options card list links */}
        <View style={styles.menuCard}>
          <MenuItem iconName="clock-outline" label="Ride History" onPress={handleRideHistory} isFirst />
          <MenuItem iconName="bell-outline" label="Notifications" onPress={handleNotifications} showDot />
          <MenuItem iconName="help-circle-outline" label="Help & Support" onPress={handleHelpSupport} />
          <MenuItem iconName="cog-outline" label="Settings" onPress={handleSettings} isLast />
        </View>

        {/* Account login termination controller action */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <MaterialCommunityIcons name="logout" size={18} color="#EF4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Persistent platform bottom tabs action menu */}
      <BottomNav activeTab="profile" onNavigate={(tab) => onNavigate && onNavigate(tab)} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12, 
    paddingBottom: 16,
    backgroundColor: '#F0F4F8',
  },
  topBarLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: -0.4,
  },
  topBarAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E3A8A',
  },
  topBarAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  topBarAvatarInitials: {
    fontSize: 13,
    fontWeight: '700',
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
    gap: 8,
  },
  photoWrap: {
    position: 'relative',
    marginBottom: 4,
  },
  profilePhoto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: 'white',
  },
  profilePhotoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  profilePhotoInitials: {
    fontSize: 36,
    fontWeight: '800',
    color: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#A3E635',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  verifiedCheck: {
    fontWeight: '800',
  },
  profileName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
    textAlign: 'center',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    marginBottom: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
  },
  menuItemFirst: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItemLast: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutIcon: {
    marginRight: -2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EDF2',
    paddingBottom: 4, 
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
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

export default DriverProfile