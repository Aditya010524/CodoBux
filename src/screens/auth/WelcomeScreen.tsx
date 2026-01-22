import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }: any) => {

  const handleCreateAccount = () => {
navigation.navigate("SignUpScreen")
  };
  const handleSignIn = () => {
    navigation.navigate("SignInScreen")
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#0F172A']}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaProvider style={styles.contentContainer}>
        
        {/* --- Logo Section --- */}
        <View style={styles.logoSection}>
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={['#60A5FA', '#34D399']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoBackground}
            >
              <Ionicons name="briefcase" color="white" size={48} />
            </LinearGradient>
            
            <View style={styles.sparkleIcon}>
              <Ionicons name="sparkles" color="#FCD34D" size={32} /> 
            </View>
          </View>

          <Text style={styles.title}>CJM</Text>
          <Text style={styles.subtitle}>Contractor Job Management</Text>
        </View>

        {/* --- Button Section --- */}
        <View style={styles.bottomSection}>
          {/* Main Blue Button */}
          <Button 
            title="Create Account" 
            onPress={handleCreateAccount} 
          />
          
          <View style={{ height: 16 }} />
          
          {/* Secondary Transparent Button */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={handleSignIn} 
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By continuing, you agree to CJM's Terms of Service{'\n'}and Privacy Policy
          </Text>
        </View>

      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  
  // Logo
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 24,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  sparkleIcon: {
    position: 'absolute',
    top: -15,
    right: -15,
    transform: [{ rotate: '15deg' }],
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '400',
  },

  // Buttons
  bottomSection: {
    width: '100%',
    paddingBottom: 20,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Footer
  footerText: {
    marginTop: 32,
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default WelcomeScreen;