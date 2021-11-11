import React, { useEffect, useState } from "react";
import { 
	View, 
	Text, 
	Image, 
	PermissionsAndroid,
    Platform,
} from "react-native";

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native";

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";


interface Props {
	id?: number;
	
	type?: number;
	title?: string;
	color?: string;
	url: string;
	//name: string;

	loading?: boolean;
}

export function DownloadableFile ({ id, type, title, color, loading = false, url, /*name*/}: Props) {
	const navigation = useNavigation();

	const trimUrl = (url: string) => {
		return url.substring(url.lastIndexOf('/') + 1)
	}

	const downloadAndOpen = async (fileUrl: string) => {
		try {
			const image = ['png', 'jpg', 'jpeg'];

			const fileName = trimUrl(fileUrl)

			const fileExtension = fileName.split('.').pop();

			const isImage = fileExtension && image.includes(fileExtension);

			const { exists } = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + fileName);

			if (!exists) {
				const { uri } = await FileSystem.downloadAsync(
					fileUrl,
					FileSystem.cacheDirectory + fileName,
				);

				if ( isImage ) {
					const asset = await MediaLibrary.createAssetAsync(uri);
					const album = await MediaLibrary.getAlbumAsync('E-learning');
	
					if (album === null) {
						await MediaLibrary.createAlbumAsync('E-learning', asset, false);
					} else {
						await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
					}
				}
			}

			const contentUri = await FileSystem.getContentUriAsync(FileSystem.cacheDirectory + fileName);

			await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
				data: contentUri,
				flags: 1,
			});
		}
		catch (e) {
			console.error(e);
		}
	}

	if (!loading)
		return (
			<View style={styles.container}>
				<RectButton 
					style={styles.button} 
					onPress={() => {
						downloadAndOpen(url);
					}}
				>
					<View style={styles.row}>
						<View style={styles.contentDiv}>
							<FontAwesome5 name={"file"} size={24} color="black" />	
							<Text 
							style={[ 
								styles.text,
								styles.title 
							]} 
							numberOfLines={1}
							>
								{trimUrl(url)}
							</Text> 	
						</View>
						

						
							

						<View style={[styles.iconDiv, {backgroundColor: color}]}>
							<FontAwesome5 name={"download"} size={24} color="white" />
						</View>
					</View>
							
				</RectButton>
			</View>
		)
	else
		return (
			<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={'100%'}
				height={46}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="12" y="7" rx="6" ry="6" width="24" height="32" />
				<Rect x="50" y="14" rx="6" ry="6" width="55%" height="18" />
				<Rect x="75%" y="0" rx="18" ry="18" width="25%" height="46" />
			</ContentLoader>
		)
}