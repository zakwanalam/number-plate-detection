import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    plateNumber: string;
    found: string;
    owner?: string;
    make?: string;
    model?: string;
    registrationDate?: string;
    fuzzy?: string;
    scannedPlate?: string;
    matchedPlate?: string;
  }>();

  const found = params.found === '1';
  const isFuzzy = params.fuzzy === '1';
  const plateNumber = params.plateNumber ?? 'UNKNOWN';

  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleIconAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleIconAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleScanAnother = () => {
    router.replace('/scanner' as any);
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  const accentColor = found ? '#22C55E' : '#EF4444';
  const accentDim = found ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)';
  const gradientColors: [string, string] = found
    ? ['#22C55E', '#16A34A']
    : ['#EF4444', '#DC2626'];

  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={['#0A0A0F', '#0D1117', '#0A0A1A']}
        style={StyleSheet.absoluteFill}
      />

      {/* Top glow */}
      <View style={[styles.topGlow, { backgroundColor: accentColor }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              borderColor: `${accentColor}30`,
            },
          ]}
        >
          {/* Status icon */}
          <Animated.View
            style={[styles.iconCircle, { backgroundColor: accentDim, transform: [{ scale: scaleIconAnim }] }]}
          >
            <LinearGradient
              colors={gradientColors}
              style={styles.iconInner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={found ? 'checkmark' : 'close'}
                size={44}
                color="#FFFFFF"
              />
            </LinearGradient>
          </Animated.View>

          {/* Title */}
          <Text style={[styles.statusTitle, { color: accentColor }]}>
            {found ? 'Vehicle Found' : 'Vehicle Not Found'}
          </Text>

          {/* Plate number box */}
          <View style={[styles.plateBox, { borderColor: `${accentColor}40`, backgroundColor: `${accentColor}0D` }]}>
            <Text style={styles.plateLabel}>License Plate</Text>
            <Text style={[styles.plateNumber, { color: accentColor }]}>
              {plateNumber}
            </Text>
          </View>

          {/* Fuzzy match indicator */}


          {/* Details (only shown when found) */}
          {found && (
            <View style={styles.detailsContainer}>
              <View style={styles.divider} />
              <Text style={styles.detailsTitle}>Vehicle Details</Text>
              <View style={styles.detailsGrid}>
                <DetailRow icon="person" label="Owner" value={params.owner ?? '—'} />
                <DetailRow icon="car" label="Make" value={params.make ?? '—'} />
                <DetailRow icon="speedometer" label="Model" value={params.model ?? '—'} />
                <DetailRow
                  icon="calendar"
                  label="Registered"
                  value={params.registrationDate ?? '—'}
                />
              </View>
            </View>
          )}

          {/* If not found — descriptive message */}
          {!found && (
            <View style={styles.notFoundMsg}>
              <Text style={styles.notFoundText}>
                This plate number is not registered in our database. The vehicle may be unregistered or the plate may be invalid.
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Action buttons */}
        <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
          <TouchableOpacity
            onPress={handleScanAnother}
            style={styles.primaryBtn}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#6C63FF', '#4FACFE']}
              style={styles.primaryBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="scan" size={20} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>Scan Another</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGoHome}
            style={styles.secondaryBtn}
            activeOpacity={0.85}
          >
            <Ionicons name="home-outline" size={18} color="rgba(255,255,255,0.6)" style={{ marginRight: 8 }} />
            <Text style={styles.secondaryBtnText}>Go Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon as any} size={16} color="#6C63FF" />
      </View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  topGlow: {
    position: 'absolute',
    top: -80,
    left: '50%',
    marginLeft: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.08,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 28,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
    gap: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  iconInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  plateBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 4,
  },
  plateLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  plateNumber: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignSelf: 'stretch',
  },
  detailsContainer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  detailsGrid: {
    width: '100%',
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 14,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(108,99,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: { flex: 1 },
  detailLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notFoundMsg: {
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 14,
    padding: 16,
    width: '100%',
  },
  notFoundText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 22,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  primaryBtn: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
    width: '100%',
  },
  primaryBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  secondaryBtnText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    fontWeight: '600',
  },
  fuzzyNotice: {
    width: '100%',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.25)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
    marginTop: -8,
  },
  fuzzyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fuzzyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FBBF24',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  fuzzyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  fuzzyRowText: { flex: 1 },
  fuzzyRowLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  fuzzyRowValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  }
});
