import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../images/Homepage.png');

export default function ReportPage({ navigation }) {
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [senderPhoneNumber, setSenderPhoneNumber] = useState('');

  useEffect(() => {
    const fetchSenderPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (storedPhoneNumber) {
          setSenderPhoneNumber(storedPhoneNumber);
        }
      } catch (error) {
        console.error('Error retrieving sender phone number:', error);
      }
    };

    fetchSenderPhoneNumber();
  }, []);

  const handleSubmitReport = async () => {
    if (!recipientPhoneNumber || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.109:5000/submit_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderPhoneNumber,
          recipientPhoneNumber,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Report submitted successfully');
        setRecipientPhoneNumber('');
        setDescription('');
      } else {
        Alert.alert('Error', data.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'Failed to submit report. Please check your connection and try again.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Report Fraud</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Recipient's Phone Number"
          keyboardType="phone-pad"
          value={recipientPhoneNumber}
          onChangeText={setRecipientPhoneNumber}
        />
        
        <Text style={styles.subtitle}>Describe how you've been cheated:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmitReport}>
          <Text style={styles.buttonText}>Submit Report</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 100, // increase the height for multiline text input
    textAlignVertical: 'top', // align text to the top for multiline input
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgba(0, 123, 255, 0.7)', // semi-transparent blue
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%', // set width to your preference
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});