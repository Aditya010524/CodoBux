import React, { useEffect } from 'react';
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
import { useUserStore } from '../../store/auth_store';
import { useJobStore } from '../../store/job_store';
import JobCard from '../../components/JobCard';

const HomeScreen = ({ navigation }: any) => {
  const user = useUserStore(state => state.user);
  const jobs = useJobStore(state => state.jobs);

  useEffect(() => {
    console.log('📦 LOCAL JOBS:', jobs);
  }, [jobs]);

  const renderItem = ({ item }: any) => {
    const formattedItem = {
      id: item.id,
      title: item.title,
      client: item.client || 'No Client',
      location: item.location || 'Remote',
      price: item.budget ? `$${item.budget.toLocaleString()}` : '$0',
      date: new Date(parseInt(item.id)).toLocaleDateString(),
      status: 'Pending' as const,
    };

    return (
      <View style={{ marginBottom: 12 }}>
        <JobCard
          item={formattedItem}
          onPress={() =>
            navigation.navigate('JobDetailsScreen', { jobId: item.id })
          }
        />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="documents-outline" size={48} color="#CBD5E1" />
      </View>
      <Text style={styles.emptyTitle}>No Jobs Found</Text>
      <Text style={styles.emptyText}>
        You haven't added any jobs yet.{'\n'}Tap the + button to get started.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EDF4FF" />

      {/* --- Top Section (White Background) --- */}
      <View style={styles.topContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.avatar}
            activeOpacity={0.8}
          >
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search jobs..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* --- Bottom Section (Blue Background) --- */}
      <View style={styles.contentContainer}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Jobs ({jobs.length})</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Job List */}
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />

        {/* Back Online Banner */}
        <View style={styles.onlineBanner}>
          <View style={styles.onlineIconCircle}>
            <Ionicons name="wifi" size={20} color="#22C55E" />
          </View>
          <View>
             <Text style={styles.onlineTitle}>Back Online</Text>
             <Text style={styles.onlineSubtitle}>All changes synced</Text>
          </View>
        </View>

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CreateJobScreen')}
        >
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Top safe area is white now
  },
  // --- Top Section Styles ---
  topContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomLeftRadius: 24, // Optional: Adds a subtle curve at transition
    borderBottomRightRadius: 24, // Optional
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // Light Grey Background
    borderRadius: 25,
    height: 52,
    paddingHorizontal: 20,
    marginBottom: 16,
    // Removed border for cleaner look, added subtle inner feel
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    height: '100%',
  },

  // --- Bottom Section Styles ---
  contentContainer: {
    flex: 1,
    backgroundColor: '#EDF4FF', // Light blue background
    paddingHorizontal: 20,
    paddingTop: 24,
  },
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
    fontWeight: '600',
    color: '#3B82F6',
  },
  listContent: {
    paddingBottom: 140,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF', // White circle on blue bg
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Online Banner
  onlineBanner: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  onlineIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  onlineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  onlineSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default HomeScreen;