import React, { useState } from 'react';

import { RectButton } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons'; 

import { styles } from './styles';

type Props = {
	checkboxState: boolean;
	setCheckboxState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Checkbox ({checkboxState, setCheckboxState}: Props) {
	function handleCheckboxClick () {
		setCheckboxState(!checkboxState);
	}

	return (
		<RectButton
			onPress={handleCheckboxClick}
			style={[
				styles.box,
				checkboxState ? styles.selected : null
			]}
		>
			{
				checkboxState
				? 
				<FontAwesome5 name="check" size={16} color="#202020" />
				:
				null
			}
		</RectButton>
	);
}