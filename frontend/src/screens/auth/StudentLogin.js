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

// TODO: import API instance when backend is ready
// import api from '../../api/axios'

// TODO: import AuthContext to store user after login
// import { useAuth } from '../../context/AuthContext'

// TODO: import AsyncStorage to persist token
// import AsyncStorage from '@react-native-async-storage/async-storage'

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  icon,
  rightAction,
  rightLabel,
}) => (
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
        <TouchableOpacity
          style={styles.inputRightAction}
          onPress={rightAction.onPress}
        >
          <Text style={styles.inputIconText}>{rightAction.icon}</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)

const LogoIcon = ({ isDriver }) => (
  <View style={styles.iconWrap}>
    <View style={styles.iconCard}>
      <View style={styles.carWrap}>
        <View style={styles.carRoof} />
        <View style={styles.carBase}>
          <View style={[styles.wheel, { left: 5 }]} />
          <View style={[styles.wheel, { right: 5 }]} />
        </View>
      </View>
    </View>
  </View>
)

const StudentLogin = ({ onStudentLogin, onCreateAccount, onGoogleLogin, onBack }) => {
  const [studentId, setStudentId]       = useState('')
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [errors, setErrors]             = useState({})

  const validate = () => {
    const newErrors = {}
    if (!studentId.trim())
      newErrors.studentId = 'Student ID is required'
    if (!email.trim())
      newErrors.email = 'University email is required'
    else if (!email.includes('@st.ug.edu.gh'))
      newErrors.email = 'Use your university email (@st.ug.edu.gh)'
    if (!password.trim())
      newErrors.password = 'Password is required'
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      // ─────────────────────────────────────────
      // TODO: API call — POST /auth/login
      // Endpoint : POST /api/auth/login
      // Body     : { studentId, email, password, role: 'student' }
      // ─────────────────────────────────────────
      setTimeout(() => { setLoading(false); if (onStudentLogin) onStudentLogin() }, 1500)
    } catch (err) {
      setLoading(false)
      setErrors({ general: 'Invalid credentials. Please try again.' })
    }
  }

  const handleGoogleLogin = async () => {
    // ─────────────────────────────────────────
    // TODO: API call — POST /auth/google
    // Endpoint : POST /api/auth/google
    // Body     : { googleToken, role: 'student' }
    // ─────────────────────────────────────────
    if (onGoogleLogin) onGoogleLogin()
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logoSection}>
          <LogoIcon isDriver={false} />
          <Text style={styles.appName}>CampusRide</Text>
          <Text style={styles.appTagline}>Safe rides for students</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Login</Text>
          <Text style={styles.cardSubtitle}>Access your campus rides</Text>

          {errors.general && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errors.general}</Text>
            </View>
          )}

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
            placeholder="Enter your password"
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

          <TouchableOpacity
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={styles.loginBtnText}>
              {loading ? 'Logging in...' : 'Login  →'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onCreateAccount}
            activeOpacity={0.7}
            style={styles.createAccountBtn}
          >
            <Text style={styles.createAccountText}>
              Don't have an account?{' '}
              <Text style={styles.createAccountLink}>Create Account</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.googleLetter}>G</Text>
            <Text style={styles.googleBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={[styles.supportRow, { marginTop: 16 }]} activeOpacity={0.7}>
            <Text style={styles.supportText}>← Change Role</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  scroll: { flexGrow: 1, alignItems: 'center', paddingTop: 60, paddingBottom: 40, paddingHorizontal: 20 },
  logoSection: { alignItems: 'center', marginBottom: 20, gap: 6 },
  iconWrap: { position: 'relative', marginBottom: 8 },
  iconCard: {
    width: 76, height: 76, borderRadius: 20, backgroundColor: '#1E3A8A',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1E3A8A', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 8,
  },
  appName: { fontSize: 26, fontWeight: '800', color: '#1E3A8A', letterSpacing: -0.4 },
  appTagline: { fontSize: 14, color: '#64748B', fontWeight: '400' },
  carWrap: { alignItems: 'center' },
  carRoof: { width: 24, height: 12, backgroundColor: 'white', borderTopLeftRadius: 7, borderTopRightRadius: 7, marginBottom: -1 },
  carBase: { width: 38, height: 15, backgroundColor: 'white', borderRadius: 3 },
  wheel: { position: 'absolute', bottom: -5, width: 11, height: 11, borderRadius: 6, backgroundColor: '#1E3A8A', borderWidth: 2.5, borderColor: 'white' },
  card: {
    width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 5, marginBottom: 16,
  },
  cardTitle: { fontSize: 24, fontWeight: '800', color: '#1F2937', textAlign: 'center', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginBottom: 20 },
  errorBanner: { backgroundColor: '#FEF2F2', borderRadius: 10, padding: 12, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#EF4444' },
  errorBannerText: { fontSize: 13, fontWeight: '500', color: '#DC2626' },
  errorText: { fontSize: 12, color: '#EF4444', marginTop: -8, marginBottom: 8, marginLeft: 4 },
  fieldWrap: { marginBottom: 14 },
  fieldLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  fieldLabel: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  fieldLabelRight: { fontSize: 13, fontWeight: '600', color: '#3B82F6' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 54, paddingHorizontal: 14, backgroundColor: '#F8FAFC', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 14 },
  input: { flex: 1, fontSize: 15, color: '#1F2937' },
  inputIcon: { opacity: 0.55 },
  inputIconText: { fontSize: 17 },
  inputRightAction: { paddingLeft: 8, opacity: 0.55 },
  loginBtn: { width: '100%', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 4, marginBottom: 4, backgroundColor: '#1E3A8A', shadowColor: '#1E3A8A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 8 },
  loginBtnDisabled: { opacity: 0.65 },
  loginBtnText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },
  createAccountBtn: { alignItems: 'center', paddingVertical: 12 },
  createAccountText: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  createAccountLink: { color: '#1E3A8A', fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { fontSize: 13, fontWeight: '500', color: '#94A3B8' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', height: 54, borderRadius: 14, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', marginTop: 4 },
  googleLetter: { fontSize: 20, fontWeight: '800', color: '#DB4437' },
  googleBtnText: { fontSize: 15, fontWeight: '600', color: '#1F2937' },
  supportRow: { alignItems: 'center', paddingVertical: 4 },
  supportText: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  supportLink: { color: '#3B82F6', fontWeight: '600' },
})

export default StudentLogin