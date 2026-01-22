import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JobCard, { JobData } from '../../components/JobCard'; 
import { useUserStore } from '../../store/auth_store';

// --- Mock Data ---
const JOBS_DATA: JobData[] = [
  {
    id: '1',
    title: 'Kitchen Renovation',
    client: 'Sarah Johnson',
    price: '$45,000',
    location: 'San Francisco',
    date: 'Started Dec 15, 2024',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Bathroom Remodel',
    client: 'Michael Chen',
    price: '$28,000',
    location: 'Oakland',
    date: 'Started Jan 5, 2025',
    status: 'Pending',
  },
  {
    id: '3',
    title: 'Deck Construction',
    client: 'Emily Rodriguez',
    price: '$15,000',
    location: 'Berkeley',
    date: 'Started Nov 1, 2024',
    status: 'Completed',
  },
];

const HomeScreen = ({navigation} : any) => {
const user = useUserStore(state => state.user);


  const renderItem = ({ item }: { item: JobData }) => (
    <JobCard item={item} onPress={() => console.log('Clicked', item.title)} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <View style={styles.container}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
          {/* Avatar Circle */}
          <TouchableOpacity onPress={()=>navigation.navigate("ProfileScreen")} style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Search jobs..." 
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        {/* --- List Section Header --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Jobs ({JOBS_DATA.length})</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* --- Jobs List --- */}
        <FlatList
          data={JOBS_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        {/* --- Floating Action Button (FAB) --- */}
        <TouchableOpacity style={styles.fab} activeOpacity={0.8}
        onPress={()=>navigation.navigate("CreateJobScreen")}>
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        {/* --- "Back Online" Toast (Absolute Positioned) --- */}
        <View style={styles.toastContainer}>
          <View style={styles.toastIcon}>
            <Ionicons name="wifi" size={18} color="#16A34A" />
          </View>
          <View>
            <Text style={styles.toastTitle}>Back Online</Text>
            <Text style={styles.toastSubtitle}>All changes synced</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Very light gray/blue bg
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F8EF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // Slightly darker than bg
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    height: '100%',
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6', // Blue Link
    fontWeight: '600',
  },

  // List
  listContent: {
    paddingBottom: 100, // Space for FAB and Toast
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 100, // Above the toast
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  // Toast
  toastContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  toastIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  toastSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
});

export default HomeScreen;