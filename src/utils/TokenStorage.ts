import * as Keychain from 'react-native-keychain';

export const saveToken = async (token : any) => {
  // Save token securely
  await Keychain.setGenericPassword('auth', token);
};

export const getToken = async () => {
  // Get token from secure storage
  const creds = await Keychain.getGenericPassword();
  return creds ? creds.password : null;
};

export const clearToken = async () => {
  await Keychain.resetGenericPassword();
};
