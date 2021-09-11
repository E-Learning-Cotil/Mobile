import React from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

import { LabelIcon } from '../LabelIcon';

type Props = RectButtonProps & {
  navigation: any;
  title: string;
  iconName: string;
  routeName?: string;
}

export function ButtonIcon( { navigation, title, iconName, ...rest } : Props) {
    
    function handleAccessClick () {
      	navigation.navigate('menu');
    }

    return(
		<RectButton 
			style={[styles.container, rest.style]}
			onPress={handleAccessClick}
		>

			<LabelIcon title={title} iconName={iconName}/>
			
		</RectButton>
    );
}