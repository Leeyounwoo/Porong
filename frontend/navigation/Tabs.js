import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeStackScreen,
  AlarmStackScreen,
  AccountStackScreen,
  MessageStackScreen,
  SendStackScreen,
} from './Stack';

const SendButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 40,
          backgroundColor: '#C449C2',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 3,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#C449C2' : 'grey',
                }}
                source={require('../assets/icons/homepage.png')}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={AlarmStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#C449C2' : 'grey',
                }}
                source={require('../assets/icons/bell.png')}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Send"
        component={SendStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/send.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
                borderRadius: 10,
                borderWidth: 10,
              }}
            />
          ),
          tabBarButton: props => <SendButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#C449C2' : 'grey',
                }}
                source={require('../assets/icons/email.png')}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#C449C2' : 'grey',
                }}
                source={require('../assets/icons/enter.png')}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});

//   <Tabs.Screen
//     name="alarm"
//     component={AlarmStackScreen}
//     options={{
//       tabBarIcon: ({focused}) => (
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Image
//             style={{
//               width: 30,
//               height: 30,
//               tintColor: focused ? '#C449C2' : 'grey',
//             }}
//             source={require('./assets/icons/bell.png')}
//           />
//         </View>
//       ),
//     }}
//   />
