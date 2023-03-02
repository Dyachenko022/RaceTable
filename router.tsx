import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";

import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { StackNavigationProp } from '@react-navigation/stack';

import HomeScreen from "./screens/HomeScreen";
import DriverDetails from "./screens/DriverDetails";

type RootStackParamsList = {
  HomeScreen: undefined,
  DriverDetails: {
    dateOfBirth: string, 
    driverId: string, 
    givenName: string | undefined,
    familyName: string | undefined, 
    nationality: string, 
    url: string 
  }
}

export type navigationProps = NativeStackScreenProps<RootStackParamsList, 'DriverDetails'>

export type stackProps = StackNavigationProp<RootStackParamsList>;

const Stack = createStackNavigator<RootStackParamsList>();

export const navigationRef = createNavigationContainerRef();

const Router = (): JSX.Element => {

  return (
    <NavigationContainer ref={navigationRef} theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#fff'
      }
    }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='DriverDetails' component={DriverDetails} options={{presentation: 'modal'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router;


