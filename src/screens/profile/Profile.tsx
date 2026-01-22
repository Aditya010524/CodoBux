import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useUserStore } from '../../store/auth_store';
const ProfileScreen = ({ navigation }: any) => {
    const user = useUserStore(state => state.user);
 const {logOut} = useAuth();
 const [isLoading, setIsLoading] = useState(false)
  const handleLogout = () => {
    setIsLoading(true)
try {
     logOut()
    navigation.reset("AuthNavigator")
} catch (error) {
    console.log(error)
}finally{
    setIsLoading(false)
}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <View style={styles.container}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* --- Simple Profile Info --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.name.charAt(0)}</Text>
          </View>
          
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* --- Logout Button --- */}
        <View style={styles.footer}>
          <Button title="Log Out" onPress={handleLogout} isLoading= {isLoading}/>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: 'space-between', // Pushes footer to bottom
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Profile Section (Centered)
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Takes up remaining space to center content vertically
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    // Avatar Shadow
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#3B82F6',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748B',
  },

  // Footer
  footer: {
    marginBottom: 32,
  },
});

export default ProfileScreen;