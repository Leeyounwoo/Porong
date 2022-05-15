import React,{ useEffect } from 'react';
import { Button,Animated, View,Easing } from 'react-native';

export default function AnimationTest() {
    //우철님한테 배우기
    let value = new Animated.Value(0);
    const animationF = () => {
        Animated.timing(value, {
            toValue: 200,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }

    const RotateData = value.interpolate({
        inputRange: [0, 200],
        outputRange: ['0deg', '360deg'],
      });
    
    useEffect(() => {
        console.log(value);
     }, [value]);



    return (
        <View>
            <Button title="클릭하기" onPress={animationF}></Button>
            <Animated.View style={{ width: 30, height: 30, transform: [{rotate:RotateData}]}}/>
        </View>
    )

}