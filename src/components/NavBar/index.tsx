import React from 'react';

import { View, TouchableWithoutFeedback } from 'react-native';
import { LabelIcon } from '../LabelIcon';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons';

import { DrawerActions, useNavigation } from '@react-navigation/native';

type Props = {
	title?: string;
	iconName?: string;
	color?: string | undefined;
}

export function NavBar({ title, iconName, color }: Props) {
	const navigation = useNavigation();

	function openDrawerClickHandler() {
		navigation.dispatch(DrawerActions.openDrawer());
	}

	return (
		<View style={[styles.container, { backgroundColor: color }]}>

			<LabelIcon title={title} iconName={iconName} />

			<TouchableWithoutFeedback onPress={openDrawerClickHandler}>
				<View style={styles.navButton}>
					<FontAwesome5 name="bars" size={32} color="white" />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}