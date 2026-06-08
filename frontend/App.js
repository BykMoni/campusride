import React, { useState } from 'react'
import { AuthProvider, useAuth } from './src/context/AuthContext'

// Auth screens
import SplashScreen  from './src/screens/auth/SplashScreen'
import Onboarding    from './src/screens/auth/Onboarding'
import RoleSelection from './src/screens/auth/RoleSelection'
import StudentLogin  from './src/screens/auth/StudentLogin'
import DriverLogin   from './src/screens/auth/DriverLogin'
import SignupScreen  from './src/screens/auth/SignupScreen'

// Student screens
import StudentHome from './src/screens/student/StudentHome'

// Driver screens
import DriverHome from './src/screens/driver/DriverHome'

const RootNavigator = () => {
  const [screen, setScreen] = useState('splash')
  const { role, logout }    = useAuth()

  // 1. Splash
  if (screen === 'splash') {
    return (
      <SplashScreen
        onFinish={() => setScreen('onboarding')}
      />
    )
  }

  // 2. Onboarding
  if (screen === 'onboarding') {
    return (
      <Onboarding
        onFinish={() => setScreen('role-selection')}
      />
    )
  }

  // 3. Role Selection
  if (screen === 'role-selection') {
    return (
      <RoleSelection
        onSelectStudent={() => setScreen('student-login')}
        onSelectDriver={()  => setScreen('driver-login')}
      />
    )
  }

  // 4. Student Login
  if (screen === 'student-login') {
    return (
      <StudentLogin
        onStudentLogin={()  => setScreen('home')}
        onCreateAccount={() => setScreen('signup')}
        onGoogleLogin={()   => setScreen('home')}
        onBack={()          => setScreen('role-selection')}
      />
    )
  }

  // 5. Driver Login
  if (screen === 'driver-login') {
    return (
      <DriverLogin
        onDriverLogin={()    => setScreen('home')}
        onDriverRegister={() => setScreen('signup')}
        onSupport={()        => console.log('Support clicked')}
        onBack={()           => setScreen('role-selection')}
      />
    )
  }

  // 6. Signup (Shared / Guest track)
  if (screen === 'signup') {
    return (
      <SignupScreen
        onDone={()   => setScreen('home')}
        onSignIn={() => setScreen('student-login')}
      />
    )
  }

  // 7. Home — role-based routing
  if (screen === 'home') {
    const handleLogout = () => {
      logout()
      setScreen('role-selection')
    }

    if (role === 'driver') {
      return <DriverHome onLogout={handleLogout} />
    }

    return <StudentHome onLogout={handleLogout} />
  }

  return null
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}