import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../images/Homepage.png');

export default function LoginPage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoggedIn = async () => {
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      if (storedPhoneNumber) {
        navigation.navigate('Mainpage');
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    // Create the payload
    const payload = {
      phoneNumber: phoneNumber,
      password: password,
    };

    // Send the POST request to the Flask server
    fetch('http://192.168.0.109:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(async data => {
      if (data.message === 'Login successful') {
        // Store the phone number in async storage
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        // Navigate to the main page if login is successful
        navigation.navigate('Mainpage');
      } else {
        // Show an alert if login fails
        Alert.alert('Login Failed', data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'rgba(0, 123, 255, 0.7)', // semi-transparent blue
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 200, // set width to your preference
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
