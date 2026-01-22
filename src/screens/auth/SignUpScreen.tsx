import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
const SignUpScreen = ({ navigation }: any) => {
  const { registerUser } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error State
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [backendError, setBackendError] = useState('');

  // Navigation placeholders
  const handleBack = () => navigation.goBack();
  const handleSignIn = async () => {
    navigation.navigate('SignInScreen');
  };

  const validate = () => {
    let isValid = true;
    let tempErrors = { fullName: '', email: '', password: '' };

    // Full Name Validation
    if (!name.trim()) {
      tempErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    // Gmail Validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
      isValid = false;
    } else if (!gmailRegex.test(email)) {
      tempErrors.email = 'Please enter a valid @gmail.com address';
      isValid = false;
    }

    // Password Validation
    if (!password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleCreateAccount = async () => {
    if (validate()) {
      try {
        setIsLoading(true);
        setBackendError('');
        const data = await registerUser(name, email, password);
        console.log('Signup successful:', data);
        navigation.navigate('SignInScreen');
      } catch (error: any) {
        console.log('Signup failed:', error);
        setBackendError(error.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EDF4FF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Header --- */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" color="#0F172A" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CJM today</Text>

          {/* --- Form Section --- */}
          <View style={styles.form}>
            {/* Full Name Input */}
            <View>
              {/* Backend Error */}
              {backendError ? (
                <Text style={styles.backendErrorText}>{backendError}</Text>
              ) : null}

              <View
                style={[
                  styles.inputContainer,
                  errors.fullName ? styles.inputError : null,
                ]}
              >
                <View style={styles.inputIcon}>
                  <Ionicons
                    name="person-outline"
                    color={errors.fullName ? '#EF4444' : '#94A3B8'}
                    size={20}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={text => {
                    setName(text);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                />
              </View>
              {errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>

            {/* Email Address Input */}
            <View>
              <View
                style={[
                  styles.inputContainer,
                  errors.email ? styles.inputError : null,
                ]}
              >
                <View style={styles.inputIcon}>
                  <Ionicons
                    name="mail-outline"
                    color={errors.email ? '#EF4444' : '#94A3B8'}
                    size={20}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View>
              <View
                style={[
                  styles.inputContainer,
                  errors.password ? styles.inputError : null,
                ]}
              >
                <View style={styles.inputIcon}>
                  <Ionicons
                    name="lock-closed-outline"
                    color={errors.password ? '#EF4444' : '#94A3B8'}
                    size={20}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.passwordToggle}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    color="#94A3B8"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              {/* Show error text if error exists, otherwise show helper text */}
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <Text style={styles.helperText}>
                  Password must be at least 8 characters
                </Text>
              )}
            </View>
          </View>

          {/* --- Action Button --- */}
          <View style={styles.buttonSection}>
            <Button
              title="Create Account"
              onPress={handleCreateAccount}
              isLoading={isLoading}
            />
          </View>

          {/* --- Footer --- */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDF4FF', // Light blue background
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },

  // Header Styles
  header: {
    marginBottom: 24,
    marginTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22, // Perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    // Soft shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A', // Dark Slate
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B', // Slate 500
    marginBottom: 32,
  },
backendErrorText: {
  color: '#EF4444',
  fontSize: 14,
  fontWeight: '500',
  marginBottom: 12,
  textAlign: 'center',
},

  // Form Styles
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16, // Default margin
    // Soft Input Shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent', // Ready for error state
  },
  inputError: {
    borderColor: '#EF4444', // Red border on error
    marginBottom: 8, // Reduce margin to make room for error text
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  passwordToggle: {
    padding: 8,
  },
  helperText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: -8,
    marginLeft: 4,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444', // Red text
    marginTop: -4,
    marginLeft: 4,
    marginBottom: 12,
    fontWeight: '500',
  },

  // Button Section
  buttonSection: {
    marginTop: 8,
    marginBottom: 24,
  },

  // Footer Styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
  },
  signInText: {
    fontSize: 14,
    color: '#3B82F6', // Primary Blue
    fontWeight: '700',
    marginLeft: 4,
  },
});

export default SignUpScreen;
