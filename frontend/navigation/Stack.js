import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SigninScreen from '../screens/Signin';
import PhoneScreen from '../screens/PhoneForm';
import AlarmScreen from '../screens/Alarm';
import SendScreen from '../screens/Message';
import ContentScreen from '../screens/MessageContent';
import TypeScreen from '../screens/MessageType';
import MessageScreen from '../screens/SendMessage';
import ReceivedBox from '../screens/ReceivedBox';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#867AE9',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
const AlarmStack = createStackNavigator();
function AlarmStackScreen() {
  return (
    <AlarmStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#867AE9',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      {/* <AlarmStack.Screen name="Alarm" component={AlarmScreen} /> */}
      <AlarmStack.Screen name="Alarm" component={ReceivedBox} />
    </AlarmStack.Navigator>
  );
}
const AccountStack = createStackNavigator();
function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#867AE9',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <AccountStack.Screen name="phone" component={PhoneScreen} />
      <AccountStack.Screen name="login" component={LoginScreen} />
      <AccountStack.Screen name="signin" component={SigninScreen} />
    </AccountStack.Navigator>
  );
}

const MessageStack = createStackNavigator();
function MessageStackScreen() {
  return (
    <MessageStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#867AE9',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <MessageStack.Screen name="Messege" component={MessageScreen} />
    </MessageStack.Navigator>
  );
}

const SendStack = createStackNavigator();
function SendStackScreen() {
  return (
    <SendStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#867AE9',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <SendStack.Screen
        name="send"
        component={SendScreen}
        options={{headerTitle: '메세지 보내기'}}
      />
      <SendStack.Screen name="Content" component={ContentScreen} />
      <SendStack.Screen name="Type" component={TypeScreen} />
    </SendStack.Navigator>
  );
}

export {
  HomeStackScreen,
  AlarmStackScreen,
  AccountStackScreen,
  MessageStackScreen,
  SendStackScreen,
};
