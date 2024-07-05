import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const backgroundImage = require('../images/Homepage.png');

export default function HomePage({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <TouchableOpacity 
        style={styles.aboutUsButton} 
        onPress={() => navigation.navigate('AboutUs')}
      >
        <Text style={styles.aboutUsButtonText}>About Us</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Safepay</Text>
        <Text style={styles.subtitle}>The only place for safe and secure payments</Text>
      </View>
      
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>Login to continue</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Test the app; Create bank account</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.buttonText}>Create account</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // semi-transparent blue
    padding: 10,
    borderRadius: 5,
    width: '48%', // slightly less than half to account for space between
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  aboutUsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 5,
  },
  aboutUsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});