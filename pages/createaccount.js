import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';

const backgroundImage = require('../images/Homepage.png');

export default function CreateBankAccountPage({ navigation }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [balance, setBalance] = useState('');

  const handleCreateAccount = async () => {
    try {
      const response = await fetch('http://192.168.0.109:5000/create_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          bankName,
          upiPin,
          balance
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Account created successfully:', data);
        
        // Reset the form fields
        setName('');
        setPhoneNumber('');
        setBankName('');
        setUpiPin('');
        setBalance('');
  
        Alert.alert('Success', `Account created successfully! User ID: ${data.user_id}`);
      } else {
        throw new Error(data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', `Failed to create account: ${error.message}`);
    }
  };
  
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Bank Account</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="UPI PIN"
          secureTextEntry
          keyboardType="numeric"
          value={upiPin}
          onChangeText={setUpiPin}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Balance"
          keyboardType="numeric"
          value={balance}
          onChangeText={setBalance}
        />

        
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
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