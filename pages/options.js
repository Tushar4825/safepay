import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../images/Homepage.png');

export default function OptionsPage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reportSummary, setReportSummary] = useState('');
  const [recipientInfo, setRecipientInfo] = useState({});

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (storedPhoneNumber !== null) {
          setPhoneNumber(storedPhoneNumber);
          console.log('Stored phone number:', storedPhoneNumber);
        } else {
          console.log('No stored phone number found');
        }

        const storedRecipientNumber = await AsyncStorage.getItem('recipientNumber');
        if (storedRecipientNumber !== null) {
          setRecipientNumber(storedRecipientNumber);
          console.log('Stored recipient number:', storedRecipientNumber);
        } else {
          console.log('No stored recipient number found');
        }
      } catch (error) {
        console.error('Error retrieving phone number or recipient number:', error);
      }
    };

    fetchPhoneNumber();
  }, []);

  const handleScanQR = () => {
    // Handle QR scanning logic here
    console.log('Scan QR button pressed');
  };

  const handleSendMoney = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Sender phone number not available. Please log in again.');
      return;
    }

    if (!recipientNumber) {
      Alert.alert('Error', 'Please enter recipient\'s number');
      return;
    }

    console.log('Sender Phone:', phoneNumber);
    console.log('Recipient Phone:', recipientNumber);

    try {
      const response = await Promise.race([
        fetch('http://192.168.0.109:5000/initiate_transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender_phone: phoneNumber,
            recipient_phone: recipientNumber,
          }),
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 15000))
      ]);

      if (response instanceof Error) {
        throw response;
      }

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        if (data.warning === 'high_report_count') {
          setReportSummary(data.report_summary);
          setRecipientInfo({
            name: data.recipient_name,
            bank: data.recipient_bank,
            reportCount: data.message.split(' ')[4]
          });
          setModalVisible(true);
        } else if (data.state === 'ready_to_transfer') {
          navigation.navigate('pay', {
            senderPhone: phoneNumber,
            recipientPhone: recipientNumber,
          });
        } else {
          Alert.alert('Transaction Failed', data.message || 'Unknown error occurred');
        }
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error initiating transaction:', error);
      if (error.message === 'Timeout') {
        Alert.alert('Error', 'App server is busy. Please try again later.');
      } else {
        Alert.alert('Error', 'Failed to initiate transaction. Please check your connection and try again.');
      }
    }
  };

  const handleRecipientNumberChange = async (number) => {
    setRecipientNumber(number);
    try {
      await AsyncStorage.setItem('recipientNumber', number);
    } catch (error) {
      console.error('Error storing recipient number:', error);
    }
  };

  const handleContinueTransaction = () => {
    setModalVisible(false);
    navigation.navigate('pay', {
      senderPhone: phoneNumber,
      recipientPhone: recipientNumber,
    });
  };

  const handleCancelTransaction = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <TouchableOpacity style={styles.button} onPress={handleScanQR}>
          <Text style={styles.buttonText}>Scan QR</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Recipient's Number"
          keyboardType="phone-pad"
          value={recipientNumber}
          onChangeText={handleRecipientNumberChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendMoney}>
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Warning: High Report Count</Text>
              <Text style={styles.modalText}>Recipient: {recipientInfo.name}</Text>
              <Text style={styles.modalText}>Bank: {recipientInfo.bank}</Text>
              <Text style={styles.modalText}>Report Count: {recipientInfo.reportCount}</Text>
              <Text style={styles.modalText}>Summary: {reportSummary}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={handleCancelTransaction}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonContinue]}
                  onPress={handleContinueTransaction}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  phoneNumber: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonCancel: {
    backgroundColor: 'red',
  },
  buttonContinue: {
    backgroundColor: 'green',
  },
});
