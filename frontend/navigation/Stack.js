import React from 'react';
import Image from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SigninScreen from '../screens/Signin';
import PhoneScreen from '../screens/PhoneForm';
import AlarmScreen from '../screens/Alarm';
import TotalScreen from '../components/sendmessage/MessageTotal';
import TimeScreen from '../components/sendmessage/MessageTime';
import ContentScreen from '../components/sendmessage/MessageContent';
import TypeScreen from '../components/sendmessage/MessageType';
import MessageScreen from '../components/sendmessage/MessagePerson';
import ReceivedBox from '../screens/ReceivedBox';
import PersonScreen from '../components/sendmessage/MessagePerson';
import PlaceScreen from '../components/sendmessage/MessagePlace';
import TempScreen from '../screens/Temp';

import Setting from '../screens/Setting';
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const AlarmStack = createStackNavigator();
const MessageStack = createStackNavigator();
const SendStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#335342',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <HomeStack.Screen
        name="Profile"
        options={{
          title: '홈',
          headerLeft: false,
        }}
        component={HomeScreen}
      />
      <HomeStack.Screen name="HomeTemp" component={TempScreen} />
    </HomeStack.Navigator>
  );
}

function AlarmStackScreen() {
  return (
    <AlarmStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#335342',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <AlarmStack.Screen name="Alarm" component={AlarmScreen} />
      <AlarmStack.Screen name="Temp" component={TempScreen} />
    </AlarmStack.Navigator>
  );
}

function SendStackScreen() {
  return (
    <SendStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#335342',
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

function logo() {
  return (
    <Image style={{ width: 100, height: 100, flex: 1 }} resizeMode="contain" source={require('../assets/icons/logo.png')} /> 
  )
}


function MessageStackScreen() {
  return (
    <MessageStack.Navigator
      screenOptions={{
       
        headerStyle: {
          backgroundColor: '#335342',
        },
      }}>
      <MessageStack.Screen name="Messege"  component={ReceivedBox} />
      <MessageStack.Screen name="MessageTemp" component={TempScreen} />
    </MessageStack.Navigator>
  );
}

function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#335342',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <AccountStack.Screen
        name="setting"
        options={{title: '환경설정'}}
        component={Setting}
      />
    </AccountStack.Navigator>
  );
}

export {
  HomeStackScreen,
  AlarmStackScreen,
  AccountStackScreen,
  MessageStackScreen,
  SendStackScreen,
};
