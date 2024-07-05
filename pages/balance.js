import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../images/Homepage.png');

export default function BalancePage({ navigation }) {
  const [upiPin, setUpiPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    getPhoneNumber();
  }, []);

  const getPhoneNumber = async () => {
    try {
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      if (storedPhoneNumber !== null) {
        setPhoneNumber(storedPhoneNumber);
      }
    } catch (error) {
      console.error('Error retrieving phone number:', error);
    }
  };

  const handleCheckBalance = async () => {
    try {
      const response = await fetch('http://192.168.0.109:5000/check_balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          upiPin: upiPin,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      if (data.balance !== undefined) {
        alert(`Your balance is: ${data.balance}`);
      } else {
        alert(data.message || 'Unable to retrieve balance');
      }
  
    } catch (error) {
      console.error('Error checking balance:', error);
      alert('Error checking balance. Please try again.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <Text style={styles.title}>Check Balance</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter UPI PIN"
          secureTextEntry
          keyboardType="numeric"
          value={upiPin}
          onChangeText={setUpiPin}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleCheckBalance}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  phoneNumber: {
    position: 'absolute',
    top: 40,
    right: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(0, 123, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});