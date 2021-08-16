import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';

import { Routes } from './src/routes';

import { useFonts } from 'expo-font';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Righteous_400Regular } from '@expo-google-fonts/righteous';

import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
    Righteous_400Regular,
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

	return (
		<View 
			style={{
				flex: 1
			}}
		>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Routes />
		</View>
	);
}
