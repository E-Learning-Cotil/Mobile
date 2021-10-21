import React from 'react';

import { View, Text } from  'react-native';

import { styles } from './styles';

interface Props {
	visible: boolean;
	styledDate: string;
}

export function DateLabel({ visible, styledDate }: Props) {
	return (
		<View style={[
			styles.dateLabel,
			!visible && { display: 'none' }
		]}>
			<Text style={styles.dateLabelText}>
				{styledDate}
			</Text>
		</View>
	);
}