import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleScan = () => {
    router.push('/scanner' as any);
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#0A0A0F', '#0D1117', '#0A0A1A']}
        style={StyleSheet.absoluteFill}
      />

      {/* Glowing orb accent */}
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>AI-Powered</Text>
        </View>
      </View>

      {/* Hero content */}
      <View style={styles.hero}>
        {/* Icon container */}
        <View style={styles.iconWrapper}>
          <LinearGradient
            colors={['#6C63FF', '#4FACFE']}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="car-sport" size={56} color="#FFFFFF" />
          </LinearGradient>
          {/* Glow ring */}
          <View style={styles.iconRing} />
        </View>

        <Text style={styles.title}>PlateScanner</Text>
        <Text style={styles.subtitle}>
          Instantly scan and verify vehicle license plates using AI-powered OCR technology.
        </Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>AI</Text>
            <Text style={styles.statLabel}>OCR Engine</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Real</Text>
            <Text style={styles.statLabel}>Time Results</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Secure</Text>
            <Text style={styles.statLabel}>Database</Text>
          </View>
        </View>
      </View>

      {/* CTA Button */}
      <View style={styles.footer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleScan}
            style={styles.scanButton}
          >
            <LinearGradient
              colors={['#6C63FF', '#4FACFE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.scanButtonGradient}
            >
              <Ionicons name="scan" size={24} color="#FFFFFF" style={{ marginRight: 12 }} />
              <Text style={styles.scanButtonText}>Scan Number Plate</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.hint}>
          Point your camera at any vehicle's license plate
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  orbTop: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#6C63FF',
    opacity: 0.12,
  },
  orbBottom: {
    position: 'absolute',
    bottom: -120,
    left: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#4FACFE',
    opacity: 0.1,
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    alignItems: 'flex-end',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C63FF',
  },
  badgeText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 32,
  },
  iconGradient: {
    width: 110,
    height: 110,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: '100%',
    gap: 0,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 16,
  },
  scanButton: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 18,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  hint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
  },
});
