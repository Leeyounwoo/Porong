import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeStackScreen,
  AlarmStackScreen,
  AccountStackScreen,
  MessageStackScreen,
  SendStackScreen,
} from './Stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

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
const TAB_TO_RESET = 'HomeTab';
const resetHomeStackOnTabPress = ({navigation, route}) => ({
  tabPress: e => {
    const state = navigation.getState();
    console.log(state);
    if (state) {
      // Grab all the tabs that are NOT the one we just pressed
      const nonTargetTabs = state.routes.filter(r => r.key !== e.target);

      nonTargetTabs.forEach(tab => {
        // Find the tab we want to reset and grab the key of the nested stack
        const tabName = tab?.name;
        const stackKey = tab?.state?.key;

        if (stackKey && tabName === TAB_TO_RESET) {
          // Pass the stack key that we want to reset and use popToTop to reset it
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: stackKey,
          });
        }
      });
    }
  },
});
const Tabs = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });
  }, []);

  return (
    <Tab.Navigator
      // 첫 화면 Route 설정
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          elevation: 3,
          backgroundColor: '#ffffff',
          height: 60,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
        name="AlarmStack"
        component={AlarmStackScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
        name="SendStack"
        component={SendStackScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
        name="MessageStack"
        component={MessageStackScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
        name="AccountStack"
        component={AccountStackScreen}
        listeners={resetHomeStackOnTabPress}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
