import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../images/Homepage.png');

export default function MainPage({ route, navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (storedPhoneNumber !== null) {
          setPhoneNumber(storedPhoneNumber);
        }
      } catch (error) {
        console.error('Error retrieving phone number:', error);
      }
    };

    fetchPhoneNumber();
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Safe Pay</Text>
        
        {/* Display phone number in top-right */}
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Options')}>
          <Text style={styles.buttonText}>Transfer Money</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Balance')}>
          <Text style={styles.buttonText}>Check Balance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report')}>
          <Text style={styles.buttonText}>Report Fraud</Text>
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
  phoneContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  phoneNumber: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
