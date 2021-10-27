import React from 'react';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

import { LabelIcon } from '../LabelIcon';
import { useNavigation } from '@react-navigation/native';

type Props = RectButtonProps & {
  title: string;
  iconName: string;
  routeName?: string;
}

export function ButtonIcon( { title, iconName, routeName, ...rest } : Props) {
  const navigation = useNavigation();  

    function handleAccessClick () {
      	navigation.navigate(routeName as never);
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