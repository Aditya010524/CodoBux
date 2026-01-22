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

const SignInScreen = ({ navigation }: any) => {
  const { loginUser} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [backendError, setBackendError] = useState('');

  const handleBack = () => navigation.goBack();
  const handleCreateAccount = () => navigation.navigate('SignUpScreen');
  const handleForgotPassword = () => console.log('Forgot Password pressed');

  // --- Validation Function ---
  const validate = () => {
    let isValid = true;
    let tempErrors = { email: '', password: '' };

    setBackendError('');

    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

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

  // --- Sign In Handler ---
  const handleSignIn = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);
      setBackendError('');
   await loginUser(email, password);
 
    } catch (error: any) {
      console.log('Login failed:', error);
      setBackendError(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
    } finally {
      setIsLoading(false);
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" color="#0F172A" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Backend Error */}
          {backendError ? (
            <Text style={styles.backendErrorText}>{backendError}</Text>
          ) : null}

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
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
                  if (backendError) setBackendError('');
                }}
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            {/* Password Input */}
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
                  if (backendError) setBackendError('');
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
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <View style={styles.buttonSection}>
            <Button
              title="Sign In"
              onPress={handleSignIn}
              isLoading={isLoading}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDF4FF' },
  container: { flex: 1 },
  scrollContent: { padding: 24 },
  header: { marginBottom: 24, marginTop: 10 },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 16, color: '#64748B', marginBottom: 32 },
  backendErrorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
  form: { marginBottom: 24 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputError: { borderWidth: 1, borderColor: '#EF4444' },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  passwordToggle: { padding: 8 },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -8,
    paddingVertical: 8,
  },
  forgotPasswordText: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },
  buttonSection: { marginTop: 16, marginBottom: 24 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: { fontSize: 14, color: '#64748B', fontWeight: '400' },
  createAccountText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '700',
    marginLeft: 4,
  },
});

export default SignInScreen;
