import React from 'react';
import {Image} from 'react-native';
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

function LogoTitle() {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={require('../assets/images/logo.png')}
    />
  );
}

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
        component={HomeScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <HomeStack.Screen
        name="HomeTemp"
        component={TempScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
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
      }}
      options={{headerTitle: props => <LogoTitle {...props} />}}>
      <AlarmStack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <AlarmStack.Screen
        name="Temp"
        component={TempScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
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
      <SendStack.Screen
        name="Person"
        component={PersonScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <SendStack.Screen
        name="Time"
        component={TimeScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <SendStack.Screen
        name="Place"
        component={PlaceScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <SendStack.Screen
        name="Content"
        component={ContentScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <SendStack.Screen
        name="Type"
        component={TypeScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <SendStack.Screen
        name="Total"
        component={TotalScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
    </SendStack.Navigator>
  );
}

function MessageStackScreen() {
  return (
    <MessageStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#335342',
        },
        headerTitleAlign: 'center',
      }}>
      <MessageStack.Screen
        name="Messege"
        component={ReceivedBox}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
      <MessageStack.Screen
        name="MessageTemp"
        component={TempScreen}
        options={{headerTitle: props => <LogoTitle {...props} />}}
      />
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
        component={Setting}
        options={{headerTitle: props => <LogoTitle {...props} />}}
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
