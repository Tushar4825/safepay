import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './pages/welcome';
import HomePage from './pages/homepage'
import LoginPage from './pages/loginpage'
import SignupPage from './pages/SignupPage';
import MainPage from './pages/Mainpage';
import OptionsPage from './pages/options';
import BalancePage from './pages/balance';
import PayPage from './pages/Pay';
import ReportPage from './pages/report';
import CreateBankAccountPage from './pages/createaccount';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mainpage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Options"
          component={OptionsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Balance"
          component={BalancePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pay"
          component={PayPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={ReportPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateBankAccountPage}
          options={{ headerShown: false }}
        />
        {/* Add other screens and navigation configurations here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}