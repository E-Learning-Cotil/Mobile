import React from 'react';

import { View } from 'react-native';

import { Avatar } from '../../components/Avatar';
import { ButtonIcon } from '../../components/ButtonIcon';
import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function Menu(){
    return(
      <View style={styles.container}>          
          <NavBar  title="Home" iconName="home" color={theme.colors.green90}/>

          <LabelText title="Atividades" color={theme.colors.green90} 
            />
      </View>
    );
  }