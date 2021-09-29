import React, { useEffect, useRef, useState } from 'react';

import { Animated, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { useAuth } from '../../contexts/auth';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import ContentLoader, { Rect } from "react-content-loader/native"

interface Props {
	id?: number;
	title?: string;
	deadline?: string;
	description?: string;
	loading: boolean;
}

export function DropdownAtividade({id, title, deadline, description, loading = false}: Props) {
	const { user } = useAuth();
	const role = user?.role;

	const now = new Date((new Date()).getTime() - (3 * 60 * 60 * 1000));

	deadline = "2021-05-27T19:12:04.843Z"; // deadline.substring(0, 10)
	const deadlineDate = new Date(deadline);
	const date = deadlineDate.getDate() < 10 ? `0${deadlineDate.getDate()}` : deadlineDate.getDate();
	const month = deadlineDate.getMonth() < 10 ? `0${deadlineDate.getMonth()}` : deadlineDate.getMonth();
	deadline = "(" + date + "/" + month + ")";

	const status = deadlineDate > now ? 'green' : deadlineDate == now ? 'yellow' : 'red' ;

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
			toValue: 100,
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

	if (!loading)
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={toggleAnimation}>
					<View style={styles.header}>
						<Text style={styles.title} numberOfLines={1}>
							{title}
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
							name={dropDownState ? "caret-up" : "caret-down"}
							size={24}
							color={theme.colors.white}
							style={styles.caret}
						/>
					</View>
				</TouchableWithoutFeedback>
				<Animated.View style={[styles.body, { height: scaleAnim }]}>
					<Text style={styles.description} numberOfLines={2}>
						{description}
					</Text>
					<View style={styles.buttonsView}>
						<TouchableOpacity style={styles.checkButton}>
							<FontAwesome5 name="check" size={22} color={theme.colors.white} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.navigateButton}>
							<Text style={styles.navigateButtonText}>
								Ver atividade
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</View>
		);
	else 
		return (
			<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={'100%'}
				height={44}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="10" y="10" rx="6" ry="6" width="60%" height="24"/>
				<FontAwesome5
					name={"caret-down"}
					size={24}
					color={theme.colors.white}
					style={{position: 'absolute', right: 10, top: 10}}
				/>
			</ContentLoader>
		);
}