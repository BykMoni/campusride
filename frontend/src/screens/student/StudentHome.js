import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuth } from '../../context/AuthContext'

// ─────────────────────────────────────────────
// StudentHome — placeholder until prototype is ready
// ─────────────────────────────────────────────
const StudentHome = () => {
  const { user, logout } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Home</Text>
      <Text style={styles.subtitle}>
        Welcome, {user?.name || 'Student'} 👋
      </Text>
      <Text style={styles.hint}>
        Send prototype to start building this screen
      </Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 32,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  hint: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: '#1E3A8A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
})

export default StudentHome