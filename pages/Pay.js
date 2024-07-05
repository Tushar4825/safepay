import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../images/Homepage.png');

export default function PayPage({ navigation }) {
  const [amount, setAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const storedSenderPhone = await AsyncStorage.getItem('phoneNumber');
        const storedRecipientPhone = await AsyncStorage.getItem('recipientNumber');
        if (storedSenderPhone !== null) {
          setSenderPhone(storedSenderPhone);
          console.log('Stored sender phone number:', storedSenderPhone);
        }
        if (storedRecipientPhone !== null) {
          setRecipientPhone(storedRecipientPhone);
          console.log('Stored recipient phone number:', storedRecipientPhone);
        }
      } catch (error) {
        console.error('Error retrieving phone numbers:', error);
      }
    };

    fetchPhoneNumbers();
  }, []);

  const handlePay = async () => {
    if (!amount || !upiPin) {
      Alert.alert('Error', 'Please enter all details');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.109:5000/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_phone: senderPhone,
          recipient_phone: recipientPhone,
          amount,
          upi_pin: upiPin,
        }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        Alert.alert('Success', 'Payment processed successfully');
        // Navigate to a success or confirmation screen if needed
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', 'Failed to process payment. Please check your connection and try again.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.phoneNumbers}>
          <Text style={styles.phoneNumberText}>Sender: {senderPhone}</Text>
          <Text style={styles.phoneNumberText}>Recipient: {recipientPhone}</Text>
        </View>
        <Text style={styles.title}>Pay</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter UPI PIN"
          secureTextEntry
          keyboardType="numeric"
          value={upiPin}
          onChangeText={setUpiPin}
        />
        
        <TouchableOpacity style={styles.button} onPress={handlePay}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    padding: 20,
  },
  phoneNumbers: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  phoneNumberText: {
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
