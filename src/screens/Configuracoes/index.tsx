import React, { useEffect, useState } from "react";

import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { LabelText } from "../../components/LabelText";
import { NavBar } from "../../components/NavBar";
import { CardAtividade } from "../../components/CardAtividade";
import { CardTurma } from "../../components/CardTurma";
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from "../../contexts/auth";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import api from "../../services/api";

import ContentLoader, { Rect } from "react-content-loader/native";
import { Avatar } from "../../components/Avatar";
import { LabelIcon } from "../../components/LabelIcon";

export function Configuracoes() {
  const { user } = useAuth();
  
  const role = user?.role;
  const color = role === "ALUNO" ? theme.colors.green90 : theme.colors.purple90;

  const [ editMode, setEditMode ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const [ userState, setUserState ] = useState({ foto: user?.foto, email: user?.email, telefone: user?.telefone, nome: user?.nome, senha: ''});

  return (
    <View style={styles.container}>
      <NavBar title="Configurações" iconName="cog" color={color} />
      <ScrollView style={[styles.content]} >
        <View style={styles.avatarDiv}>
          <View
            style={[styles.avatarBackground, { backgroundColor: color }]}
          ></View>
          <Avatar
            urlImage={user?.foto}
            imageBorderRadius={{ borderRadius: 10 }}
            style={[
              {
                width: 100,
                height: 100,
                marginTop: 20,
                marginLeft: 20,
                position: "absolute",
              },
            ]}
          />
        </View>
        <View style={styles.userInfo}>
                  
          <LabelText title="Apelido" color={color} />
          <TextInput 
          style={[styles.textConfig, editMode && styles.textEdit]} 
          onChangeText={text => setUserState(previousState => ({ ...previousState, nome: text }))}
          value={userState.nome}
          
          editable={editMode}
          />

          <LabelText title="Email" color={color} />
          <TextInput 
          style={[styles.textConfig, editMode && styles.textEdit]} 
          onChangeText={text => setUserState(previousState => ({ ...previousState, email: text }))}
          value={userState.email}
          editable={editMode}
          />

          <LabelText title="Telefone" color={color} />
          <TextInput 
          style={[styles.textConfig, editMode && styles.textEdit]} 
          onChangeText={text => setUserState(previousState => ({ ...previousState, telefone: text }))}
          value={userState.telefone}
          editable={editMode}
          />

          <LabelText title="Senha" color={color} />
          <TextInput 
            style={[styles.textConfig, editMode && styles.textEdit]} 
            secureTextEntry
            onChangeText={text => setUserState(previousState => ({ ...previousState, senha: text }))}
            value={editMode ? userState.senha : '**********'}
            editable={editMode}
          />
        </View>
      </ScrollView>
      <View style={styles.content}>
      <RectButton 
          style={[styles.configButton, {backgroundColor: color}]}
          onPress={() => {editMode ? setEditMode(false) : setEditMode(true)}}
		    >

			      <LabelIcon title={editMode? "Concluido" : "Editar"} iconName={"pen"}/>
			
		  </RectButton>
      </View>
    </View>
  );
}
