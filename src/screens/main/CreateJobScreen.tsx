import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button'; // Reusing your Button component

const CreateJobScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleBack = () => navigation.goBack();
  const handleCreateJob = () => console.log('Job Created');

  // Helper for rendering section headers to keep code clean
  const renderSectionHeader = (icon: string, title: string, color: string) => (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color={color} style={{ marginRight: 8 }} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          {/* --- Header --- */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" color="#0F172A" size={24} />
            </TouchableOpacity>
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.pageTitle}>Create New Job</Text>
              <Text style={styles.pageSubtitle}>Fill in the details below</Text>
            </View>
          </View>

          {/* --- Section 1: Job Details --- */}
          <View style={styles.card}>
            {renderSectionHeader('briefcase-outline', 'Job Details', '#3B82F6')}
            
            <Text style={styles.label}>Job Title *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g., Kitchen Renovation" 
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Add job description..." 
              placeholderTextColor="#94A3B8"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* --- Section 2: Client Info --- */}
          <View style={styles.card}>
            {renderSectionHeader('person-outline', 'Client Info', '#10B981')}

            <Text style={styles.label}>Client Name *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g., John Smith" 
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.label}>City *</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="location-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput 
                style={styles.flexInput} 
                placeholder="e.g., San Francisco" 
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* --- Section 3: Budget & Timeline --- */}
          <View style={styles.card}>
            {renderSectionHeader('cash-outline', 'Budget & Timeline', '#F59E0B')}

            <Text style={styles.label}>Budget (USD) *</Text>
            <View style={styles.inputWithIcon}>
              <Text style={styles.currencyPrefix}>$</Text>
              <TextInput 
                style={styles.flexInput} 
                placeholder="0" 
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.label}>Start Date</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="calendar-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput 
                style={styles.flexInput} 
                placeholder="Select Date" 
                placeholderTextColor="#94A3B8"
                editable={false} // Would normally trigger a date picker
              />
            </View>
            
             <Text style={styles.label}>Status</Text>
             <View style={styles.input}>
                {/* Placeholder for status dropdown */}
             </View>
          </View>

        </ScrollView>

        {/* --- Footer Button --- */}
        <View style={styles.footer}>
          <Button title="Create Job" onPress={handleCreateJob} isLoading= {isLoading} />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Light gray background
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Space for the footer button
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },

  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Card Shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Input Styles
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F1F5F9', // Light input bg
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12, // standardized height
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 16,
    height: 48,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  
  // Input with Icon
  inputWithIcon: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  currencyPrefix: {
    fontSize: 16,
    color: '#64748B',
    marginRight: 12,
    fontWeight: '600',
  },
  flexInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    height: '100%',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
});

export default CreateJobScreen;