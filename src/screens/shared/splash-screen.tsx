import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

const SplashScreen: React.FC = () => {
	const progress = useRef(new Animated.Value(0)).current;
	const scheme = useColorScheme();
	const isDark = scheme === 'dark';

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(progress, {
					toValue: 1,
					duration: 420,
					easing: Easing.bezier(0.33, 0, 0.66, 0.33),
					useNativeDriver: true,
				}),
				Animated.timing(progress, {
					toValue: 0,
					duration: 420,
					easing: Easing.bezier(0.33, 0.66, 0.66, 1),
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, [progress]);

	const translateY = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 36],
	});

	const scaleX = progress.interpolate({
		inputRange: [0, 0.6, 1],
		outputRange: [1, 1.08, 1.15],
	});

	const scaleY = progress.interpolate({
		inputRange: [0, 0.6, 1],
		outputRange: [1, 0.93, 0.8],
	});

	const shadowScale = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.6, 0.85, 1],
	});

	const shadowOpacity = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.18, 0.28, 0.32],
	});

	const backgroundColor = isDark ? '#0f172a' : '#eef2ff';
	const hintColor = isDark ? '#cbd5f5' : '#1e3a8a';

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<View style={styles.logoArea}>
				<Animated.View
					style={[
						styles.shadow,
						{
							opacity: shadowOpacity,
							transform: [{ scaleX: shadowScale }],
						},
					]}
				/>
				<Animated.View
					style={{
						transform: [{ translateY }, { scaleX }, { scaleY }],
					}}
				>
					<Svg width={120} height={120} viewBox="0 0 24 24">
						<Ellipse cx="12" cy="5" rx="4" ry="4" fill="hsl(228, 80%, 42%)" />
					</Svg>
				</Animated.View>
			</View>
			<Text style={[styles.hint, { color: hintColor }]}>Cargando experiencia Moodle...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	logoArea: {
		width: 160,
		height: 160,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shadow: {
		position: 'absolute',
		bottom: 8,
		width: 140,
		height: 28,
		backgroundColor: 'rgba(37, 99, 235, 0.45)',
		borderRadius: 999,
	},
	hint: {
		marginTop: 32,
		fontSize: 16,
		fontWeight: '600',
		letterSpacing: 0.4,
	},
});

export default SplashScreen;
