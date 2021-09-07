import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

interface Props {
  urlImage: string | undefined;
}

export function Avatar( { urlImage }: Props ) {

  return (
	  <View style={styles.container}>
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
	 
  )

}