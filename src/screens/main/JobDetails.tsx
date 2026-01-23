import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useJobStore } from '../../store/job_store';

const JobDetailsScreen = ({ route, navigation }: any) => {
  const { jobId } = route.params;
  
  // Get job and actions from store
  const job = useJobStore((state) => state.jobs.find((j) => j.id === jobId));
  const addNote = useJobStore((state) => state.addNote);

  const [activeTab, setActiveTab] = useState<'Overview' | 'Notes' | 'Video'>('Overview');
  const [noteText, setNoteText] = useState('');

  const handleBack = () => navigation.goBack();
  const handleEdit = () => navigation.navigate("EditJobScreen",{jobId : jobId});

  // Handle adding a note
  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(jobId, noteText);
    setNoteText('');
    Keyboard.dismiss(); // Hide keyboard
  };

  // Helper for "2 hours ago" format
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (!job) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#64748B' }}>Job not found</Text>
          <TouchableOpacity onPress={handleBack} style={{ marginTop: 20 }}>
            <Text style={{ color: '#3B82F6', fontWeight: '700' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formattedDate = new Date(parseInt(job.id)).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const formattedBudget = job.budget ? `$${job.budget.toLocaleString()}` : '$0';

  // --- TAB CONTENT: OVERVIEW (ScrollView) ---
  const renderOverview = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Budget Card */}
      <View style={styles.blueCard}>
        <View style={styles.statusBadge}>
          <Ionicons name="radio-button-on" size={12} color="#4ADE80" style={{ marginRight: 6 }} />
          <Text style={styles.statusText}>Active</Text>
        </View>
        <View>
          <Text style={styles.budgetLabel}>Total Budget</Text>
          <Text style={styles.budgetAmount}>{formattedBudget}</Text>
        </View>
      </View>

      {/* Info Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.gridCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="location-outline" size={20} color="#16A34A" />
          </View>
          <Text style={styles.gridLabel}>Location</Text>
          <Text style={styles.gridValue} numberOfLines={1}>{job.location || 'Remote'}</Text>
        </View>
        <View style={styles.gridCard}>
          <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
            <Ionicons name="time-outline" size={20} color="#EA580C" />
          </View>
          <Text style={styles.gridLabel}>Started</Text>
          <Text style={styles.gridValue}>{formattedDate}</Text>
        </View>
      </View>

      {/* Client Info */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-outline" size={20} color="#3B82F6" style={{ marginRight: 10 }} />
          <Text style={styles.sectionTitle}>Client Information</Text>
        </View>
        <Text style={styles.sectionContent}>{job.client || 'No Client Info'}</Text>
      </View>

      {/* Description */}
      <View style={styles.sectionCard}>
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Description</Text>
        <Text style={styles.descriptionText}>{job.description || 'No description provided.'}</Text>
      </View>
    </ScrollView>
  );

  // --- TAB CONTENT: NOTES (FlatList) ---
  const renderNoteItem = ({ item }: any) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
      <View style={styles.noteFooter}>
        <Ionicons name="time-outline" size={14} color="#94A3B8" style={{ marginRight: 4 }} />
        <Text style={styles.noteTime}>{getTimeAgo(item.createdAt)}</Text>
      </View>
    </View>
  );

  const renderNotes = () => (
    <View style={{ flex: 1 }}>
      {/* Input Area */}
      <View style={styles.noteInputCard}>
        <View style={styles.noteInputContainer}>
          <TextInput 
            placeholder="Add a new note..." 
            placeholderTextColor="#94A3B8"
            style={styles.noteInput}
            multiline
            value={noteText}
            onChangeText={setNoteText}
          />
        </View>
        <TouchableOpacity 
          style={styles.addNoteButton} 
          activeOpacity={0.8}
          onPress={handleAddNote}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.addNoteButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={job.notes || []} // Safe fallback
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#94A3B8', marginTop: 20 }}>
            No notes yet. Add one above!
          </Text>
        }
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" color="#0F172A" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>{job.title}</Text>
            <Text style={styles.headerSubtitle}>{job.client || 'Client'}</Text>
          </View>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={activeTab === 'Overview' ? styles.activeTab : styles.inactiveTab}
            onPress={() => setActiveTab('Overview')}
          >
            <Ionicons name="document-text-outline" size={18} color={activeTab === 'Overview' ? '#3B82F6' : '#64748B'} style={{ marginRight: 6 }} />
            <Text style={activeTab === 'Overview' ? styles.activeTabText : styles.inactiveTabText}>Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={activeTab === 'Notes' ? styles.activeTab : styles.inactiveTab}
            onPress={() => setActiveTab('Notes')}
          >
            <Ionicons name="clipboard-outline" size={18} color={activeTab === 'Notes' ? '#3B82F6' : '#64748B'} style={{ marginRight: 6 }} />
            <Text style={activeTab === 'Notes' ? styles.activeTabText : styles.inactiveTabText}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={activeTab === 'Video' ? styles.activeTab : styles.inactiveTab}
            onPress={() => setActiveTab('Video')}
          >
            <Ionicons name="videocam-outline" size={18} color={activeTab === 'Video' ? '#3B82F6' : '#64748B'} style={{ marginRight: 6 }} />
            <Text style={activeTab === 'Video' ? styles.activeTabText : styles.inactiveTabText}>Video</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Content Area (No parent ScrollView to allow FlatList) */}
        <View style={styles.contentArea}>
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'Notes' && renderNotes()}
          {activeTab === 'Video' && (
             <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Ionicons name="videocam-off-outline" size={48} color="#CBD5E1" />
                <Text style={{ color: '#94A3B8', marginTop: 10 }}>No videos yet</Text>
             </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' }, // White status bar area matches header
  container: { flex: 1, backgroundColor: '#EDF4FF' }, // Main bg color
  
  // Header
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, justifyContent: 'space-between', backgroundColor: 'white' },
  backButton: { width: 44, height: 44, backgroundColor: '#FFFFFF', borderRadius: 22, justifyContent: 'center', alignItems: 'center', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: '#F1F5F9' },
  headerTitleContainer: { flex: 1, marginHorizontal: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  headerSubtitle: { fontSize: 14, color: '#64748B', marginTop: 2 },
  editButton: { backgroundColor: '#3B82F6', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  editButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },

  // Tabs
  tabContainer: { flexDirection: 'row', paddingHorizontal: 24, paddingBottom: 16, paddingTop: 8, gap: 12, backgroundColor: 'white' },
  activeTab: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EDF4FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24 },
  inactiveTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 },
  activeTabText: { color: '#3B82F6', fontWeight: '600', fontSize: 14 },
  inactiveTabText: { color: '#64748B', fontSize: 14, fontWeight: '500' },

  // Content Area
  contentArea: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },

  // Overview Styles
  blueCard: { backgroundColor: '#3B82F6', borderRadius: 24, padding: 24, height: 170, justifyContent: 'space-between', marginBottom: 20, shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  statusBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { color: '#4ADE80', fontSize: 13, fontWeight: '600' },
  budgetLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 14, marginBottom: 6 },
  budgetAmount: { color: '#FFFFFF', fontSize: 34, fontWeight: '700' },
  gridContainer: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  gridCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridLabel: { fontSize: 13, color: '#94A3B8', marginBottom: 4 },
  gridValue: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  sectionContent: { fontSize: 16, color: '#334155' },
  descriptionText: { fontSize: 15, color: '#64748B', lineHeight: 24 },

  // Notes Styles
  noteInputCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginBottom: 24, shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  noteInputContainer: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, minHeight: 80, marginBottom: 16 },
  noteInput: { fontSize: 15, color: '#0F172A', textAlignVertical: 'top' },
  addNoteButton: { backgroundColor: '#3B82F6', borderRadius: 14, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  addNoteButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  noteItem: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#3B82F6', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  noteText: { fontSize: 15, color: '#1E293B', lineHeight: 22, marginBottom: 8 },
  noteFooter: { flexDirection: 'row', alignItems: 'center' },
  noteTime: { fontSize: 12, color: '#94A3B8' },
});

export default JobDetailsScreen;