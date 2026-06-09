import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const { width } = Dimensions.get('window')

const TripSummary = ({ onDismiss, onChangeTab, tripData }) => {
  
  // Fallback structural mock data matching your exact timeframe and distance metrics
  const activeSummary = tripData || {
    driverName: 'Kwame',
    pickupLocation: 'Engineering Block C',
    destinationLocation: 'Student Union North',
    durationText: '12 minutes', // Real-time duration timeframe display value
    distanceText: '4.2 km',      // Actual operational distance metric display value
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* 1. TOP TITLE HEADER BAR */}
      <View style={styles.header}>
        {/* Redirects driver immediately back to the Active Ride Requests Dashboard View */}
        <TouchableOpacity 
          onPress={() => onChangeTab && onChangeTab('trips')} 
          activeOpacity={0.7} 
          style={styles.headerButton}
        >
          <Text style={styles.headerIconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitleText}>Trip Summary</Text>
        <View style={styles.headerButtonPlaceholder} />
      </View>

      {/* 2. MAIN CORE CONTENT LAYER */}
      <View style={styles.contentWorkspace}>
        
        {/* Animated Green Checkmark Vector Circle Badge */}
        <View style={styles.successCircleContainer}>
          <Text style={styles.successCheckmarkIcon}>✓</Text>
        </View>

        <Text style={styles.tripCompletedHeadingText}>Trip Completed</Text>
        <Text style={styles.driverGreetingSubtext}>
          Well done, {activeSummary.driverName}. Safe driving!
        </Text>

        {/* 3. CARD CONTAINER MODULE LAYER */}
        <View style={styles.summaryCardView}>
          
          {/* Vertical Route Indicator Timeline Link Block */}
          <View style={styles.routeTimelineTrackRow}>
            <View style={styles.timelineNodeVisualColumn}>
              {/* Pickup Pin - Blue target ring */}
              <View style={styles.pickupOuterCirclePin}>
                <View style={styles.pickupInnerCirclePin} />
              </View>
              
              <View style={styles.verticalLinkLineTrack} />
              
              {/* Destination Pin - Green Ring Enclosing Your 🏁 Finish Flag */}
              <View style={styles.dropoffOuterCirclePin}>
                <Text style={styles.flagEmojiMarker}>🏁</Text>
              </View>
            </View>

            <View style={styles.routeLabelsTextColumn}>
              <View style={styles.labelBlockSegment}>
                <Text style={styles.fieldCategoryMetaLabel}>PICKUP</Text>
                <Text style={styles.locationHeadlineText} numberOfLines={1}>
                  {activeSummary.pickupLocation}
                </Text>
              </View>

              <View style={styles.labelBlockSegment}>
                <Text style={styles.fieldCategoryMetaLabel}>DESTINATION</Text>
                <Text style={styles.locationHeadlineText} numberOfLines={1}>
                  {activeSummary.destinationLocation}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.horizontalDividerRule} />

          {/* Metrics Distribution Row Wrapper (Aligned Perfectly Side-by-Side) */}
          <View style={styles.metricsDistributionGridRow}>
            <View style={styles.metricDataCellUnit}>
              <Text style={styles.metricLabelCategory}>⏱️ Duration</Text>
              <Text style={styles.metricValueHeadlineText}>{activeSummary.durationText}</Text>
            </View>

            <View style={styles.metricDataCellUnit}>
              <Text style={styles.metricLabelCategory}>📍 Distance</Text>
              <Text style={styles.metricValueHeadlineText}>{activeSummary.distanceText}</Text>
            </View>
          </View>

        </View>

        {/* TODO: Implement analytical background ledger sync logic tasks on database completion hooks */}
        <Text style={styles.bottomSuccessBannerLabelToast}>Trip successfully completed</Text>
      </View>

      {/* 4. BASE SYSTEM TAB BAR SYSTEM BAR */}
      <View style={styles.tabBarContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={onDismiss} activeOpacity={0.7}>
          <Text style={styles.tabIconInactive}>🏠</Text>
          <Text style={styles.tabLabelInactive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => onChangeTab && onChangeTab('trips')} activeOpacity={0.7}>
          <View style={styles.activeTabIconBackground}>
            <Text style={styles.tabIconActive}>🔀</Text>
          </View>
          <Text style={styles.tabLabelActive}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => console.log('Profile')} activeOpacity={0.7}>
          <Text style={styles.tabIconInactive}>👤</Text>
          <Text style={styles.tabLabelInactive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TripSummary

const styles = StyleSheet.create({
  // GLOBAL LAYOUT CORE CONTAINER SPECIFICATIONS
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonPlaceholder: {
    width: 32,
    height: 32,
  },
  headerIconText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  contentWorkspace: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginBottom: 20,
  },

  // SUCCESS GRAPHIC VECTOR INDICATORS
  successCircleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#84CC16',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#84CC16',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  successCheckmarkIcon: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
  },
  tripCompletedHeadingText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#032B74',
    marginBottom: 12,
  },
  driverGreetingSubtext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 32,
    textAlign: 'center',
  },

  // METRICS DISPLAY MASTER CARD SHELL SPECIFICATIONS
  summaryCardView: {
    width: width - 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  routeTimelineTrackRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 18,
  },
  timelineNodeVisualColumn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 24,
    marginRight: 14,
    paddingVertical: 4,
  },
  pickupOuterCirclePin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1E40AF',
  },
  pickupInnerCirclePin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E40AF',
  },
  verticalLinkLineTrack: {
    flex: 1,
    width: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  dropoffOuterCirclePin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  flagEmojiMarker: {
    fontSize: 12, 
    lineHeight: 14,
  },
  routeLabelsTextColumn: {
    flex: 1,
    gap: 20,
  },
  labelBlockSegment: {
    justifyContent: 'center',
  },
  fieldCategoryMetaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  locationHeadlineText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  horizontalDividerRule: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },

  // DISTRIBUTED TRAVEL CORE GRID CELLS (Fixed for side-by-side column perspective)
  metricsDistributionGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  metricDataCellUnit: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  metricLabelCategory: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 6,
  },
  metricValueHeadlineText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#032B74',
    marginLeft: 4, // Clean alignment offset buffer to sync with the emoji icon width bounds
  },
  bottomSuccessBannerLabelToast: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 32,
    textAlign: 'center',
  },

  // SYSTEM TAB DECORATION INTERFACES
  tabBarContainer: {
    flexDirection: 'row',
    height: 74,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabIconBackground: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 2,
  },
  tabIconActive: {
    fontSize: 18,
  },
  tabLabelActive: {
    fontSize: 11,
    color: '#1E3A8A',
    fontWeight: '700',
  },
  tabIconInactive: {
    fontSize: 18,
    opacity: 0.4,
  },
  tabLabelInactive: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
  },
})