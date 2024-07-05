import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomePage({ navigation }) {
  const [gradientColors, setGradientColors] = useState(['#0052D4', '#4364F7', '#6FB1FC']);
  const welcomeTextAnim = useRef(new Animated.Value(0)).current;
  const subtitleTextAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientColors([
        `#${Math.floor(Math.random()*16777215).toString(16)}`,
        `#${Math.floor(Math.random()*16777215).toString(16)}`,
        `#${Math.floor(Math.random()*16777215).toString(16)}`,
      ]);
    }, 5000);

    Animated.sequence([
      Animated.timing(welcomeTextAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleTextAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <Animated.Text 
            style={[
              styles.welcomeText, 
              { 
                opacity: welcomeTextAnim,
                transform: [
                  {
                    translateY: welcomeTextAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }
            ]}
          >
            Welcome to SafePay
          </Animated.Text>
          <Animated.Text 
            style={[
              styles.subtitleText,
              {
                opacity: subtitleTextAnim,
                transform: [
                  {
                    translateX: subtitleTextAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 0],
                    }),
                  },
                ],
              }
            ]}
          >
            The only place for safe and secure payments
          </Animated.Text>
        </View>
        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim,
              transform: [
                {
                  scale: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            }
          ]}
        >
          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitleText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#4364F7',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
