import React from 'react';
import { Image, View, ViewProps } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = ViewProps & {
  urlImage: string | undefined;
}

export function Avatar( { urlImage, ...rest }: Props ) {

	return (
		<View style={[styles.container, rest.style]}>
		{
			urlImage ? 
				<Image 
					source={{ uri: urlImage }}
					style={styles.avatar}
				/>
			:
				null
		}
		</View>
	);
}