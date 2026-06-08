import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

// Reusable Sub-components matching your theme
const CarIcon = () => (
  <View style={styles.carWrap}>
    <View style={styles.carRoof} />
    <View style={styles.carBase}>
      <View style={[styles.wheel, { left: 5 }]} />
      <View style={[styles.wheel, { right: 5 }]} />
    </View>
  </View>
)

const RoleSelection = ({ onSelectStudent, onSelectDriver }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.logoSection}>
          <View style={styles.iconCard}>
            <CarIcon />
          </View>
          <Text style={styles.appName}>CampusRide</Text>
          <Text style={styles.appTagline}>Safe rides for everyone on campus</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome to CampusRide</Text>
          <Text style={styles.cardSubtitle}>Please select your role to continue</Text>

          <View style={styles.roleGrid}>
            <TouchableOpacity 
              style={styles.roleOption} 
              onPress={onSelectStudent}
              activeOpacity={0.75}
            >
              <View style={styles.roleOptionIconCard}>
                <Text style={styles.roleOptionIconText}>🎓</Text>
              </View>
              <View style={styles.roleOptionMeta}>
                <Text style={styles.roleOptionTitle}>I am a Student</Text>
                <Text style={styles.roleOptionSubtitle}>Book rides using university email</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.roleOption} 
              onPress={onSelectDriver}
              activeOpacity={0.75}
            >
              <View style={styles.roleOptionIconCard}>
                <Text style={styles.roleOptionIconText}>🚖</Text>
              </View>
              <View style={styles.roleOptionMeta}>
                <Text style={styles.roleOptionTitle}>I am a Driver</Text>
                <Text style={styles.roleOptionSubtitle}>Access dashboard & manage trips</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  iconCard: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: -0.4,
  },
  appTagline: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
  },
  carWrap: { alignItems: 'center' },
  carRoof: {
    width: 24,
    height: 12,
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginBottom: -1,
  },
  carBase: {
    width: 38,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  wheel: {
    position: 'absolute',
    bottom: -5,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#1E3A8A',
    borderWidth: 2.5,
    borderColor: 'white',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleGrid: {
    width: '100%',
    gap: 16,
    marginTop: 8,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 20,
    gap: 16,
  },
  roleOptionIconCard: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleOptionIconText: {
    fontSize: 22,
  },
  roleOptionMeta: {
    flex: 1,
  },
  roleOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  roleOptionSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
})

export default RoleSelection