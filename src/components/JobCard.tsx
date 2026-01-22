import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the shape of a Job object
export interface JobData {
  id: string;
  title: string;
  client: string;
  price: string;
  location: string;
  date: string;
  status: 'Active' | 'Pending' | 'Completed';
}

interface JobCardProps {
  item: JobData;
  onPress?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ item, onPress }) => {
  
  // Helper to get colors based on status
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: '#DCFCE7', text: '#16A34A', icon: 'radio-button-on' }; // Green
      case 'Pending':
        return { bg: '#FEF3C7', text: '#D97706', icon: 'time-outline' }; // Yellow/Orange
      case 'Completed':
        return { bg: '#DBEAFE', text: '#2563EB', icon: 'checkmark-circle-outline' }; // Blue
      default:
        return { bg: '#F1F5F9', text: '#64748B', icon: 'help-circle-outline' };
    }
  };

  const statusStyle = getStatusStyles(item.status);

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      {/* Header: Title & Status */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.client}>{item.client}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Ionicons name={statusStyle.icon} size={12} color={statusStyle.text} style={{ marginRight: 4 }} />
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Middle Row: Price & Location */}
      <View style={styles.infoRow}>
        
        {/* Price */}
        <View style={styles.infoItem}>
          <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="logo-usd" size={16} color="#3B82F6" />
          </View>
          <Text style={styles.infoText}>{item.price}</Text>
        </View>

        {/* Location */}
        <View style={styles.infoItem}>
          <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="location-outline" size={16} color="#16A34A" />
          </View>
          <Text style={styles.infoText}>{item.location}</Text>
        </View>

      </View>

      {/* Footer: Divider & Date */}
      <View style={styles.divider} />
      
      <View style={styles.footerRow}>
        <Ionicons name="time-outline" size={14} color="#94A3B8" style={{ marginRight: 6 }} />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Card Shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  client: {
    fontSize: 14,
    color: '#64748B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Info Row
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Split space evenly
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },

  // Footer
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

export default JobCard;