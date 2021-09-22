import React from 'react';
import { Image, View, ViewProps, ImageStyle } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = ViewProps & {
  urlImage: string | undefined;
  imageBorderRadius?: ImageStyle;
}

export function Avatar( { urlImage, imageBorderRadius, ...rest }: Props ) {

	return (
		<View style={[styles.container, rest.style, imageBorderRadius]}>
		{
			urlImage ? 
				<Image 
					source={{ uri: urlImage }}
					style={[styles.avatar, imageBorderRadius]}
				/>
			:
				null
		}
		</View>
	);
}