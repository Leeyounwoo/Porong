import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>this is Homepage</Text>
      {/* <Button title="nav" onPress={() => navigation.navigate('signup1')} /> */}
    </View>
  );
}
