import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false, icon, rightAction, rightLabel }) => (
  <View style={styles.fieldWrap}>
    <View style={styles.fieldLabelRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {rightLabel && (
        <TouchableOpacity onPress={rightLabel.onPress} activeOpacity={0.7}>
          <Text style={styles.fieldLabelRight}>{rightLabel.text}</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.inputRow}>
      <View style={styles.inputIcon}>
        <Text style={styles.inputIconText}>{icon}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {rightAction && (
        <TouchableOpacity style={styles.inputRightAction} onPress={rightAction.onPress}>
          <Text style={styles.inputIconText}>{rightAction.icon}</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)

const DriverLogin = ({ onDriverLogin, onDriverRegister, onSupport, onBack }) => {
  const [phone, setPhone]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [errors, setErrors]             = useState({})

  const validate = () => {
    const newErrors = {}
    if (!phone.trim()) newErrors.phone = 'Phone number is required'
    else if (phone.replace(/\s/g, '').length < 10) newErrors.phone = 'Enter a valid phone number'
    if (!password.trim()) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      // TODO: API call — POST /auth/login/driver
      // Body  : { phone, password, role: 'driver' }
      setTimeout(() => { setLoading(false); if (onDriverLogin) onDriverLogin() }, 1500)
    } catch (err) {
      setLoading(false)
      setErrors({ general: 'Invalid credentials. Please try again.' })
    }
  }

  const handleForgotPassword = () => {
    // TODO: API call — POST /auth/forgot-password
    // Body: { phone }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        <View style={styles.logoSection}>
          <View style={styles.iconWrap}>
            <View style={styles.iconCard}>
              <View style={styles.navArrow} />
            </View>
            <View style={styles.driverBadge}>
              <Text style={styles.driverBadgeText}>DRIVER</Text>
            </View>
          </View>
          <Text style={styles.appName}>CampusRide</Text>
          <Text style={styles.appTagline}>Driver Login</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Driver Login</Text>
          <Text style={styles.cardSubtitle}>Access your driver dashboard</Text>

          {errors.general && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errors.general}</Text>
            </View>
          )}

          <InputField
            label="Phone Number"
            placeholder="+233 XX XXX XXXX"
            value={phone}
            onChangeText={(v) => { setPhone(v); setErrors((e) => ({ ...e, phone: null })) }}
            keyboardType="phone-pad"
            icon="📞"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: null })) }}
            secureTextEntry={!showPassword}
            icon="🔒"
            rightAction={{
              icon: showPassword ? '🙈' : '👁️',
              onPress: () => setShowPassword((s) => !s),
            }}
            rightLabel={{
              text: 'Forgot?',
              onPress: handleForgotPassword,
            }}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity style={[styles.loginBtn, loading && styles.loginBtnDisabled]} onPress={handleLogin} activeOpacity={0.85} disabled={loading}>
            <Text style={styles.loginBtnText}>{loading ? 'Logging in...' : 'Login  →'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDriverRegister} activeOpacity={0.7} style={styles.createAccountBtn}>
            <Text style={styles.createAccountText}>Don't have an account? <Text style={styles.createAccountLink}>Register →</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={[styles.supportRow, { marginTop: 8 }]} activeOpacity={0.7}>
            <Text style={styles.supportText}>← Change Role</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>ℹ️</Text>
          <Text style={styles.infoBannerText}>Only registered drivers can access this app</Text>
        </View>

        <TouchableOpacity style={styles.supportRow} onPress={onSupport} activeOpacity={0.7}>
          <Text style={styles.supportText}>Need help? <Text style={styles.supportLink}>Contact Support</Text></Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  // Main Container Layout
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

  // Branding Logo Elements
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  iconWrap: {
    position: 'relative',
    marginBottom: 8,
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

  // Driver Specific Branding Badges
  navArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
  driverBadge: {
    position: 'absolute',
    bottom: -6,
    right: -10,
    backgroundColor: '#A3E635',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  driverBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.8,
  },

  // Main UI Form Block
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

  // Exception Message Displays
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  errorBannerText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#DC2626',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },

  // Input Processing Fields
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  fieldLabelRight: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B82F6',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 54,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  inputIcon: {
    opacity: 0.55,
  },
  inputIconText: {
    fontSize: 17,
  },
  inputRightAction: {
    paddingLeft: 8,
    opacity: 0.55,
  },

  // Interactive Buttons & Controls
  loginBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#1E3A8A',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  loginBtnDisabled: {
    opacity: 0.65,
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // Info Notifications
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  infoBannerIcon: {
    fontSize: 16,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#1E3A8A',
    lineHeight: 18,
  },

  // Auxiliary Navigation Elements
  createAccountBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  createAccountText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  createAccountLink: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
  supportRow: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  supportText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  supportLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
})

export default DriverLogin