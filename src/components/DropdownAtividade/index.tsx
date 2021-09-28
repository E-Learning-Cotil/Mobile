import React, { useEffect, useRef, useState } from 'react';

import { Animated, View, Text } from 'react-native';

import { useAuth } from '../../contexts/auth';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

import ContentLoader, { Rect } from "react-content-loader/native"

export function DropdownAtividade() {
	const { user } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const deadline = "(25/10)";

	const status = 'yellow';

	const scaleAnim = useRef(new Animated.Value(0)).current;
	const [ dropDownState, setDropDownState ] = useState(false);

	const toggleAnimation = () => {
		if (dropDownState) {
			scaleDown();
		}
		else {
			scaleUp();
		}
	};

	const scaleUp = () => {
		setDropDownState(!dropDownState);
		Animated.timing(scaleAnim, {
			toValue: 90,
			duration: 500,
			useNativeDriver: false
		}).start();
	};

	const scaleDown = () => {
		Animated.timing(scaleAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false
		}).start(() => {
			setDropDownState(!dropDownState);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title} numberOfLines={1}>
					Sociologia
				</Text>
				<Text style={[
					styles.deadline,

					status === 'red' ?
					{color: theme.colors.red80} :
					status === 'yellow' ?
					{color: theme.colors.yellow80} :
					status === 'green' &&
					{color: theme.colors.green80}
				]}>
					{deadline}
				</Text>
				<FontAwesome5
					name={"caret-down"}
					size={24}
					color={theme.colors.white}
					style={styles.caret}
				/>
			</View>
			<View style={[styles.body, {display: 'none'}]}>
				<Text style={styles.title}>
					Sociologia
				</Text>
				<Text style={styles.deadline}>
					(25/10)
				</Text>
				<FontAwesome5
					name={"caret-down"}
					size={24}
					color={theme.colors.white}
				/>
			</View>
		</View>
	);
}