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

// ─────────────────────────────────────────────
// Reusable input field
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Logo icon — changes based on active tab
// ─────────────────────────────────────────────
const LogoIcon = ({ isDriver }) => (
  <View style={styles.iconWrap}>
    <View style={styles.iconCard}>
      {isDriver ? (
        // Navigation arrow for driver
        <View style={styles.navArrow} />
      ) : (
        // Car for student
        <View style={styles.carWrap}>
          <View style={styles.carRoof} />
          <View style={styles.carBase}>
            <View style={[styles.wheel, { left: 5 }]} />
            <View style={[styles.wheel, { right: 5 }]} />
          </View>
        </View>
      )}
    </View>
    {/* Driver badge */}
    {isDriver && (
      <View style={styles.driverBadge}>
        <Text style={styles.driverBadgeText}>DRIVER</Text>
      </View>
    )}
  </View>
)

// ─────────────────────────────────────────────
// Tab toggle — Student / Driver
// ─────────────────────────────────────────────
const TabToggle = ({ activeTab, onSwitch }) => (
  <View style={styles.tabWrap}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'student' && styles.tabActive]}
      onPress={() => onSwitch('student')}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === 'student' && styles.tabTextActive,
        ]}
      >
        Student
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'driver' && styles.tabActive]}
      onPress={() => onSwitch('driver')}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === 'driver' && styles.tabTextActive,
        ]}
      >
        Driver
      </Text>
    </TouchableOpacity>
  </View>
)

// ─────────────────────────────────────────────
// Student login form
// ─────────────────────────────────────────────
const StudentForm = ({ onLogin, onCreateAccount, onGoogleLogin }) => {
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
      // TODO: BACKEND — Student login
      // Endpoint : POST /api/auth/login
      // Body     : { studentId, email, password, role: 'student' }
      // Response : { token, user: { id, name, role: 'student' } }
      //
      // const response = await api.post('/auth/login', {
      //   studentId, email, password, role: 'student'
      // })
      // await AsyncStorage.setItem('token', response.data.token)
      // await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
      // onLogin(response.data.user)
      // ─────────────────────────────────────────
      setTimeout(() => { setLoading(false); if (onLogin) onLogin() }, 1500)
    } catch (err) {
      setLoading(false)
      // TODO: BACKEND — 401 → wrong credentials, 403 → suspended
      setErrors({ general: 'Invalid credentials. Please try again.' })
    }
  }

  const handleGoogleLogin = async () => {
    // ─────────────────────────────────────────
    // TODO: BACKEND — Google OAuth for students
    // Endpoint : POST /api/auth/google
    // Body     : { googleToken, role: 'student' }
    // Response : { token, user: { id, name, role: 'student' } }
    // ─────────────────────────────────────────
    if (onGoogleLogin) onGoogleLogin()
  }

  return (
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
    </View>
  )
}

// ─────────────────────────────────────────────
// Driver login form
// ─────────────────────────────────────────────
const DriverForm = ({ onLogin, onRegister, onForgotPassword, onSupport }) => {
  const [phone, setPhone]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [errors, setErrors]             = useState({})

  const validate = () => {
    const newErrors = {}
    if (!phone.trim())
      newErrors.phone = 'Phone number is required'
    else if (phone.replace(/\s/g, '').length < 10)
      newErrors.phone = 'Enter a valid phone number'
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
      // TODO: BACKEND — Driver login
      // Endpoint : POST /api/auth/login
      // Body     : { phone, password, role: 'driver' }
      // Response : { token, user: { id, name, role: 'driver' } }
      //
      // const response = await api.post('/auth/login', {
      //   phone, password, role: 'driver'
      // })
      // await AsyncStorage.setItem('token', response.data.token)
      // await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
      // onLogin(response.data.user)
      // ─────────────────────────────────────────
      setTimeout(() => { setLoading(false); if (onLogin) onLogin() }, 1500)
    } catch (err) {
      setLoading(false)
      // TODO: BACKEND — 401 → wrong credentials, 403 → not a registered driver
      setErrors({ general: 'Invalid credentials. Please try again.' })
    }
  }

  return (
    <View>
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
            onPress: onForgotPassword,
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
          onPress={onRegister}
          activeOpacity={0.7}
          style={styles.createAccountBtn}
        >
          <Text style={styles.createAccountText}>
            Don't have an account?{' '}
            <Text style={styles.createAccountLink}>Register →</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info banner — only shown for drivers */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerIcon}>ℹ️</Text>
        <Text style={styles.infoBannerText}>
          Only registered drivers can access this app
        </Text>
      </View>

      {/* Contact support */}
      <TouchableOpacity
        style={styles.supportRow}
        onPress={onSupport}
        activeOpacity={0.7}
      >
        <Text style={styles.supportText}>
          Need help?{' '}
          <Text style={styles.supportLink}>Contact Support</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

// ─────────────────────────────────────────────
// Main Login screen
// ─────────────────────────────────────────────
const LoginScreen = ({
  onStudentLogin,
  onDriverLogin,
  onCreateAccount,
  onDriverRegister,
  onGoogleLogin,
}) => {
  const [activeTab, setActiveTab] = useState('student')

  const handleForgotPassword = () => {
    // TODO: BACKEND — POST /api/auth/forgot-password
    // Body: { phone } → sends reset link/OTP to driver phone
  }

  const handleSupport = () => {
    // TODO: wire to support screen or open email/phone
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

        {/* ── Logo + app name ── */}
        <View style={styles.logoSection}>
          <LogoIcon isDriver={activeTab === 'driver'} />
          <Text style={styles.appName}>CampusRide</Text>
          <Text style={styles.appTagline}>
            {activeTab === 'driver'
              ? 'Driver Login'
              : 'Safe rides for students'}
          </Text>
        </View>

        {/* ── Tab toggle ── */}
        <TabToggle activeTab={activeTab} onSwitch={setActiveTab} />

        {/* ── Form based on active tab ── */}
        {activeTab === 'student' ? (
          <StudentForm
            onLogin={onStudentLogin}
            onCreateAccount={onCreateAccount}
            onGoogleLogin={onGoogleLogin}
          />
        ) : (
          <DriverForm
            onLogin={onDriverLogin}
            onRegister={onDriverRegister}
            onForgotPassword={handleForgotPassword}
            onSupport={handleSupport}
          />
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const styles = StyleSheet.create({

  // ── Layout ──
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

  // ── Logo section ──
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

  // ── Car icon ──
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

  // ── Navigation arrow for driver icon ──
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

  // ── Driver badge ──
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

  // ── Tab toggle ──
  tabWrap: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#1E3A8A',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: 'white',
    fontWeight: '700',
  },

  // ── Form card ──
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

  // ── Error states ──
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

  // ── Input field ──
  fieldWrap: { marginBottom: 14 },
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
  inputIcon: { opacity: 0.55 },
  inputIconText: { fontSize: 17 },
  inputRightAction: { paddingLeft: 8, opacity: 0.55 },

  // ── Login button ──
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
  loginBtnDisabled: { opacity: 0.65 },
  loginBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // ── Create account / Register ──
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

  // ── Divider ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
  },

  // ── Google button ──
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  googleLetter: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DB4437',
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },

  // ── Driver info banner ──
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
  infoBannerIcon: { fontSize: 16 },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#1E3A8A',
    lineHeight: 18,
  },

  // ── Contact support ──
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

export default LoginScreen