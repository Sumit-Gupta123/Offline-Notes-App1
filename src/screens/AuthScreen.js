import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useGlobal } from '../context/GlobalContext';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useGlobal();

  const handleSubmit = async () => {
    if (!username || !password) return Alert.alert('Error', 'Fill all fields');

    if (isLogin) {
      const res = await login(username, password);
      if (!res.success) Alert.alert('Error', res.msg);
    } else {
      const res = await signup(username, password);
      if (res.success) {
        Alert.alert('Success', 'Account created! Please login.');
        setIsLogin(true);
      } else {
        Alert.alert('Error', res.msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput 
        placeholder="Username" 
        style={styles.input} 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        placeholder="Password/PIN" 
        style={styles.input} 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title={isLogin ? "Login" : "Create Account"} onPress={handleSubmit} />
      <Text 
        style={styles.switchText} 
        onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? "New here? Create account" : "Have an account? Login"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  switchText: { marginTop: 15, color: 'blue', textAlign: 'center' }
});