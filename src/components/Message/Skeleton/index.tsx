import React from 'react';

import { View } from 'react-native';
import ContentLoader, { Rect } from "react-content-loader/native";

import { theme } from '../../../global/styles/theme';
import { styles } from './styles';

export function Skeleton() {
	let lastMessageSide: boolean;

	return (
		<View style={styles.container}>
			{
				[...Array(15)].map((value, index) => {
					const randomWidth = Math.floor(Math.random()*(70-30+1)+30);
					const messageWidth = randomWidth + 20;
					const skeletonMargin = 100 - messageWidth;
					const rightSkeletonStyle = { ...styles.rightSkeleton, ...{ marginLeft: `${skeletonMargin}%` } };
					const right = Math.random() < 0.5;

					const showCorner = right !== lastMessageSide;

					lastMessageSide = right;

					return (
						<ContentLoader
							key={index}
							style={right ? rightSkeletonStyle : styles.skeleton}
							speed={1}
							width={`${messageWidth}%`}
							height={30}
							backgroundColor={right ? theme.colors.green80 : theme.colors.gray80}
							foregroundColor={right ? theme.colors.green70 : theme.colors.gray70}
						>
							<Rect x="8" y="5" rx="6" ry="6" width={`${randomWidth}%`} height="20" />
							<Rect x="85%" y="7" rx="6" ry="6" width="12%" height="16" />
							<View style={[
								styles.messageBubbleCorner,
								right && styles.rightMessageBubbleCorner,
								!showCorner && { borderTopColor: 'transparent', }
							]}/>
						</ContentLoader>
					);
				})
			}
		</View>
	);
}