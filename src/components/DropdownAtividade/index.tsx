import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { getFormattedDatetime, getDatetimeColor } from '../../utils/moment';

import { Animated, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { useAuth } from '../../contexts/auth';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import ContentLoader, { Rect } from "react-content-loader/native"

interface Props {
	loading: boolean;
	id?: number;
	title?: string;
	deadline?: string;
	description?: string;
	tipo?: 'ATIVIDADE' | 'TESTE';
}

export function DropdownAtividade({ id, title, deadline, description, loading, tipo }: Props) {
	const navigation = useNavigation();

	const { user } = useAuth();
	const role = user?.role;
	let status;

	if (deadline) {
		status = getDatetimeColor(deadline);
		
		deadline = '(' + getFormattedDatetime(deadline, 'DD/MM') + ')';
	}

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
						<TouchableOpacity
							style={styles.navigateButton}
							onPress={ () => {
								tipo === 'ATIVIDADE' ?
								navigation.navigate("Atividade" as never, { id: id } as never)
								:
								navigation.navigate("Teste" as never, { id: id } as never)
							}}
						>
							<Text style={styles.navigateButtonText}>
								Ver { tipo === 'ATIVIDADE' ? 'atividade' : 'teste' }
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
				height={48}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="10" y="12" rx="6" ry="6" width="60%" height="24"/>
				<FontAwesome5
					name={"caret-down"}
					size={24}
					color={theme.colors.white}
					style={{position: 'absolute', right: 10, top: 10}}
				/>
			</ContentLoader>
		);
}