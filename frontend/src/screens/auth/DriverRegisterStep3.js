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
  Alert,
  Image,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'

// UploadRow — reusable row for document / input fields
const UploadRow = ({
  label,
  icon,
  fileName,
  onUploadPress,
  showInput = false,
  inputValue,
  onInputChange,
}) => (
  <View style={styles.uploadBlock}>
    <View style={styles.uploadLabelRow}>
      <Text style={styles.uploadIcon}>{icon}</Text>
      <Text style={styles.uploadLabel}>{label}</Text>
    </View>
    <View style={styles.actionRow}>
      {showInput ? (
        <TextInput
          style={styles.inlineInput}
          placeholder="GHA-XXXXXXXXX-X"
          placeholderTextColor="#94A3B8"
          value={inputValue}
          onChangeText={onInputChange}
          autoCapitalize="characters"
          keyboardType="default"
        />
      ) : (
        <>
          <Text
            style={[styles.fileNameText, !fileName && styles.noFileText]}
            numberOfLines={1}
          >
            {fileName}
          </Text>
          <TouchableOpacity
            style={styles.inlineUploadBtn}
            onPress={onUploadPress}
            activeOpacity={0.8}
          >
            <Text style={styles.inlineUploadBtnText}>Upload</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
)

// GhanaCardPreview — shows thumbnail previews of front/back images
const GhanaCardPreview = ({ frontUri, backUri }) => {
  if (!frontUri && !backUri) return null
  return (
    <View style={styles.previewRow}>
      {frontUri ? (
        <View style={styles.previewItem}>
          <Image source={{ uri: frontUri }} style={styles.previewImage} />
          <Text style={styles.previewLabel}>Front</Text>
        </View>
      ) : null}
      {backUri ? (
        <View style={styles.previewItem}>
          <Image source={{ uri: backUri }} style={styles.previewImage} />
          <Text style={styles.previewLabel}>Back</Text>
        </View>
      ) : null}
    </View>
  )
}

// Main component
const DriverRegisterStep3 = ({ onSubmit, onBack, onLogin }) => {
  const [insuranceFile, setInsuranceFile]       = useState(null)
  const [licenseFile, setLicenseFile]           = useState(null)
  const [registrationFile, setRegistrationFile] = useState(null)

  // Ghana Card front / back image URIs
  const [ghanaCardFront, setGhanaCardFront] = useState(null)
  const [ghanaCardBack, setGhanaCardBack]   = useState(null)

  const [nationalIdNumber, setNationalIdNumber] = useState('')
  const [errors, setErrors]                     = useState({})

  // Helper: status text shown in Ghana Card row  
  let ghanaCardPlaceholder = 'Select front & back images'
  if (ghanaCardFront && !ghanaCardBack) ghanaCardPlaceholder = 'Front added — please select back...'
  if (!ghanaCardFront && ghanaCardBack) ghanaCardPlaceholder = 'Back added — please select front...'
  if (ghanaCardFront && ghanaCardBack)  ghanaCardPlaceholder = '✓ Front & Back uploaded'

  // Ghana Card number formatter 
  const handleIdNumberChange = (text) => {
    let cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, '')

    if (!cleaned.startsWith('GHA') && cleaned.length > 0) {
      cleaned = 'GHA' + cleaned.replace(/[^0-9]/g, '')
    }

    let formatted = ''
    if (cleaned.length > 0) {
      formatted = 'GHA'
      const numbersOnly = cleaned.slice(3).replace(/[^0-9]/g, '')
      if (numbersOnly.length > 0) formatted += '-' + numbersOnly.slice(0, 9)
      if (numbersOnly.length > 9) formatted += '-' + numbersOnly.slice(9, 10)
    }

    setNationalIdNumber(formatted)
    setErrors((e) => ({ ...e, nationalIdNumber: null }))
  }

  //  Open device file manager (PDF / doc files)  
  const handleUpload = async (docType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      })

      // User cancelled
      if (result.canceled) return

      const file = result.assets[0]

      if (docType === 'insurance')    setInsuranceFile(file)
      if (docType === 'license')      setLicenseFile(file)
      if (docType === 'registration') setRegistrationFile(file)

      setErrors((e) => ({ ...e, [`${docType}File`]: null }))

      // TODO: connect to backend — upload file.uri for docType document
    } catch (error) {
      Alert.alert('Error', 'Could not open file manager. Please try again.')
    }
  }

  // Ghana Card upload: choose front or back, then camera or gallery
  const handleGhanaCardUploadPrompt = () => {
    Alert.alert(
      'Upload Ghana Card',
      'Which side are you uploading?',
      [
        {
          text: 'Front Side',
          onPress: () => pickGhanaCardImage('front'),
        },
        {
          text: 'Back Side',
          onPress: () => pickGhanaCardImage('back'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    )
  }

  const pickGhanaCardImage = (side) => {
    Alert.alert(
      `Ghana Card — ${side === 'front' ? 'Front' : 'Back'} Side`,
      'Choose how to provide the image:',
      [
        {
          text: '📁 File Manager',
          onPress: () => pickGhanaCardFromFiles(side),
        },
        {
          text: '📷 Take a Photo',
          onPress: () => pickGhanaCardFromCamera(side),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    )
  }

  // Open image library (file manager / gallery)
  const pickGhanaCardFromFiles = async (side) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library in Settings.'
        )
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.9,
      })

      if (result.canceled) return

      const uri = result.assets[0].uri
      if (side === 'front') {
        setGhanaCardFront(uri)
      } else {
        setGhanaCardBack(uri)
      }
      setErrors((e) => ({ ...e, ghanaCardFile: null }))

      // TODO: connect to backend — upload Ghana Card image (side: front/back) from uri
    } catch (error) {
      console.error('Image library error:', error)
      Alert.alert('Error', `Could not open image library: ${error.message}`)
    }
  }

  // Open camera to take a photo
  const pickGhanaCardFromCamera = async (side) => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow camera access in Settings.'
        )
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.9,
      })

      if (result.canceled) return

      const uri = result.assets[0].uri
      if (side === 'front') {
        setGhanaCardFront(uri)
      } else {
        setGhanaCardBack(uri)
      }
      setErrors((e) => ({ ...e, ghanaCardFile: null }))

      // TODO: connect to backend — upload Ghana Card photo (side: front/back) from uri
    } catch (error) {
      console.error('Camera error:', error)
      Alert.alert('Error', `Could not open camera: ${error.message}`)
    }
  }

  // ── Validation ──
  const validate = () => {
    const newErrors = {}

    if (!insuranceFile)    newErrors.insuranceFile    = 'Driver insurance document is required'
    if (!licenseFile)      newErrors.licenseFile      = 'Driver license document is required'
    if (!registrationFile) newErrors.registrationFile = 'Vehicle registration document is required'

    if (!ghanaCardFront || !ghanaCardBack) {
      newErrors.ghanaCardFile = 'Both Front and Back images of the Ghana Card are required'
    }

    const idRegex = /^GHA-\d{9}-\d{1}$/
    if (!nationalIdNumber.trim()) {
      newErrors.nationalIdNumber = 'Ghana Card number is required'
    } else if (!idRegex.test(nationalIdNumber)) {
      newErrors.nationalIdNumber = 'Must follow format: GHA-XXXXXXXXX-X'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit 
  const handleSubmit = () => {
    if (!validate()) return

    // TODO: connect to backend — submit all documents and Ghana Card info for verification
    if (onSubmit) {
      onSubmit({
        insuranceFile,
        licenseFile,
        registrationFile,
        ghanaCardFront,
        ghanaCardBack,
        nationalIdNumber,
      })
    }
  }

  // Render 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />

      <View style={styles.headerNav}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>Step 3 of 3</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarInactive} />
        <View style={[styles.progressBarInactive, { marginLeft: 8 }]} />
        <View style={[styles.progressBarActive, { marginLeft: 8 }]} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Upload Documents</Text>
          <Text style={styles.screenSubtitle}>Required for verification</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Documents</Text>

          {/* Driver Insurance */}
          <UploadRow
            label="Driver Insurance"
            icon="🪪"
            fileName={insuranceFile ? insuranceFile.name : 'No file selected'}
            onUploadPress={() => handleUpload('insurance')}
          />
          {errors.insuranceFile && (
            <Text style={styles.errorText}>{errors.insuranceFile}</Text>
          )}

          {/* Driver License */}
          <UploadRow
            label="Driver License"
            icon="🪪"
            fileName={licenseFile ? licenseFile.name : 'No file selected'}
            onUploadPress={() => handleUpload('license')}
          />
          {errors.licenseFile && (
            <Text style={styles.errorText}>{errors.licenseFile}</Text>
          )}

          {/* Vehicle Registration */}
          <UploadRow
            label="Vehicle Registration"
            icon="🚙"
            fileName={registrationFile ? registrationFile.name : 'No file selected'}
            onUploadPress={() => handleUpload('registration')}
          />
          {errors.registrationFile && (
            <Text style={styles.errorText}>{errors.registrationFile}</Text>
          )}

          {/* Ghana Card Upload */}
          <UploadRow
            label="Ghana Card (Front & Back)"
            icon="👤"
            fileName={ghanaCardPlaceholder}
            onUploadPress={handleGhanaCardUploadPrompt}
          />
          {errors.ghanaCardFile && (
            <Text style={styles.errorText}>{errors.ghanaCardFile}</Text>
          )}

          {/* Ghana Card image previews */}
          <GhanaCardPreview frontUri={ghanaCardFront} backUri={ghanaCardBack} />

          {/* Ghana Card Number */}
          <UploadRow
            label="Ghana Card Number"
            icon="🔢"
            showInput={true}
            inputValue={nationalIdNumber}
            onInputChange={handleIdNumberChange}
          />
          {errors.nationalIdNumber && (
            <Text style={styles.errorText}>{errors.nationalIdNumber}</Text>
          )}

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Submit for Verification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onBack}
            style={styles.goBackCenterBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.goBackCenterText}>← Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onLogin}
            activeOpacity={0.7}
            style={styles.loginFooterBtn}
          >
            <Text style={styles.loginFooterText}>
              Already have an account?{' '}
              <Text style={styles.loginFooterLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default DriverRegisterStep3

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  progressContainer: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  progressBarActive: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  progressBarInactive: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  titleSection: {
    marginBottom: 32,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  uploadBlock: {
    marginBottom: 16,
  },
  uploadLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  uploadIcon: {
    fontSize: 14,
    color: '#1E3A8A',
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  fileNameText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    paddingRight: 12,
  },
  noFileText: {
    color: '#94A3B8',
    fontWeight: '400',
  },
  inlineInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
    height: '100%',
  },
  inlineUploadBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineUploadBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // Ghana Card image preview
  previewRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: -8,
    marginBottom: 16,
  },
  previewItem: {
    alignItems: 'center',
  },
  previewImage: {
    width: 110,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  previewLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: -10,
    marginBottom: 14,
    marginLeft: 4,
  },
  submitBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: '#223C8F',
    shadowColor: '#223C8F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  goBackCenterBtn: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 8,
  },
  goBackCenterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2937',
  },
  loginFooterBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  loginFooterText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  loginFooterLink: {
    color: '#3B82F6',
    fontWeight: '700',
  },
})