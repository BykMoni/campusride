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

const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false, icon, rightAction }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
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

const StudentRegister = ({ onRegisterSuccess, onSignIn, onBack }) => {
  const [fullName, setFullName]         = useState('')
  const [studentId, setStudentId]       = useState('')
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [errors, setErrors]             = useState({})

  const validate = () => {
    const newErrors = {}
    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!email.trim()) newErrors.email = 'University email is required'
    else if (!email.includes('@st.ug.edu.gh')) newErrors.email = 'Use your university email (@st.ug.edu.gh)'
    if (!password.trim()) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      // TODO: API call — POST /auth/register/student
      // Body  : { fullName, studentId, email, password }
      setTimeout(() => { setLoading(false); if (onRegisterSuccess) onRegisterSuccess() }, 1500)
    } catch (err) {
      setLoading(false)
      setErrors({ general: 'Registration failed. Please try again.' })
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        <View style={styles.logoSection}>
          <View style={styles.iconCard}>
            <View style={styles.carWrap}>
              <View style={styles.carRoof} />
              <View style={styles.carBase} />
              <View style={[styles.wheel, { left: 5 }]} />
              <View style={[styles.wheel, { right: 5 }]} />
            </View>
          </View>
          <Text style={styles.appName}>CampusRide</Text>
          <Text style={styles.appTagline}>Create your student account</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Register</Text>
          <Text style={styles.cardSubtitle}>Sign up to start catching rides</Text>

          {errors.general && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errors.general}</Text>
            </View>
          )}

          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(v) => { setFullName(v); setErrors((e) => ({ ...e, fullName: null })) }}
            icon="👤"
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          <InputField
            label="Student ID"
            placeholder="Enter your student ID"
            value={studentId}
            onChangeText={(v) => { setStudentId(v); setErrors((e) => ({ ...e, studentId: null })) }}
            icon="🪪"
          />
          {errors.studentId && <Text style={styles.errorText}>{errors.studentId}</Text>}

          <InputField
            label="University Email"
            placeholder="student@st.ug.edu.gh"
            value={email}
            onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: null })) }}
            keyboardType="email-address"
            icon="✉️"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <InputField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: null })) }}
            secureTextEntry={!showPassword}
            icon="🔒"
            rightAction={{
              icon: showPassword ? '🙈' : '👁️',
              onPress: () => setShowPassword((s) => !s),
            }}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity style={[styles.loginBtn, loading && styles.loginBtnDisabled]} onPress={handleRegister} activeOpacity={0.85} disabled={loading}>
            <Text style={styles.loginBtnText}>{loading ? 'Creating account...' : 'Register  →'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignIn} activeOpacity={0.7} style={styles.createAccountBtn}>
            <Text style={styles.createAccountText}>Already have an account? <Text style={styles.createAccountLink}>Sign In</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={[styles.supportRow, { marginTop: 8 }]} activeOpacity={0.7}>
            <Text style={styles.supportText}>← Change Role</Text>
          </TouchableOpacity>
        </View>

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
  iconCard: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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

  // Custom Vector Car Geometric Shapes
  carWrap: {
    alignItems: 'center',
  },
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
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
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

export default StudentRegister