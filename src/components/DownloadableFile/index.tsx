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

import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";


interface Props {
	id?: number;
	
	type?: number;
	title?: string;
	color?: string;

	loading?: boolean;
}

export function DownloadableFile ({ id, type, title, color, loading = false}: Props) {
	const navigation = useNavigation();

	const fileUrl = 'https://res.cloudinary.com/educorreia/image/upload/v1633365748/gnbuwy83t0ga9oq1mw55.png';

	// const getFileExtention = (fileUrl: string) => {
	// 	// To get the file extension
	// 	return /[.]/.exec(fileUrl) ?
	// 			 /[^.]+$/.exec(fileUrl) : undefined;
	//   };

	// // Get today's date to add the time suffix in filename
    // let date = new Date(); 
    // // Function to get extention of the file url
    // let file_ext = getFileExtention(fileUrl);

	// console.log('file',file_ext)

	// // @ts-expect-error
	// file_ext = '.' + file_ext[0];

	// const [ downloadState, setDownloadState ] = useState({ downloadProgress: -1 });

	// const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
	// 	const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
	// 	setDownloadState({
	// 		downloadProgress: progress,
	// 	});
	// };
	
	// const downloadResumable = FileSystem.createDownloadResumable(
	// 	fileUrl,
	// 	FileSystem.documentDirectory + 'atividade.png',
	// 	{},
	// 	callback
	// );

	useEffect(() => {
		const download = async () => {
			MediaLibrary.getAlbumsAsync().then(albums => console.log('albums', albums))
			await MediaLibrary.getPermissionsAsync()
			.then(async permission => {
				if (permission.status !== MediaLibrary.PermissionStatus.GRANTED) {
					return;
				}

				await FileSystem.downloadAsync(
					fileUrl,
					FileSystem.cacheDirectory + 'arquivobaixalogo.png'
				)
				.then(async ({ uri }) => {
					try {
						const asset = await MediaLibrary.createAssetAsync(uri);
						const album = await MediaLibrary.getAlbumAsync('Downloads');
						console.log('asset', asset)
						console.log('album', album)
						if (album == null) {
							console.log('null')
							await MediaLibrary.createAlbumAsync('E-learning', asset, false);
						} else {
							console.log('not null')
							await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
						}
					} catch (e) {
						console.error(e);
					}
				})
				.catch(e => console.error(e));
			})
			.catch(e => console.error(e));
		}

		download();
	}, []);

	if (!loading)
		return (
			<View style={styles.container}>
				<RectButton 
					style={styles.button} 
					onPress={() => {
					
						navigation.navigate('pagina' as never, { id: id } as never)
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
								extensão
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
				height={100}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="75%" y="0" rx="16" ry="16" width="25%" height="100" />
				<Rect x="5%" y="38" rx="6" ry="6" width="65%" height="22" />
			</ContentLoader>
		)
}