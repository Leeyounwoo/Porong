import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SigninScreen from '../screens/Signin';
import PhoneScreen from '../screens/PhoneForm';
import AlarmScreen from '../screens/Alarm';
import TimeScreen from '../components/sendmessage/MessageTime';
import ContentScreen from '../components/sendmessage/MessageContent';
import TypeScreen from '../components/sendmessage/MessageType';
import MessageScreen from '../components/sendmessage/MessagePerson';
import ReceivedBox from '../screens/ReceivedBox';
import PersonScreen from '../components/sendmessage/MessagePerson';
import PlaceScreen from '../components/sendmessage/MessagePlace';
import TotalScreen from '../components/Messagedetail';

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
      <AlarmStack.Screen name="Alarm" component={AlarmScreen} />
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
      <AccountStack.Screen name="login" component={LoginScreen} />
      <AccountStack.Screen name="signin" component={SigninScreen} />
      <AccountStack.Screen name="phone" component={PhoneScreen} />
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
      <MessageStack.Screen name="Messege" component={ReceivedBox} />
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
        headerTitle: '메세지 보내기',
      }}>
      <SendStack.Screen name="Person" component={PersonScreen} />
      <SendStack.Screen name="Time" component={TimeScreen} />
      <SendStack.Screen name="Place" component={PlaceScreen} />
      <SendStack.Screen name="Content" component={ContentScreen} />
      <SendStack.Screen name="Type" component={TypeScreen} />
      <SendStack.Screen name="Total" component={TotalScreen} />
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
