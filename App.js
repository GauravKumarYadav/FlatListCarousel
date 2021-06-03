
// Inspiration: https://dribbble.com/shots/14139308-Simple-Scroll-Animation
// Illustrations by: SAMji https://dribbble.com/SAMji_illustrator


import React ,{useRef} from 'react';
import { StatusBar, Image, Animated, View, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('screen');

const data = [
    'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
	const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <StatusBar hidden />
			<View style={styles.backgroundImageContainer} >
				{
					data.map((image,index)=>{
						const inputRange = [
							(index-1)*width,
							(index)*width,
							(index+1)*width,
						]
						const opacity = scrollX.interpolate({
							inputRange,
							outputRange:[0,1,0]
						})
						return(
							<Animated.Image
							key={`image-${index}`}
								source={{uri:image}}
								style={[styles.backgroundImage,{opacity:opacity}]}
								blurRadius={10}
							/>
						);
					})
				}
			</View>
			<Animated.FlatList
				data={data}
				horizontal
				pagingEnabled
				keyExtractor={(_,index) => index.toString()}
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event( [ { nativeEvent : { contentOffset : { x : scrollX } } } ], { useNativeDriver : true } )}
				renderItem={({item})=>{
					return(
						<View style={styles.flatListContainer} >
							<Image source={{uri:item}} style={styles.image} />
						</View>
					);

				}}
			/>
        </View>
    );
};

const styles = StyleSheet.create({
	container : { flex: 1, backgroundColor: '#fff' } ,
	flatListContainer : { width, justifyContent : 'center' , alignItems : 'center' } ,
	backgroundImageContainer : StyleSheet.absoluteFillObject ,
	backgroundImage : StyleSheet.absoluteFillObject ,
	image : { width:imageW, height:imageH, resizeMode:'cover', borderRadius:16, } ,
})